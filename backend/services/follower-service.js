import { Follower } from '../models/index.js'
import CustomError from '../utils/CustomError.js'

const followerService = {
  followUser: async (followerId, followingId) => {
    if (!followerId || !followingId) {
      throw new CustomError(400, '請提供 followerId 和 followingId')
    }
    if (followerId === followingId) {
      throw new CustomError(400, '您不能追蹤自己')
    }

    const [follow, created] = await Follower.findOrCreate({
      where: { follower_id: followerId, following_id: followingId },
    })

    return { follow, created } // ✅ 回傳物件，讓 controller 能解析
  },

  unfollowUser: async (followerId, followingId) => {
    if (!followerId || !followingId) {
      throw new CustomError(400, '請提供 followerId 和 followingId')
    }

    const follow = await Follower.findOne({
      where: { follower_id: followerId, following_id: followingId },
    })

    if (!follow) {
      throw new CustomError(404, '您尚未追蹤該用戶')
    }

    await follow.destroy()
    return { message: '取消追蹤成功' }
  },
}

export default followerService
