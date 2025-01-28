const { Follower } = require('../models')

const followerController = {
  followUser: async (req, res, next) => {
    const followerId = req.user.id
    const { followingId } = req.body

    console.log('req.userId:', req.user.id) // 檢查用戶 ID 是否存在
    console.log('req.body:', req.body) // 確認請求中是否有 followingId

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

      console.log('FollowerId:', followerId) // 檢查後端接收到的值
      console.log('FollowingId:', followingId)

      if (!created) {
        return res.status(200).json({
          message: '您已追蹤該名使用者',
          alreadyFollowing: true,
        })
      }

      if (!followerId || !followingId) {
        throw new Error('FollowerId 或 FollowingId 缺失')
      }

      res.status(201).json({ message: 'Followed successfully.', follow })
    } catch (err) {
      err.statusCode = 500
      next(err)
    }
  },

  unfollowUser: async (req, res, next) => {
    const followerId = req.user.id
    const { followingId } = req.body

    try {
      const follow = await Follower.findOne({
        where: { follower_id: followerId, following_id: followingId },
      })

      if (!follow) {
        return res.status(200).json({
          message: '您尚未追蹤該用戶',
          alreadyUnfollowed: true,
        })
      }

      await follow.destroy()
      res.status(200).json({ message: '取消追蹤成功' })
    } catch (error) {
      next(error)
    }
  },
}
module.exports = followerController
