export default (err, req, res, next) => {
  console.log(err.stack) // 打印錯誤堆疊

  const statusCode = err.statusCode || 500 // 如果沒有自定義狀態碼，使用 500
  const message = err.message || '伺服器錯誤，請稍後再試'
  // 如果沒有錯誤信息，使用預設錯誤信息

  res.status(statusCode).json({ message }) // 返回錯誤訊息
}
