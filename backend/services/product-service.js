import { Product, Image, Category } from '../models/index.js'
import { handleImageUpload } from '../utils/upload-handler.js'
import { Op } from 'sequelize'
import path from 'path'
import { fileURLToPath } from 'url'
import CustomError from '../utils/CustomError.js'

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

  createProduct: async (value, files) => {
    const product = await Product.create({
      name: value.name,
      description: value.description,
      price: value.price,
      category_id: value.category_id,
      location_id: value.location_id
    })

    let imageUrls = []
    const basePath = path.join(__dirname, '../uploads/products')

    if (files.length) {
      imageUrls = handleImageUpload(files, basePath, product.id, value.name, 'products', 'product_id')
    }

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
