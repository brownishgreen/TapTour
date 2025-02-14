import express from 'express'
const router = express.Router()
import favoriteController from '../controllers/favoriteController.js'

// 新增收藏
router.post('/', favoriteController.createFavorite)

// 刪除收藏
router.delete('/:id', favoriteController.deleteFavorite)

// 取得收藏
router.get('/activity/:userId', favoriteController.getFavoritesActivity)
router.get('/product/:userId', favoriteController.getFavoritesProduct)

export default router