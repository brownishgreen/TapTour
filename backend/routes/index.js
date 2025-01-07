const express = require('express')
const router = express.Router()

const userRoutes = require('./user')

// 掛載路由模組
router.use('/user', userRoutes) // 路徑 /api/user

module.exports = router
