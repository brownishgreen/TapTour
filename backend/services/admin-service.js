import { User } from '../models/index.js'
import CustomError from '../utils/CustomError.js'

const adminService = {
  getAllUsers: async () => {
    try {
      return await User.findAll({
        attributes: ['id', 'name', 'email', 'is_admin', 'createdAt'],
      })
    } catch (error) {
      throw new CustomError(500, '無法取得用戶列表')
    }
  },

  updateUserRole: async (userId, is_admin, currentUserId) => {
    const user = await User.findByPk(userId)
    if (!user) {
      throw new CustomError(404, '使用者不存在')
    }

    if (parseInt(currentUserId, 10) === parseInt(userId, 10)) {
      throw new CustomError(403, '管理員無法修改自己的角色')
    }

    try {
      user.is_admin = is_admin
      await user.save()
      return user
    } catch (error) {
      throw new CustomError(500, '角色更新失敗')
    }
  },

  deleteUser: async (userId, currentUserId) => {
    const user = await User.findByPk(userId)
    if (!user) {
      throw new CustomError(404, '使用者不存在')
    }

    if (parseInt(currentUserId, 10) === parseInt(userId, 10)) {
      throw new CustomError(403, '管理員無法刪除自己')
    }

    try {
      await user.destroy()
      return '已成功刪除用戶'
    } catch (error) {
      throw new CustomError(500, '刪除用戶失敗')
    }
  },
}

export default adminService
