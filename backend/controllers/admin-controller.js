const { User } = require('../models')

const adminController = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'is_admin', 'createdAt'],
      })
      res.status(200).json(users)
    } catch (err) {
      err.statusCode = 500
      next(err)
    }
  },
  updateUserRole: async (req, res, next) => {
    const { userId } = req.params // 從 URL 參數中獲取用戶 ID
    const { is_admin } = req.body // 從請求體中獲取新的角色

    try {
      const user = await User.findByPk(userId)
      if (!user) {
        return res.status(404).json({ message: '使用者不存在' })
      }

      user.is_admin = is_admin
      await user.save()

      res.status(200).json({ message: '角色更新成功', user })
    } catch (err) {
      res.status(500)
      next(err)
    }
  },
  deleteUser: async (req, res, next) => {
    const { userId } = req.params
    try {
      const user = await User.findByPk(userId)
      if (!user) {
        return res.status(404).json({ message: '使用者不存在' })
      }
      await user.destroy()
      return res.status(200).json({ message: '已成功刪除用戶' })
    } catch (err) {
      next(err)
    }
  },
}

module.exports = adminController
