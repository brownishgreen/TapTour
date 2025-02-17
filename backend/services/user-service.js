import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User, Follower } from '../models/index.js'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const SECRET = process.env.JWT_SECRET
const EXPIRES = process.env.JWT_EXPIRES

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const userService = {
  register: async (userData) => {
    const { name, email, password } = userData
    // 檢查必填欄位
    if (!name || !email || !password) {
      throw new Error('請您必須填寫所有欄位')
    }

    // 檢查 email 是否已存在
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      throw new Error('此 email 已經註冊過')
    }

    // 密碼加密
    const hash = await bcrypt.hash(password, 10)
    await User.create({ name, email, password: hash })
    return { message: '註冊成功' }
  },

  login: async (email, password) => {
    if (!email || !password) {
      throw new Error('請輸入帳號密碼')
    }
    
    const user = await User.findOne({ where: { email } })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('帳號或密碼錯誤')
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, is_admin: user.is_admin },
      SECRET,
      { expiresIn: EXPIRES }
    )

    return { message: '登入成功', userId: user.id, token }
  },

  getUserProfile: async (targetUserId, currentUserId) => {
    const user = await User.findByPk(targetUserId, {
      attributes: ['id', 'image', 'name', 'email', 'bio', 'createdAt'],
    })
    if (!user) throw new Error('用戶不存在')

    const isFollowing = !!(await Follower.findOne({
      where: { follower_id: currentUserId, following_id: targetUserId },
    }))

    const followerRecords = await Follower.findAll({
      where: { following_id: targetUserId },
      attributes: ['follower_id'],
    })
    const followerIds = followerRecords.map(f => f.follower_id)

    const followingRecords = await Follower.findAll({
      where: { follower_id: targetUserId },
      attributes: ['following_id'],
    })
    const followingIds = followingRecords.map(f => f.following_id)

    const followers = await User.findAll({
      where: { id: followerIds },
      attributes: ['id', 'name', 'image'],
    })

    const following = await User.findAll({
      where: { id: followingIds },
      attributes: ['id', 'name', 'image'],
    })

    return { user, isFollowing, followers, following }
  },

  verifyUser: async (user) => {
    if (!user) throw new Error('未登入')

    const userData = await User.findOne({
      where: { id: user.id },
      attributes: ['id', 'name', 'email', 'is_admin'],
    })

    if (!userData) throw new Error('用戶不存在')

    return {
      message: '已登入',
      userId: userData.id,
      name: userData.name,
      email: userData.email,
      isAdmin: userData.is_admin,
    }
  },

  updateProfile: async (userId, { name, password, bio, image }) => {
    const user = await User.findByPk(userId)
    if (!user) throw new Error('用戶不存在')

    if (name) user.name = name
    if (password) user.password = await bcrypt.hash(password, 10)
    if (bio) user.bio = bio

    if (image) {
      const base64Data = image.replace(/^data:image\/\w+;base64,/, '')
      const imagePath = path.join(__dirname, `../uploads/avatars/avatar-${Date.now()}.png`)
      fs.writeFileSync(imagePath, base64Data, 'base64')
      user.image = `http://localhost:3000/uploads/avatars/${path.basename(imagePath)}`
    }

    await user.save()
    return { message: '資料更新成功', user }
  }
}

export default userService
