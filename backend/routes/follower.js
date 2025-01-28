const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/auth')
const followerController = require('../controllers/follower-controller.js')

router.post('/follow', verifyToken, followerController.followUser)
router.post('/unfollow', verifyToken, followerController.unfollowUser)

module.exports = router
