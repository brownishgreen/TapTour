const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../models')
const { User } = db
const SECRET = process.env.JWT_SECRET // 從 .env 讀取密鑰
const EXPIRES = process.env.JWT_EXPIRES

const userController = {
  signUpPage: (req, res) => {
    res.status(200).json({ message: '這是註冊頁面的json' })
  },
  signUp: (req, res, next) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      const err = new Error('請您必須填寫所有欄位')
      err.statusCode = 400
      return next(err) // 將錯誤傳遞給錯誤處理中介軟體
    }

    bcrypt
      .hash(password, 10)
      .then((hash) =>
        User.create({
          name,
          email,
          password: hash,
        })
      )
      .then(() => {
        res.status(201).json({ message: '註冊成功' })
      })
      .catch((err) => {
        err.statusCode = 500
        next(err) //傳遞錯誤
      })
  },
  // 登入
  signInPage: (req, res) => {
    res.status(200).json({ message: '這是登入頁面的json' })
  },
  signIn: (req, res, next) => {
    const { email, password } = req.body

    if ((!email, !password)) {
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
  signOut: (req, res) => {
    res.status(200).json({ message: '已成功登出' })
  },
}

module.exports = userController
