import { Category } from '../models/index.js'

const categoryService = {
  getAllCategories: async () => {
    return await Category.findAll({
      attributes: ['id', 'name']
    })
  }
}

export default categoryService
