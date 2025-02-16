import followerService from '../services/follower-service.js'

const followerController = {
  followUser: async (req, res, next) => {
    const followerId = req.user.id
    const { followingId } = req.body

    try {
      // created 是 Sequelize 的 findOrCreate 方法 的固定返回值名稱之一
      // created 是布林值，表示這次操作是否創建了新的記錄（created）
      const [follow, created] = await followerService.followUser(followerId, followingId)

      if (!created) {
        return res.status(200).json({
          message: '您已追蹤該名使用者',
          alreadyFollowing: true,
        })
      }
      res.status(201).json({ message: 'Followed successfully.', follow })
    } catch (error) {
      error.statusCode = 500
      next(error)
    }
  },

  unfollowUser: async (req, res, next) => {
    const followerId = req.user.id
    const { followingId } = req.body


    if (!followerId || !followingId) {
      throw new Error('FollowerId 或 FollowingId 缺失')
    }

    try {
      const result = await followerService.unfollowUser(followerId, followingId)
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  },
}
export default followerController
