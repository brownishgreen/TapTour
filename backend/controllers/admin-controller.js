import adminService from '../services/admin-service.js'

const adminController = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await adminService.getAllUsers()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ message: '無法取得用戶' })
      next(error)
    }
  },
  updateUserRole: async (req, res, next) => {
    const { userId } = req.params
    const { is_admin } = req.body
    const currentUserId = req.user.id

    try {
      const user = await adminService.updateUserRole(userId, is_admin, currentUserId)
      res.status(200).json({ message: '角色更新成功', user })
    } catch (error) {
      res.status(500).json({ message: '無法更新角色' })
      next(error)
    }
  },
  deleteUser: async (req, res, next) => {
    const { userId } = req.params
    const currentUserId = req.user.id

    try {
      const message = await adminService.deleteUser(userId, currentUserId)
      res.status(200).json({ message })
    } catch (error) {
      res.status(500).json({ message: '無法刪除用戶' })
      next(error)
    }
  }
}

export default adminController