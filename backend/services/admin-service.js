import { User } from '../models/index.js'

const adminService = {
  getAllUsers: async () => {
    return await User.findAll({
      attributes: ['id', 'name', 'email', 'is_admin', 'createdAt'],
    })
  },

  updateUserRole: async (userId, is_admin, currentUserId) => {
    const user = await User.findByPk(userId)
    if (!user) {
      throw new Error('使用者不存在')
    }

    if (currentUserId === parseInt(userId, 10)) {
      throw new Error('管理員無法修改自己的角色')
    }

    user.is_admin = is_admin
    await user.save()
    return user
  },

  deleteUser: async (userId, currentUserId) => {
    const user = await User.findByPk(userId)
    if (!user) {
      throw new Error('使用者不存在')
    }

    if (currentUserId === parseInt(userId, 10)) {
      throw new Error('管理員無法刪除自己的角色')
    }

    await user.destroy()
    return '已成功刪除用戶'
  }
}

export default adminService
