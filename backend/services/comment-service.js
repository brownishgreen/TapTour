import { Comment, User, Activity, Product } from '../models/index.js'
import CustomError from '../utils/CustomError.js'

const commentService = {
  getAllComments: async () => {
    return await Comment.findAll()
  },

  createComment: async (content, userId, activityId, productId) => {
    if (!content) throw new CustomError(400, '評論內容不可為空')
    return await Comment.create({
      content,
      user_id: userId,
      activity_id: activityId,
      product_id: productId,
    })
  },

  updateComment: async (id, content, userId, activityId, productId) => {
    if (!content) throw new CustomError(400, '評論內容不可為空')

    const comment = await Comment.findByPk(id)
    if (!comment) throw new CustomError(404, '評論不存在')

    if (comment.user_id !== userId) {
      throw new CustomError(403, '您沒有權限修改此評論')
    }

    return await Comment.update(
      {
        content,
        user_id: userId,
        activity_id: activityId,
        product_id: productId,
      },
      { where: { id } }
    )
  },

  deleteComment: async (id, userId) => {
    const comment = await Comment.findByPk(id)
    if (!comment) throw new CustomError(404, '評論不存在')

    if (comment.user_id !== userId) {
      throw new CustomError(403, '您沒有權限刪除此評論')
    }

    await comment.destroy()
    return { message: '評論已刪除' }
  },

  getCommentsByLocationId: async (locationId) => {
    if (!locationId) throw new CustomError(400, '缺少 locationId')
    return await Comment.findAll({ where: { location_id: locationId } })
  },

  getCommentsByUserId: async (userId) => {
    if (!userId) throw new CustomError(400, '缺少 userId')
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
    if (!activityId) throw new CustomError(400, '缺少 activityId')

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
    if (!productId) throw new CustomError(400, '缺少 productId')
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
  },
}

export default commentService
