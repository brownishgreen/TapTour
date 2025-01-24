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
    const { targetUserId } = req.params
    const { is_admin } = req.body

    try {
      const targetUser = await User.findByPk(targetUserId)

      if (!targetUser) {
        return res.status(404).json({ message: 'User not found' })
      }

      targetUser.is_admin = is_admin
      await targetUser.save()

      res.status(200).json({ message: 'User role updated successfully' })
    } catch (err) {
      res.status(500)
      next(err)
    }
  },
}

module.exports = adminController
