const express = require('express')
const router = express.Router()
const productController = require('../controllers/product-controller.js')
const verifyToken = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')
const {handleImageUpload} = require('../utils/upload-handler')

// 取得所有商品
router.get('/', productController.getAllProducts)

// 取得分頁商品
router.get('/paginated', productController.getPaginatedProducts)

//取得商品編輯頁面
router.get('/:id/edit', verifyToken, isAdmin, productController.editProductPage)

// 取得商品創建頁面
router.get('/create', verifyToken, isAdmin, productController.createProductPage)

// 創建商品
router.post(
  '/',
  verifyToken,
  isAdmin,
  handleImageUpload,
  productController.createProduct
)

// 編輯商品
router.put(
  '/:id',
  verifyToken,
  isAdmin,
  handleImageUpload,
  productController.editProduct
)

// 刪除商品
router.delete('/:id', verifyToken, isAdmin, productController.deleteProduct)

// 取得商品
router.get('/:id', productController.getProductById)

module.exports = router
