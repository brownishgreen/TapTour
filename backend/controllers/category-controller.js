import categoryService from '../services/category-service.js'

const categoryController = {
  getAllCategories: async (req, res, next) => {
    try {
      const categories = await categoryService.getAllCategories()
      res.status(200).json(categories)
    } catch (error) {
      console.error('無法取得分類:', error)
      res.status(500).json({ message: '無法取得分類' })
      next(error)
    }
  }
}

export default categoryController
