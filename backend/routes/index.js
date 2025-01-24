const express = require('express')
const router = express.Router()

const userRoutes = require('./user')
const adminRoutes = require('./admin')
const activityRoutes = require('./activity')
// 掛載路由模組
router.use('/users', userRoutes) // 路徑 /api/users
router.use('/admin', adminRoutes) // 路徑 /api/admin
router.use('/api', activityRoutes) // 路徑 /api/activities

module.exports = router
