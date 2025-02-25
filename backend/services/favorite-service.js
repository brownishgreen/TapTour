import { Activity, Favorite, Product, Image } from '../models/index.js'
import CustomError from '../utils/CustomError.js'

const favoriteService = {
  getFavoritesByType: async (userId, itemType) => {
    if (!userId) throw new CustomError(400, '使用者ID為必填')

    return await Favorite.findAll({
      where: { user_id: userId, item_type: itemType },
    })
  },

  createFavorite: async (user_id, item_id, item_type) => {
    if (!user_id || !item_id || !item_type)
      throw new CustomError(400, '缺少必要參數')

    const [favorite, created] = await Favorite.findOrCreate({
      where: { user_id, item_id, item_type },
    })

    if (!created) {
      return { message: '該項目已加入收藏', alreadyFavorited: true }
    }

    return { message: '成功加入收藏', favorite }
  },

  deleteFavorite: async (id) => {
    if (!id) throw new CustomError(400, '缺少必要參數')

    const favorite = await Favorite.findByPk(id)
    if (!favorite) throw new CustomError(404, '找不到該收藏紀錄')

    await favorite.destroy()
    return { message: '收藏已移除' }
  },

  checkFavorite: async (user_id, item_id, item_type) => {
    if (!user_id || !item_id || !item_type)
      throw new CustomError(400, '缺少必要參數')

    const favorite = await Favorite.findOne({
      where: { user_id: user_id, item_id: item_id, item_type: item_type },
    })
    return favorite
      ? { isFavorited: true, favoriteId: favorite.id }
      : { isFavorited: false, favoriteId: null }
  },
  getUserFavorites: async (userId) => {
    if (!userId) throw new CustomError(400, '缺少必要參數')
    const favoriteActivities = await Favorite.findAll({
      where: { user_id: userId, item_type: 'activity' },
      include: [
        {
          model: Activity,
          as: 'Activity',
          attributes: ['id', 'name', 'description'],
          include: [
            {
              model: Image, //加入 Image 關聯
              as: 'images',
              attributes: ['image_url'],
              required: false,
            },
          ],
        },
      ],
    })

    const favoriteProducts = await Favorite.findAll({
      where: { user_id: userId, item_type: 'product' },
      include: [
        {
          model: Product,
          as: 'Product',
          attributes: ['id', 'name', 'description'],
          include: [
            {
              model: Image,
              as: 'images',
              attributes: ['image_url'],
              required: false,
            },
          ],
        },
      ],
    })
    return {
      activities: favoriteActivities.map((f) => ({
        id: f.Activity.id,
        name: f.Activity.name,
        description: f.Activity.description,
        image: f.Activity.images?.[0]?.image_url || '/default-activity.jpg',
      })),
      products: favoriteProducts.map((f) => ({
        id: f.Product.id,
        name: f.Product.name,
        description: f.Product.description,
        image: f.Product.images?.[0]?.image_url || '/default-activity.jpg',
      })),
    }
  },
}

export default favoriteService
