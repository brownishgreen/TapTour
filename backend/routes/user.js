const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const verifyToken = require('../middleware/auth')

// 定義路由
router.get('/register', userController.signUpPage)
router.post('/register', userController.signUp)

// 登入
router.get('/signin', userController.signInPage)
router.post('/signin', userController.signIn)
// 登出
router.post('/signout', userController.signOut)

router.get('/profile', verifyToken, userController.profile)

// 檢查用戶的登入狀態的 API 路由
router.get('/verify', verifyToken, userController.verify)

module.exports = router
