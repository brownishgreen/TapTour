const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET // 從 .env 讀取密鑰

// JWT 驗證功能
const verifyToken = (req, res, next) => {

  const token = req.cookies.token // 從 Cookie 中提取 token
  console.log('Token from Cookie:', req.cookies.token);

  
  if (!token) {
    return res.status(401).json({ message: '未授權的訪問(未提供 token)' })
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token 無效或過期' })
    }

    req.user = decoded // 將解碼後的用戶資料儲存到請求中
    next()
  })
}

module.exports = verifyToken
