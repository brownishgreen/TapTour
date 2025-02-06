const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User, Follower } = require('../models')
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
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', // Lax for development
        maxAge: 3600000,
      });


      res.status(200).json({
        message: '登入成功',
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
      if (!req.user) {
        return res.status(401).json({ message: '未授權，請先登入' });
      }

      const targetUserId = req.params.userId // 被訪問用戶 ID
      const currentUserId = req.user.id

      
      const user = await User.findByPk(targetUserId, {
        attributes: ['id', 'image', 'name', 'email', 'bio', 'createdAt'],
      })

      if (!user) {
        const err = new Error('用戶不存在')
        err.statusCode = 404
        throw err
      }

      const isFollowing = await Follower.findOne({
        where: {
          follower_id: currentUserId,
          following_id: targetUserId,
        },
      })

      res.json({
        message: '這是受保護的個人檔案頁面，你已成功獲取使用者資料',
        user,
        isFollowing: !!isFollowing,
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

    const path = require('path');
    const fs = require('fs');

    try {
      const { name, password, bio, image } = req.body
      const user = await User.findByPk(req.params.userId)
      if (!user) {
        return res.status(404).json({ message: '用戶不存在' })
      }

      // 更新名稱、密碼、簡介
      if (name) user.name = name
      if (password) user.password = await bcrypt.hash(password, 10)
      if (bio) user.bio = bio

      // 如果有 base64 圖片，將其解碼並儲存成檔案
      if (image) {
        const base64Data = image.replace(/^data:image\/\w+;base64,/, '')
        const imagePath = path.join(__dirname, `../uploads/avatars/avatar-${Date.now()}.png`)
        fs.writeFileSync(imagePath, base64Data, 'base64')
        user.image = `http://localhost:3000/uploads/avatars/${path.basename(imagePath)}`
      }

      await user.save()
      res.status(200).json({ message: '資料更新成功', user })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: '伺服器錯誤' })
    }
  },
}


module.exports = userController
