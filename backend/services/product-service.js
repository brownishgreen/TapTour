import { Product, Image, Category } from '../models/index.js'
import { Op } from 'sequelize'
import path from 'path'
import { fileURLToPath } from 'url'
import CustomError from '../utils/CustomError.js'
import multerConfig from '../utils/multer-config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const productService = {
  getAllProducts: async (search) => {
    const queryOptions = {
      include: [
        {
          model: Image,
          as: 'images',
          attributes: ['image_url'],
        },
        {
          model: Category,
          as: 'category',
          attributes: ['name'],
        },
      ],
    }

    if (search) {
      queryOptions.where = { name: { [Op.like]: `%${search}%` } }
    }

    const products = await Product.findAll(queryOptions)
    if (!products.length) throw new CustomError(404, '沒有符合的產品')

    return products
  },

  getProductById: async (id) => {
    const product = await Product.findByPk(Number(id), {
      include: [
        { model: Image, as: 'images', attributes: ['image_url'] },
        { model: Category, as: 'category', attributes: ['name'] },
      ],
    })
    if (!product) throw new CustomError(404, '商品不存在')
    return product
  },

  editProduct: async (id, value) => {
    const product = await Product.findByPk(Number(id))
    if (!product) throw new CustomError(404, '商品不存在')

    await product.update({
      name: value.name,
      description: value.description,
      location_id: value.location_id,
      price: value.price,
      category_id: value.category_id
    })
    return { message: '商品更新成功' }
  },

  createProduct: async (productData, files) => {
    console.log('files:', files)
    const product = await Product.create({
      name: productData.name,
      description: productData.description,
      price: productData.price,
      category_id: productData.category_id,
      location_id: productData.location_id
    })

    let imageUrls = []

    if (files && files.length > 0) {
      imageUrls = await Promise.all(
        files.map(file => multerConfig.uploadToGCS(file, 'products', product.id))
      )
    }

    // 創建圖片
    await Promise.all(
      imageUrls.map(url => Image.create({ image_url: url, product_id: product.id }))
    )


    return { message: '商品已創建', product, images: imageUrls }
  },

  deleteProduct: async (productId) => {
    console.log('productId', productId)
    if (isNaN(productId)) {
      throw new CustomError(400, '商品ID不存在')
    }
    const product = await Product.findByPk(productId)
    if (!product) throw new CustomError(404, '商品不存在')
    try {
      await product.destroy()
      return { message: '商品刪除成功' }
    } catch (err) {
      throw new CustomError(500, '商品刪除失敗')
    }
  },

  getPaginatedProducts: async (page = 1, limit = 6) => {
    page = parseInt(page, 10)
    limit = parseInt(limit, 10)
    if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
      throw new CustomError(400, 'Page 和 limit 必須是正數')
    }

    const offset = (page - 1) * limit
    const products = await Product.findAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Image,
          as: 'images',
          attributes: ['image_url'],
        },
        {
          model: Category,
          as: 'category',
          attributes: ['name'],
        },
      ],
    })

    const totalItems = await Product.count()
    return {
      products,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
    }
  },
}

export default productService
