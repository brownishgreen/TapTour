const express = require('express')
const router = express.Router()
const activityController = require('../controllers/activity-controller.js')
const verifyToken = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

const multer = require('multer')
const upload = multer({ dest: 'uploads/activities' })

// 取得所有活動
router.get('/', activityController.getAllActivities)
// 取得活動編輯頁面
router.get('/:activityId/edit', verifyToken, isAdmin, activityController.editActivityPage)
// 取得活動創建頁面
router.get('/create', verifyToken, isAdmin, activityController.createActivityPage)
// 創建活動
router.post('/',
  verifyToken,
  isAdmin,
  upload.fields([
    { name: 'activity-image-0', maxCount: 1 },
    { name: 'activity-image-1', maxCount: 1 },
    { name: 'activity-image-2', maxCount: 1 },
    { name: 'activity-image-3', maxCount: 1 },
    { name: 'activity-image-4', maxCount: 1 }
  ]),
  activityController.createActivity)
// 編輯活動
router.put('/:activityId', verifyToken, isAdmin, activityController.editActivity)
// 刪除活動
router.delete('/:activityId', verifyToken, isAdmin, activityController.deleteActivity)
// 取得活動
router.get('/:activityId', activityController.getActivityById)

module.exports = router
