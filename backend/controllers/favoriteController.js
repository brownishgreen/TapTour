import favoriteService from '../services/favorite-service.js'

const favoriteController = {
  getFavoritesActivity: async (req, res, next) => {
    try {
      const { userId } = req.params
      const favorites = await favoriteService.getFavoritesByType(
        userId,
        'activity'
      )
      res.status(200).json(favorites)
    } catch (error) {
      res.status(400).json({ message: error.message || '無法取得收藏' })
    }
  },

  getFavoritesProduct: async (req, res, next) => {
    try {
      const { userId } = req.params
      const favorites = await favoriteService.getFavoritesByType(
        userId,
        'product'
      )
      res.status(200).json(favorites)
    } catch (error) {
      res.status(400).json({ message: error.message || '無法取得收藏' })
    }
  },
  createFavorite: async (req, res) => {
    const { user_id, item_id, item_type } = req.body
    if (!user_id || !item_id || !item_type) {
      return res.status(400).json({ message: '缺少必要參數' })
    }
    try {
      const favorite = await favoriteService.createFavorite(
        user_id,
        item_id,
        item_type
      )
      res.status(201).json(favorite)
    } catch (error) {
      res.status(500).json({ message: '無法新增收藏' })
    }
  },
  deleteFavorite: async (req, res) => {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: '缺少必要參數' })
    }
    try {
      await favoriteService.deleteFavorite(id)
      res.status(200).json({ message: '收藏已刪除' })
    } catch (error) {
      res.status(500).json({ message: '無法刪除收藏' })
    }
  },
  checkFavorite: async (req, res) => {
    const { user_id, item_id, item_type } = req.query
    if (!user_id || !item_id || !item_type) {
      return res.status(400).json({ message: '缺少必要參數' })
    }
    try {
      const favorite = await favoriteService.checkFavorite(
        user_id,
        item_id,
        item_type
      )
      res.status(200).json(favorite)
    } catch (error) {
      res.status(500).json({ message: '無法檢查收藏' })
    }
  },
  getUserFavorites: async (req, res) => {
    try {
      const { userId } = req.params
      const favorites = await favoriteService.getUserFavorites(userId)
      res.status(200).json(favorites)
    } catch (error) {
      res.status(500).json({ message: '無法獲取收藏' })
    }
  },
}

export default favoriteController
