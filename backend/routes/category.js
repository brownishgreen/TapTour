const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category-controller.js')

// 取得所有活動類別
router.get('/', categoryController.getAllCategories)

module.exports = router
