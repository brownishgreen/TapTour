import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'
const SECRET = process.env.JWT_SECRET // 從 .env 讀取密鑰

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token
    console.log('token', token)
    console.log('req.cookies', req.cookies)

    if (!token) {
      return res.status(401).json({ message: '未授權的訪問(未提供 token)' })
    }

    const decoded = jwt.verify(token, SECRET)
    console.log('decoded', decoded)
    const user = await User.findByPk(decoded.id)
  
    // 確保用戶存在

    if (!user) {
      return res.status(404).json({ message: '用戶不存在' })
    }

    req.user = user // 儲存用戶資料
    next()
  } catch (err) {
    console.error('驗證失敗:', err)
    res.status(403).json({ message: 'Token 無效或過期' })
  }
}

export default verifyToken
