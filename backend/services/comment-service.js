import { Comment, User, Activity, Product } from '../models/index.js'

const commentService = {
  getAllComments: async () => {
    return await Comment.findAll()
  },

  createComment: async (content, userId, activityId, productId) => {
    return await Comment.create({
      content,
      user_id: userId,
      activity_id: activityId,
      product_id: productId
    })
  },

  updateComment: async (id, content, userId, activityId, productId) => {
    return await Comment.update(
      { content, user_id: userId, activity_id: activityId, product_id: productId },
      { where: { id } }
    )
  },

  deleteComment: async (id) => {
    return await Comment.destroy({ where: { id } })
  },

  getCommentsByLocationId: async (locationId) => {
    return await Comment.findAll({ where: { location_id: locationId } })
  },

  getCommentsByUserId: async (userId) => {
  return await Comment.findAll({
    where: { user_id: userId },
    order: [['createdAt', 'DESC']], // 讓最新的留言在最前面
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['name', 'image'],
      },
      {
        model: Activity, // 關聯活動
        as: 'activity',
        attributes: ['id', 'name'], // 只取必要欄位
      },
      {
        model: Product, // 關聯商品
        as: 'product',
        attributes: ['id', 'name'], // 只取必要欄位
      },
    ],
  })
},


  getCommentsByActivityId: async (activityId) => {
    return await Comment.findAll({
      where: { activity_id: activityId },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'image'],
        },
      ],
    })
  },

  getCommentsByProductId: async (productId) => {
    return await Comment.findAll({
      where: { product_id: productId },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'image'],
        },
      ],
    })
  }
}

export default commentService
