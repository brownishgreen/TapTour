const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')

// 定義路由
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

module.exports = router
