const { Follower } = require('../models')

const followerController = {
  followUser: async (req, res, next) => {
    const { followerId, followingId } = req.body

    if (followerId === followingId) {
      const err = new Error('您不能追蹤自己')
      err.statusCode = 400
      throw err
    }

    try {
      // created 是 Sequelize 的 findOrCreate 方法 的固定返回值名稱之一
      // created 是布林值，表示這次操作是否創建了新的記錄（created）
      const [follow, created] = await Follower.findOrCreate({
        where: { follower_id: followerId, following_id: followingId },
      })

      if (!created) {
        const err = new Error('您已追蹤該名使用者')
        err.statusCode = 400
        throw err
      }

      res.status(201).json({ message: 'Followed successfully.', follow })
    } catch (err) {
      err.statusCode = 500
      next(err)
    }
  },
}
module.exports = followerController
