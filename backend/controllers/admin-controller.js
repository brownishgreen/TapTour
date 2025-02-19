import adminService from '../services/admin-service.js'
import { handleError } from '../utils/handleError.js'

const adminController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await adminService.getAllUsers()
      res.status(200).json(users)
    } catch (err) {
      handleError(res, err)
    }
  },
  updateUserRole: async (req, res) => {
    try {
      const { userId } = req.params
      const { is_admin } = req.body
      const currentUserId = req.user.id

      const updateUserRoleResult = await adminService.updateUserRole(
        userId,
        is_admin,
        currentUserId
      )
      res.status(200).json({ message: '角色更新成功', updateUserRoleResult })
    } catch (err) {
      handleError(res, err)
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params
      const currentUserId = req.user.id

      const message = await adminService.deleteUser(userId, currentUserId)
      res.status(200).json({ message })
    } catch (err) {
      handleError(res, err)
    }
  },
}

export default adminController
