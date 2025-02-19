import commentService from '../services/comment-service.js'
import { handleError } from '../utils/handleError.js'

const commentController = {
  // 取得所有評論
  getAllComments: async (req, res) => {
    try {
      const comments = await commentService.getAllComments()
      res.json(comments)
    } catch (err) {
      handleError(res, err)
    }
  },
  // 新增評論
  createComment: async (req, res) => {
    try {
      const { content, activity_id, product_id } = req.body
      const comment = await commentService.createComment(
        content,
        req.user.id,
        activity_id,
        product_id
      )
      res.json(comment)
    } catch (err) {
      handleError(res, err)
    }
  },
  // 更新評論
  updateComment: async (req, res) => {
    try {
      const { id } = req.params
      const { content, user_id, activity_id, product_id } = req.body
      const comment = await commentService.updateComment(
        id,
        content,
        user_id,
        activity_id,
        product_id
      )
      res.json(comment)
    } catch (err) {
      handleError(res, err)
    }
  },
  // 刪除評論
  deleteComment: async (req, res) => {
    try {
      const { id } = req.params
      await commentService.deleteComment(id)
      res.json({ message: '評論已刪除' })
    } catch (err) {
      handleError(res, err)
    }
  },
  // 取得特定景點的所有評論
  getCommentsByLocationId: async (req, res) => {
    try {
      const { locationId } = req.params
      const comments = await commentService.getCommentsByLocationId(locationId)
      res.json(comments)
    } catch (err) {
      handleError(res, err)
    }
  },
  // 取得特定用戶的所有評論
  getCommentsByUserId: async (req, res) => {
    try {
      const { userId } = req.params
      const comments = await commentService.getCommentsByUserId(userId)
      res.json(comments)
    } catch (error) {
      handleError(res, err)
    }
  },
  // 取得特定活動的所有評論
  getCommentsByActivityId: async (req, res) => {
    try {
      const { activityId } = req.params
      const comments = await commentService.getCommentsByActivityId(activityId)
      res.json(comments)
    } catch (err) {
      handleError(res, err)
    }
  },
  // 取得特定商品的所有評論
  getCommentsByProductId: async (req, res) => {
    try {
      const { productId } = req.params
      const comments = await commentService.getCommentsByProductId(productId)
      res.json(comments)
    } catch (err) {
      handleError(res, err)
    }
  },
}

export default commentController
