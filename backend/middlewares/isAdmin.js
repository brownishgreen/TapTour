const isAdmin = (req, res, next) => {
  if (req.user && req.user.is_admin) {
    return next()
  }
  return res.status(403).json({ message: '沒有權限訪問該頁面' })
}

export default isAdmin
