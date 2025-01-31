const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment-controller.js')
const verifyToken = require('../middlewares/auth.js')

//可能會用於後台管理查看所有評論的情況
router.get('/', commentController.getAllComments)

// 新增評論
router.post('/', verifyToken, commentController.createComment)

// 更新評論
router.put('/:id', verifyToken, commentController.updateComment)

// 刪除評論
router.delete('/:id', verifyToken, commentController.deleteComment)

// 取得特定活動評論
router.get('/activities/:activityId', commentController.getCommentsByActivityId)

// 取得特定商品評論
router.get('/products/:productId', commentController.getCommentsByProductId)

// 取得特定景點的所有評論
router.get('/locations/:locationId', commentController.getCommentsByLocationId)


// 取得特定user評論
router.get('/users/:userId', verifyToken, commentController.getCommentsByUserId)


module.exports = router