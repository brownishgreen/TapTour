export const handleError = (res, error) => {
  console.error('❌ 伺服器錯誤:', error.message || error)

  // ✅ 若錯誤是 CustomError，直接回應正確的 HTTP 狀態碼
  if (error instanceof Error && error.statusCode) {
    return res.status(error.statusCode).json({ message: error.message })
  }

  // ✅ Sequelize 錯誤處理
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      message: '資料驗證失敗',
      details: error.errors.map((err) => err.message), // 提取詳細錯誤訊息
    })
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ message: '資料已存在，無法重複建立' })
  }

  if (error.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({ message: '請檢查相關資料是否存在，無法刪除' })
  }

  // ✅ 未知錯誤，統一回傳 500（並在開發環境回傳 stack 方便 debug）
  return res.status(500).json({
    message: '伺服器錯誤，請稍後再試',
    stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined,
  })
}
