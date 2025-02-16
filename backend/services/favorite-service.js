import { Favorite } from '../models/index.js'

const favoriteService = {
  getFavoritesByType: async (userId, itemType) => {
    if (!userId) throw new Error('使用者ID為必填')

    return await Favorite.findAll({ where: { user_id: userId, item_type: itemType } })
  },

  createFavorite: async (user_id, item_id, item_type) => {
    if (!user_id || !item_id || !item_type) throw new Error('缺少必要參數')

    return await Favorite.create({ user_id: user_id, item_id: item_id, item_type: item_type })
  },

  deleteFavorite: async (id) => {
    if (!id) throw new Error('缺少必要參數')

    return await Favorite.destroy({ where: { id } })
  },

  checkFavorite: async (user_id, item_id, item_type) => {
    if (!user_id || !item_id || !item_type) throw new Error('缺少必要參數')

    const favorite = await Favorite.findOne({ where: { user_id: user_id, item_id: item_id, item_type: item_type } })
    return favorite ? { isFavorited: true, favoriteId: favorite.id } : { isFavorited: false, favoriteId: null }
  }
}

export default favoriteService
