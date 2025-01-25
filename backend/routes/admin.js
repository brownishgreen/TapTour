const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin-controller')
const verifyToken = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

router.get('/users', verifyToken, isAdmin, adminController.getAllUsers)
router.put(
  '/users/:userId',
  verifyToken,
  isAdmin,
  adminController.updateUserRole
)
router.delete(
  '/users/:userId',
  verifyToken,
  isAdmin,
  adminController.deleteUser
)

module.exports = router
