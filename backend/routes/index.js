const express = require('express')
const router = express.Router()

const userRoutes = require('./user')
const adminRoutes = require('./admin')
const activityRoutes = require('./activity')
const productRoutes = require('./product')
const followerRoutes = require('./follower')
const LocationRoutes = require('./location')
const categoryRoutes = require('./category')
const commentRoutes = require('./comment')
const orderRoutes = require('./orders')
const favoriteRoutes = require('./favorite')

// 掛載路由模組
router.use('/users', userRoutes) // 路徑 /api/users
router.use('/admin', adminRoutes) // 路徑 /api/admin
router.use('/activities', activityRoutes) // 路徑 /api/activities
router.use('/products', productRoutes) // 路徑 /api/products
router.use('/followers', followerRoutes) // 路徑 /api/followers
router.use('/locations', LocationRoutes) // 路徑 /api/locations
router.use('/categories', categoryRoutes) // 路徑 /api/categories
router.use('/comments', commentRoutes) // 路徑 /api/comments
router.use('/orders', orderRoutes) // 路徑 /api/comments
router.use('/favorites', favoriteRoutes) // 路徑 /api/favorites
module.exports = router
