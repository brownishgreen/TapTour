const express = require('express')
const router = express.Router()
const activityController = require('../controllers/activity-controller.js')
const verifyToken = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')



router.get('/activities', activityController.getAllActivities)
router.get('/activity/:activityId/edit', verifyToken, isAdmin, activityController.editActivityPage)
router.get('/activity/create', verifyToken, isAdmin, activityController.createActivityPage)
router.post('/activity/create', verifyToken, isAdmin, activityController.createActivity)
router.put('/activity/:activityId/edit', verifyToken, isAdmin, activityController.editActivity)
router.delete('/activity/:activityId', verifyToken, isAdmin, activityController.deleteActivity)
router.get('/activity/:activityId', activityController.getActivityById)

module.exports = router
