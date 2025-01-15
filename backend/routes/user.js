const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')

// 定義路由
router.get('/register', userController.signUpPage)
router.post('/register', userController.signUp)

// 登入
router.get('/signin', userController.signInPage)
router.post('/signin', userController.signIn)
// 登出
router.post('/signout', userController.signOut)

module.exports = router
