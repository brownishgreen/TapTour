const express = require('express')
const router = express.Router()
const activityController = require('../controllers/activity-controller.js')
const verifyToken = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')
const { handleImageUpload } = require('../utils/upload-handler')

// 取得所有活動
router.get('/', activityController.getAllActivities)

router.get('/paginated', activityController.getPaginatedActivities)


//取得活動編輯頁面
router.get('/:id/edit', verifyToken, isAdmin, activityController.editActivityPage)

// 取得活動創建頁面
router.get('/create', verifyToken, isAdmin, activityController.createActivityPage)

// 創建活動
router.post(
  '/',
  verifyToken,
  isAdmin,
  handleImageUpload,
  activityController.createActivity
)

// 編輯活動
router.put('/:id', verifyToken, isAdmin, activityController.editActivity)

// 刪除活動
router.delete('/:id', verifyToken, isAdmin, activityController.deleteActivity)

// 取得活動
router.get('/:id', activityController.getActivityById)

module.exports = router
