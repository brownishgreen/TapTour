const express = require('express')
const router = express.Router()
const activityController = require('../controllers/activity-controller.js')
const verifyToken = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')


router.get('/activity/:id', activityController.getActivityById)
router.get('activities', activityController.getAllActivities)
router.get('/activity/:id/edit', verifyToken, isAdmin, activityController.editActivityPage)
router.post('/activity/:id/edit', verifyToken, isAdmin, activityController.editActivity)

module.exports = router
