const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db
const userController = {
  signUpPage: (req, res) => {
    res.json({ message: '這是註冊頁面的json' })
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
}

module.exports = userController
