const express = require('express')
const router = express.Router()
const favoriteController = require('../controllers/favoriteController')

// 新增收藏
router.post('/', favoriteController.createFavorite)

// 刪除收藏
router.delete('/:id', favoriteController.deleteFavorite)

// 取得收藏
router.get('/activity/:userId', favoriteController.getFavoritesActivity)
router.get('/product/:userId', favoriteController.getFavoritesProduct)

// 檢查是否已收藏
router.get('/check', favoriteController.checkFavorite);


module.exports = router