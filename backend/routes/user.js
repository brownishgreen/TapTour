const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')

// 定義路由
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

// 登入
router.get('/signin', userController.signInPage)
router.post('/signin', userController.signIn)

module.exports = router
