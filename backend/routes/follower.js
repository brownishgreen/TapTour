const express = require('express')
const router = express.Router()
const followerController = require('../controllers/follower-controller.js')

router.post('/follow', followerController.followUser)

module.exports = router