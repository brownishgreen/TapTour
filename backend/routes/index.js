const express = require('express')
const router = express.Router()

const userRoutes = require('./user')
const adminRoutes = require('./admin')
const activityRoutes = require('./activity')
const followerRoutes = require('./follower')
const categoryRoutes = require('./category')
// 掛載路由模組
router.use('/users', userRoutes) // 路徑 /api/users
router.use('/admin', adminRoutes) // 路徑 /api/admin
router.use('/activities', activityRoutes) // 路徑 /api/activities
router.use('/followers', followerRoutes) // 路徑 /api/admin
router.use('/followers', followerRoutes) // 路徑 /api/followers
router.use('/categories', categoryRoutes) // 路徑 /api/categories


module.exports = router
