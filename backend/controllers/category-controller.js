import categoryService from '../services/category-service.js'
import { handleError } from '../utils/handleError.js'

const categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await categoryService.getAllCategories()
      res.status(200).json(categories)
    } catch (err) {
      handleError(res, err)
    }
  }
}

export default categoryController
