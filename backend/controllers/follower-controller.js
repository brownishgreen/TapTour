import followerService from '../services/follower-service.js'
import { handleError } from '../utils/handleError.js'

const followerController = {
  followUser: async (req, res) => {
    try {
      const followerId = req.user.id
      const { followingId } = req.body

      const { follow, created } = await followerService.followUser(
        followerId,
        followingId
      )

      if (!created) {
        return res.status(200).json({
          message: '您已追蹤該名使用者',
          alreadyFollowing: true,
        })
      }

      res.status(201).json({ message: '追蹤成功', follow })
    } catch (error) {
      handleError(res, error)
    }
  },

  unfollowUser: async (req, res) => {
    try {
      const followerId = req.user.id
      const { followingId } = req.body

      const result = await followerService.unfollowUser(followerId, followingId)
      res.status(200).json(result)
    } catch (error) {
      handleError(res, error)
    }
  },
}

export default followerController
