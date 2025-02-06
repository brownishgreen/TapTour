const { Product, Image, Category } = require('../models')
const {handleImageUpload} = require('../utils/upload-handler')
const path = require('path')
const { Op } = require('sequelize') // 引入 Sequelize 的操作符
const productController = {
  getAllProducts: async (req, res, next) => {
    const { search } = req.query

    try {
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
        queryOptions.where = {
          name: { [Op.like]: `%${search}%` },
        }
      }
      const products = await Product.findAll(queryOptions)

      if (products.length === 0) {
        return res.status(404).json({ message: '沒有符合的產品' })
      }
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
  },
  getPaginatedProducts: async (req, res, next) => {
    // limit 主要是由前端傳入的，但如果前端沒有傳入，後端會使用預設的值
    // 10代表十進位制，不能隨意改動
    const page = parseInt(req.query.page, 10) || 1 // 預設為第 1 頁
    const limit = parseInt(req.query.limit, 10) || 9 // 預設每頁 9 筆
    const offset = (page - 1) * limit // 計算偏移量，分頁查詢時決定從第幾筆資料開始

    // 驗證 page 和 limit 是否有效，若無效則返回 400 錯誤
    if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
      return res
        .status(400)
        .json({ message: 'Page and limit must be positive numbers' })
    }

    try {
      // 獲取商品資料（包含關聯的圖片）
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
        ],
      })

      // 獲取商品的總數（不包含關聯表，避免多次計算）
      //  Sequelize 提供的方法，用於計算資料表的總記錄數
      const totalItems = await Product.count()
      res.status(200).json({
        products,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit), // 計算總頁數
        totalItems,
      })
    } catch (err) {
      console.log('分頁獲取商品數據失敗:', err)
      next(err)
    }
  }
}

module.exports = productController