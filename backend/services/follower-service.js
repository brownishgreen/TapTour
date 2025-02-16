import { Follower } from '../models/index.js'

const followerService = {
  followUser: async (followerId, followingId) => {
    if (followerId === followingId) {
      throw new Error('您不能追蹤自己')
    }

    return await Follower.findOrCreate({
      where: { follower_id: followerId, following_id: followingId },
    })
  },

  unfollowUser: async (followerId, followingId) => {
    const follow = await Follower.findOne({
      where: { follower_id: followerId, following_id: followingId },
    })

    if (!follow) {
      return { alreadyUnfollowed: true, message: '您尚未追蹤該用戶' }
    }

    await follow.destroy()
    return { message: '取消追蹤成功' }
  }
}

export default followerService
