const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const verifyToken = require('../middlewares/auth')
const upload = require('../utils/multer-config')

// 檢查 userId 是否為有效數字的 middleware
const validateUserId = (req, res, next) => {
  const userId = req.params.userId
  if (!Number.isInteger(Number(userId)) || Number(userId) <= 0) {
    return res.status(400).json({ message: '無效的 userId' })
  }
  next()
}

// 檢查用戶的登入狀態的 API 路由
router.get('/verify', verifyToken, userController.verify)

// 註冊
router.get('/register', userController.registerPage)
router.post('/register', userController.register)

// 登入
router.get('/login', userController.loginPage)
router.post('/login', userController.login)

// 登出
router.post('/logout', userController.logout)



// 個人檔案
router.get('/:userId/profile', verifyToken, validateUserId, userController.profile)

// 更新個人檔案
router.put('/:userId/update-profile', verifyToken, validateUserId, upload.single('image'), userController.updateProfile)

module.exports = router
