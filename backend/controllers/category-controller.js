const { Category } = require('../models')

const categoryController = {
  getAllCategories: async (req, res, next) => {
    try {
      const categories = await Category.findAll({
        attributes: ['id', 'name'] // 只回傳 id 和 name
      })
      res.status(200).json(categories)
    } catch (err) {
      console.error('獲取分類失敗:', err)
      res.status(500).json({ message: '伺服器錯誤' })
    }
  }
}

module.exports = categoryController
