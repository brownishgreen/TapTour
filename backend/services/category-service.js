import { Category } from '../models/index.js'
import CustomError from '../utils/CustomError.js'

const categoryService = {
  getAllCategories: async () => {
    try {
      return await Category.findAll({ attributes: ['id', 'name'] })
    } catch (error) {
      console.error('❌ 取得分類失敗:', error)
      throw new CustomError(500, '無法取得分類')
    }
  },
}

export default categoryService
