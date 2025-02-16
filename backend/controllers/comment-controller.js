import commentService from '../services/comment-service.js'

const commentController = {
  // 取得所有評論
  getAllComments: async (req, res, next) => {
    try {
      const comments = await commentService.getAllComments()
      res.json(comments)
    } catch (error) {
      res.status(500).json({ message: '無法取得評論' })
      next(error)
    }
  },
  // 新增評論
  createComment: async (req, res, next) => {
    try {
      const { content, activity_id, product_id } = req.body
      const comment = await commentService.createComment(content, req.user.id, activity_id, product_id)
      res.json(comment)
    } catch (error) {
      res.status(500).json({ message: '無法新增評論' })
      next(error)
    }
  },
  // 更新評論
  updateComment: async (req, res, next) => {
    try {
      const { id } = req.params
      const { content, user_id, activity_id, product_id } = req.body
      const comment = await commentService.updateComment(id, content, user_id, activity_id, product_id)
      res.json(comment)
    } catch (error) {
      res.status(500).json({ message: '無法更新評論' })
      next(error)
    }
  },
  // 刪除評論
  deleteComment: async (req, res, next) => {
    try {
      const { id } = req.params
      await commentService.deleteComment(id)
      res.json({ message: '評論已刪除' })
    } catch (error) {
      res.status(500).json({ message: '無法刪除評論' })
      next(error)
    }
  },
  // 取得特定景點的所有評論
  getCommentsByLocationId: async (req, res, next) => {
    try {
      const { locationId } = req.params
      const comments = await commentService.getCommentsByLocationId(locationId)
      res.json(comments)
    } catch (error) {
      res.status(500).json({ message: '無法取得特定景點的評論' })
      next(error)
    }
  },
  // 取得特定用戶的所有評論
  getCommentsByUserId: async (req, res, next) => {
    try {
      const { userId } = req.params
      const comments = await commentService.getCommentsByUserId(userId)
      res.json(comments)
    } catch (error) {
      res.status(500).json({ message: '無法取得特定用戶的評論' })
      next(error)
    }
  },
  // 取得特定活動的所有評論
  getCommentsByActivityId: async (req, res, next) => {
    try {
      const { activityId } = req.params
      const comments = await commentService.getCommentsByActivityId(activityId)
      res.json(comments)
    } catch (error) {
      res.status(500).json({ message: '無法取得特定活動的評論' })
      next(error)
    }
  },
  // 取得特定商品的所有評論
  getCommentsByProductId: async (req, res, next) => {
    try {
      const { productId } = req.params
      const comments = await commentService.getCommentsByProductId(productId)
      res.json(comments)
    } catch (error) {
      res.status(500).json({ message: '無法取得特定商品的評論' })
      next(error)
    }
  }
}

export default commentController