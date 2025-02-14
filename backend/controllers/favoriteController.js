import { Favorite, User, Activity, Product } from '../models/index.js'

const favoriteController = {
  getFavoritesActivity: async (req, res) => {
    const { userId } = req.params
    if (!userId) {
      return res.status(400).json({ message: '使用者ID為必填' })
    }
    try {
      const FavoritesActivities = await Favorite.findAll({ where: { user_id: userId, item_type: 'activity' } })
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
      const FavoritesProducts = await Favorite.findAll({ where: { user_id: userId, item_type: 'activity' } })
      res.status(200).json(FavoritesProducts)
    } catch (error) {
      res.status(500).json({ message: '無法取得收藏' })
    }
  },
  createFavorite: async (req, res) => {
    const { user_id, item_id, item_type } = req.body
    if (!user_id || !item_id || !item_type) {
      return res.status(400).json({ message: '缺少必要參數' })
    }
    try {
      const favorite = await Favorite.create({ user_id, item_id, item_type })
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
  },
  checkFavorite: async (req, res) => {
    const { userId, itemId, itemType } = req.query
    console.log("🔍 檢查收藏", { userId, itemId, itemType }); // 🔍 顯示檢查收藏的參數
    if (!userId || !itemId || !itemType) {
      return res.status(400).json({ message: '缺少必要參數' })
    }
    try {
      const favorite = await Favorite.findOne({ where: { user_id: userId, item_id: itemId, item_type: itemType } })
      if (favorite) {
        res.status(200).json({ isFavorited: true, favoriteId: favorite.id })
      } else {
        res.status(200).json({ isFavorited: false, favoriteId: null })
      }
    } catch (error) {
      res.status(500).json({ message: '無法檢查收藏' })
    }
  }
}

export default favoriteController