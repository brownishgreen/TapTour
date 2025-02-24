import favoriteService from '../services/favorite-service.js'
import { handleError } from '../utils/handleError.js'

const favoriteController = {
  getFavoritesActivity: async (req, res) => {
    try {
      const { userId } = req.params
      const favorites = await favoriteService.getFavoritesByType(
        userId,
        'activity'
      )
      res.status(200).json(favorites)
    } catch (err) {
      handleError(res, err)
    }
  },

  getFavoritesProduct: async (req, res) => {
    try {
      const { userId } = req.params
      const favorites = await favoriteService.getFavoritesByType(
        userId,
        'product'
      )
      res.status(200).json(favorites)
    } catch (err) {
      handleError(res, err)
    }
  },
  createFavorite: async (req, res) => {
    try {
      const { user_id, item_id, item_type } = req.body
      const favorite = await favoriteService.createFavorite(
        user_id,
        item_id,
        item_type
      )
      res.status(201).json(favorite)
    } catch (error) {
      handleError(res, error)
    }
  },
  deleteFavorite: async (req, res) => {
    try {
      const { id } = req.params
      const result = await favoriteService.deleteFavorite(id)
      res.status(200).json(result)
    } catch (error) {
      handleError(res, err)
    }
  },
  checkFavorite: async (req, res) => {
    try {
      const { user_id, item_id, item_type } = req.query
      const favorite = await favoriteService.checkFavorite(
        user_id,
        item_id,
        item_type
      )
      res.status(200).json(favorite)
    } catch (error) {
      handleError(res, error)
    }
  },
  getUserFavorites: async (req, res) => {
    try {
      const { userId } = req.params
      const favorites = await favoriteService.getUserFavorites(userId)
      res.status(200).json(favorites)
    } catch (error) {
      handleError(res, error)
    }
  },
}

export default favoriteController
