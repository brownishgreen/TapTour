const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const verifyToken = require('../middleware/auth')

// 定義路由
router.get('/register', userController.registerPage)
router.post('/register', userController.register)

// 登入
router.get('/login', userController.loginPage)
router.post('/login', userController.login)
// 登出
router.post('/logout', userController.logout)

router.get('/profile', verifyToken, userController.profile)

// 檢查用戶的登入狀態的 API 路由
router.get('/verify', verifyToken, userController.verify)

module.exports = router
