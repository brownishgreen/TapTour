import { Comment, User, Activity, Product, Location } from '../models/index.js'

const commentController = {
  // 取得所有評論
  getAllComments: async (req, res, next) => {
    try {
      const comments = await Comment.findAll()
      res.json(comments)
    } catch (err) {
      next(err)
    }
  },
  // 新增評論
  createComment: async (req, res, next) => {
    try {
      const { content, activity_id, product_id } = req.body
      const comment = await Comment.create({
        content,
        user_id: req.user.id,
        activity_id,
        product_id
      })
      res.json(comment)
    } catch (err) {
      next(err)
    }
  },
  // 更新評論
  updateComment: async (req, res, next) => {
    try {
      const { id } = req.params
      const { content, user_id, activity_id, product_id } = req.body
      const comment = await Comment.update({ content, user_id, activity_id, product_id }, { where: { id } })
      res.json(comment)
    } catch (err) {
      next(err)
    }
  },
  // 刪除評論
  deleteComment: async (req, res, next) => {
    try {
      const { id } = req.params
      await Comment.destroy({ where: { id } })
      res.json({ message: '評論已刪除' })
    } catch (err) {
      next(err)
    }
  },
  // 取得特定景點的所有評論
  getCommentsByLocationId: async (req, res, next) => {
    try {
      const { locationId } = req.params
      const comments = await Comment.findAll({ where: { location_id: locationId } })
      res.json(comments)
    } catch (err) {
      next(err)
    }
  },
  // 取得特定用戶的所有評論
  getCommentsByUserId: async (req, res, next) => {
    try {
      const { userId } = req.params
      const comments = await Comment.findAll({ where: { user_id: userId } })
      res.json(comments)
    } catch (err) {
      next(err)
    }
  },
  // 取得特定活動的所有評論
  getCommentsByActivityId: async (req, res, next) => {
    try {
      const { activityId } = req.params
      const comments = await Comment.findAll({
        where: { activity_id: activityId },
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: User,
            as: 'user', // 確保和模型中的別名一致
            attributes: ['name', 'image'], // 只取所需的欄位
          },
        ],
      })
      res.json(comments)
      console.log(comments)
  } catch(err) {
    next(err)
  }
},
  // 取得特定商品的所有評論
  getCommentsByProductId: async (req, res, next) => {
    try {
      const { productId } = req.params
      const comments = await Comment.findAll({
        where: { product_id: productId },
        order: [['createdAt', 'DESC' ]],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['name', 'image'],
          },
        ],
      })
      res.json(comments)
    } catch (err) {
      next(err)
    }
  }
}

export default commentController