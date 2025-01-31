const { Product, Image, Category } = require('../models')
const {handleImageUpload} = require('../utils/upload-handler')
const path = require('path')

const productController = {
  getAllProducts: async (req, res, next) => {
    try {
      const products = await Product.findAll({
        include: [{
          model: Image,
          as: 'images',
          attributes: ['image_url']
        }, {
          model: Category,
          as: 'category',
          attributes: ['name']
        }]
      })
      res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  },
  getProductById: async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await Product.findByPk(Number(id), {
        include: [{
          model: Image,
          as: 'images',
          attributes: ['image_url']
        }, {
          model: Category,
          as: 'category',
          attributes: ['name']
        }]
      })
      if (!product) {
        return res.status(404).json({ message: '商品不存在' })
      }
      res.status(200).json(product)
    } catch (err) {
      next(err)
    }
  },
  editProductPage: async (req, res, next) => {
    try {
      const { productId } = req.params
      const product = await Product.findByPk(Number(productId))
      if (!product) {
        return res.status(404).json({ message: '商品不存在' })
      }
      res.status(200).json(product)
    } catch (err) {
      next(err)
    }
  },
  editProduct: async (req, res, next) => {
    try {
      const productId = Number(req.params.id);
      if (isNaN(productId)) {
        return res.status(400).json({ message: "商品 ID 無效" });
      }
      const { name, description, location, date, price } = req.body
      const product = await Product.findByPk(Number(productId))
      if (!product) {
        return res.status(404).json({ message: '商品不存在' })
      }
      await product.update({ name, description, location, date, price })
      res.status(200).json({ message: '商品更新成功' })
    } catch (err) {
      next(err)
    }
  },
  createProductPage: async (req, res, next) => {
    try {
      res.status(200).json({ message: '這是創建商品頁面的json' })
    } catch (err) {
      next(err)
    }
  },
  createProduct: async (req, res, next) => {
    try {
      const { name, description, price, category_id } = req.body

      // 確保所有必填欄位都已提供
      if (!name || !description || !price|| !category_id) {
        return res.status(400).json({ message: '必須提供商品名稱、描述、價格、類別' });
      }

      // 建立活動
      const product = await Product.create({
        name,
        description,
        price,
        category_id,
      })

      let imageUrls = []

      const basePath = path.join(__dirname, '../uploads/products')

      // 圖片上傳處理
      if (req.files && req.files.images) {
        const images = Array.isArray(req.files.images)
          ? req.files.images
          : [req.files.images]

      imageUrls = handleImageUpload(images, basePath, product.id, name, 'products', 'product_id')

        res.status(201).json({
          message: '商品已創建',
          product,
          images: imageUrls
        })
      }
    } catch (err) {
      console.error('商品創建失敗', err)
      next(err)
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const productId = Number(req.params.productId || req.params.id)
      if (isNaN(productId)) {
        return res.status(400).json({ message: '商品 ID 無效' })
      }
      const product = await Product.findByPk(productId)

      if (!product) {
        return res.status(404).json({ message: '商品不存在' })
      }
      await product.destroy()
      res.status(200).json({ message: '商品刪除成功' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = productController