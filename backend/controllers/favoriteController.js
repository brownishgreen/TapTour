import db from '../models'
const { Favorite, User, Activity, Product } = db

const favoriteController = {
  getFavoritesActivity: async (req, res) => {
    const { userId } = req.params
    if (!userId) {
      return res.status(400).json({ message: '使用者ID為必填' })
    }
    try {
      const FavoritesActivities = await Favorite.findAll({ where: { userId, itemType: 'activity' } })
      res.status(200).json(FavoritesActivities)
    } catch (error) {
      res.status(500).json({ message: '無法取得收藏' })
    }
  },
  getFavoritesProduct: async (req, res) => {
    const { userId } = req.params
    if (!userId) {
      return res.status(400).json({ message: '使用者ID為必填' })
    }
    try {
      const FavoritesProducts = await Favorite.findAll({ where: { userId, itemType: 'product' } })
      res.status(200).json(FavoritesProducts)
    } catch (error) {
      res.status(500).json({ message: '無法取得收藏' })
    }
  },
  createFavorite: async (req, res) => {
    const { userId, itemId, itemType } = req.body
    if (!userId || !itemId || !itemType) {
      return res.status(400).json({ message: '缺少必要參數' })
    }
    try {
      const favorite = await Favorite.create({ userId, itemId, itemType })
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
      await Favorite.destroy({ where: { id } })
      res.status(200).json({ message: '收藏已刪除' })
    } catch (error) {
      res.status(500).json({ message: '無法刪除收藏' })
    }
  }
}

export default favoriteController