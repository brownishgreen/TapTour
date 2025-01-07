const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET // 從 .env 讀取密鑰

// JWT 驗證功能
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: '未授權的訪問' })
  }

  const token = authHeader.split(' ')[1]
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token 無效或過期' })
    }

    req.user = decoded // 將解碼後的用戶資料儲存到請求中
    next()
  })
}

module.exports = verifyToken
