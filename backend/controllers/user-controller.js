const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../models')
const { User } = db
const SECRET = process.env.JWT_SECRET // 從 .env 讀取密鑰
const EXPIRES = process.env.JWT_EXPIRES

const userController = {
  registerPage: (req, res) => {
    res.status(200).json({ message: '這是註冊頁面的json' })
  },
  register: async (req, res, next) => {
    try {
      const { name, email, password} = req.body

      // 檢查必填欄位
      if (!name || !email || !password) {
        const err = new Error('請您必須填寫所有欄位')
        err.statusCode = 400
        throw err
      }

      // 檢查 email 是否已存在
      const existingUser = await User.findOne({ where: { email } })
      if (existingUser) {
        const err = new Error('此 email 已經註冊過')
        err.statusCode = 400
        throw err
      }

      // 密碼加密並創建用戶
      const hash = await bcrypt.hash(password, 10)
      await User.create({
        name,
        email,
        password: hash
      })

      res.status(201).json({ message: '註冊成功' })
    } catch (err) {
      err.statusCode = err.statusCode || 500
      next(err)
    }
  },
  // 登入
  loginPage: (req, res) => {
    res.status(200).json({ message: '這是登入頁面的json' })
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        const err = new Error('請輸入帳號密碼')
        err.statusCode = 400
        throw err
      }

      // 驗證用戶是否存在
      const user = await User.findOne({ where: { email } })
      if (!user) {
        const err = new Error('帳號或密碼錯誤')
        err.statusCode = 401
        throw err
      }

      // 驗證密碼是否正確
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        const err = new Error('帳號或密碼錯誤')
        err.statusCode = 401
        throw err
      }

      // 生成 JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, is_admin: user.is_admin },
        SECRET,
        { expiresIn: EXPIRES } // 讀取 .env 中的變數
      )

      // 設置 HttpOnly Cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000,
      })

      res.status(200).json({
        message: '登入成功',
        token,
        userId: user.id,
      })
    } catch (err) {
      err.statusCode = 500
      next(err)
    }
  },
  // 登出
  logout: async (req, res, next) => {
    try {
      res.clearCookie('token') // 清除 JWT
      res.status(200).json({ message: '已成功登出' })
    } catch (err) {
      err.statusCode = err.statusCode || 500
      next(err)
    }
  },
  // 個人檔案
  profile: async (req, res, next) => {
    try {
      const userId = req.params.userId
      const user = await User.findByPk(userId, {
        attributes: ['id', 'image', 'name', 'email', 'bio', 'createdAt'],
      })

      if (!user) {
        const err = new Error('用戶不存在')
        err.statusCode = 404
        throw err
      }
      res.json({
        message: '這是受保護的個人檔案頁面，你已成功獲取使用者資料',
        user,
      })
    } catch (err) {
      err.statusCode = err.statusCode || 500
      next(err)
    }
  },
  // 檢查用戶的登入狀態的 API 路由
  verify: (req, res) => {
    try {
      const user = req.user
      if (!user) {
        return res.status(401).json({ message: '未登入' }) // 返回未登入狀態
      }
      const { id: userId, is_admin: isAdmin } = user

      res.status(200).json({ message: '已登入', userId, isAdmin })
    } catch (err) {
      res.status(500).json({ message: '伺服器錯誤', error: err.message })
    }
  },
  updateProfile: async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword, bio } = req.body

      if (email) {
        const err = new Error('禁止修改email')
        err.statusCode = 403
        throw err
      }

      if (password && password !== confirmPassword) {
        const err = new Error('密碼與確認密碼不一致')
        err.statusCode = 400
        throw err
      }

      const userId = req.params.userId
      const user = await User.findByPk(userId)
      if (!user) {
        const err = new Error('用戶不存在')
        err.statusCode = 404
        throw err
      }

      // 準備更新資料
      const updates = {}
      if (name) {
        updates.name = name
      }
      if (password) {
        updates.password = await bcrypt.hash(password, 10)
      }

      if (bio !== undefined) {
        updates.bio = bio // 即使 bio 為空字串也應更新
      }

      if (req.file) {
        const avatarUrl = `http://localhost:3000/uploads/avatars/${req.file.filename}`
        updates.image = avatarUrl
      }
      await user.update(updates)
      const updatedUser = await user.reload()
      res.status(200).json({ message: '資料更新成功', user: updatedUser })
    } catch (err) {
      err.statusCode = err.statusCode || 500
      next(err)
    }
  },
}

module.exports = userController
