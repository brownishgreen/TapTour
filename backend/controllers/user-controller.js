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
      const { name, email, password } = req.body

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
        password: hash,
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
  login: (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
      const err = new Error('請輸入帳號密碼')
      err.statusCode = 400
      return next(err)
    }

    // 驗證用戶是否存在
    User.findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          const err = new Error('帳號或密碼錯誤') // new Error建立一個新的錯誤，並附上錯誤訊息
          err.statusCode = 401
          return next(err)
        }

        // 驗證密碼是否正確
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch) {
            const err = new Error('帳號或密碼錯誤')
            err.statusCode = 401
            return next(err)
          }

          // 生成 JWT
          const token = jwt.sign(
            { id: user.id, email: user.email },
            SECRET,
            { expiresIn: EXPIRES } // 讀取 .env 中的變數
          )

          // 設置 HttpOnly Cookie
          res.cookie('token', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000,
          })

          res.status(200).json({
            message: '登入成功',
            token,
          })
        })
      })
      .catch((err) => {
        err.statusCode = 500
        next(err)
      })
  },
  // 登出
  logout: (req, res) => {
    res.clearCookie('token') // 清除 JWT
    res.status(200).json({ message: '已成功登出' })
  },
  // 個人檔案
  profile: async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: ['id', 'image', 'name', 'email', 'bio', 'createdAt'],
      })

      if (!user) {
        return res.status(404).json({ message: '用戶不存在' })
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
    res.status(200).json({ message: '已登入' })
  },
}

module.exports = userController
