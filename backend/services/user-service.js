import multerConfig from '../utils/multer-config.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User, Follower } from '../models/index.js'
import path from 'path'
import { fileURLToPath } from 'url'
import CustomError from '../utils/CustomError.js' 

const { uploadToGCS } = multerConfig
const SECRET = process.env.JWT_SECRET
const EXPIRES = process.env.JWT_EXPIRES

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const userService = {
  register: async (userData) => {
    const { name, email, password } = userData
    // 檢查必填欄位
    if (!name || !email || !password) {
      throw new CustomError(400, '請您必須填寫所有欄位')
    }

    // 檢查 email 是否已存在
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      throw new CustomError(409, '此 email 已經註冊過')
    }

    // 密碼加密
    const hash = await bcrypt.hash(password, 10)
    await User.create({ name, email, password: hash })
    return { message: '註冊成功' }
  },

  login: async (email, password) => {
    if (!email || !password) {
      throw new CustomError(400, '請輸入帳號密碼')
    }

    const user = await User.findOne({ where: { email } })
    if (!user) {
      throw new CustomError(401, '帳號或密碼錯誤')
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    console.log('📌 密碼比對結果:', isMatch)

    if (!isMatch) {
      throw new CustomError(401, '帳號或密碼錯誤')
    }

    if(!SECRET) {
      throw new CustomError(500, 'JWT_SECRET 未設定')
    }
    // 生成 JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, is_admin: user.is_admin },
      SECRET,
      { expiresIn: EXPIRES }
    )
    return { message: '登入成功', userId: user.id, isAdmin: user.is_admin, token }
  },

  getUserProfile: async (targetUserId, currentUserId) => {
    const user = await User.findByPk(targetUserId, {
      attributes: ['id', 'image', 'name', 'email', 'bio', 'createdAt'],
    })
    if (!user) throw new CustomError(404, '用戶不存在')

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
    if (!user) throw new CustomError(401, '未登入')

    const userData = await User.findOne({
      where: { id: user.id },
      attributes: ['id', 'name', 'email', 'is_admin'],
    })

    if (!userData) throw new CustomError(404, '用戶不存在')
    
    // 簽發新的 JWT Token
    const token = jwt.sign(
      { id: userData.id, isAdmin: userData.is_admin },
      SECRET,
      { expiresIn: EXPIRES || '3h' } 
    )

    return {
      message: '已登入',
      userId: userData.id,
      name: userData.name,
      email: userData.email,
      isAdmin: userData.is_admin,
      token,
    }
  },

  updateProfile: async (userId, userData, avatar) => {
    const user = await User.findByPk(userId)
    if (!user) throw new CustomError(404, '用戶不存在')

    if (userData.name) user.name = userData.name
    if (userData.password) user.password = await bcrypt.hash(userData.password, 10)
    if (userData.bio) user.bio = userData.bio

    if (avatar) {
      let imageUrl
      if (process.env.NODE_ENV === 'production') {
        // 雲端：走 GCS
        imageUrl = await uploadToGCS(avatar, 'avatars', userId)
      } else {
        const fs = await import('fs')
        const filename = `${userId}-${Date.now()}-${avatar.originalname}`
        const localDir = path.join(process.cwd(), 'uploads', 'avatars')
        const localPath = path.join(localDir, filename)
        if (!fs.existsSync(localDir)) fs.mkdirSync(localDir, { recursive: true })
        fs.writeFileSync(localPath, avatar.buffer)
        imageUrl = `/uploads/avatars/${filename}`
      }
      if (imageUrl) user.image = imageUrl
    }

    await user.save()
    return { message: '資料更新成功', user }
  }
}

export default userService
