import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'
const SECRET = process.env.JWT_SECRET // read from .env

const verifyToken = async (req, res, next) => {
  try {
    let token = req.cookies.token // get token from cookies first

    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1] // get token from authorization header
      }
    }
    console.log('token', token)
    if (!token) {
      return res.status(401).json({ message: '未授權的訪問(未提供 token)' })
    }

    const decoded = jwt.verify(token, SECRET)
    console.log('decoded', decoded)
    const user = await User.findByPk(decoded.id)
  
    // ensure user exists

    if (!user) {
      return res.status(404).json({ message: '用戶不存在' })
    }

    req.user = user // save user data
    next()
  } catch (err) {
    console.error('驗證失敗:', err)
    res.status(403).json({ message: 'Token 無效或過期' })
  }
}

export default verifyToken
