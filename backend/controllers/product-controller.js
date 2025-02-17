import productService from '../services/product-service.js'

const productController = {
  getAllProducts: async (req, res, next) => {
    try {
      const { search } = req.query
      const products = await productService.getAllProducts(search)
      res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  },

  getProductById: async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await productService.getProductById(id)
      res.status(200).json(product)
    } catch (err) {
      next(err)
    }
  },

  editProductPage: async (req, res, next) => {
    try {
      const { productId } = req.params
      const product = await productService.getProductById(productId)
      res.status(200).json(product)
    } catch (err) {
      next(err)
    }
  },

  editProduct: async (req, res, next) => {
    try {
      const { id } = req.params
      const productData = req.body
      const editProductResult = await productService.editProduct(id, productData)
      res.status(200).json(editProductResult)
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
      const productData = req.body
      const files = req.files?.images || []
      const createProductResult = await productService.createProduct(productData, files)
      res.status(201).json(createProductResult)
    } catch (err) {
      next(err)
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      const productId = Number(req.params.id)
      if (isNaN(productId)) {
        return res.status(400).json({ message: '商品ID不存在' })
      }

      const deleteProductResult = await productService.deleteProduct(productId)
      res.status(200).json(deleteProductResult)
    } catch (err) {
      next(err)
    }
  },

  getPaginatedProducts: async (req, res, next) => {
    try {
      const { page, limit } = req.query
      const products = await productService.getPaginatedProducts(page, limit)
      res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  },
}

export default productController
