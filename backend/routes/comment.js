const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment-controller.js')
const verifyToken = require('../middlewares/auth.js')

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: 評論相關操作
 */


//可能會用於後台管理查看所有評論的情況
/**
 * @swagger
 * /comments:
 *   get:
 *     tags:
 *       - Comments
 *     summary: 取得所有評論
 *     description: 獲取所有存儲在資料庫中的評論。
 *     responses:
 *       200:
 *         description: 成功取得所有評論
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   content:
 *                     type: string
 *                     example: "這是一則用戶評論。"
 *                   user_id:
 *                     type: integer
 *                     example: 5
 *                   location_id:
 *                     type: integer
 *                     example: 3
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-09T12:00:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-09T12:30:00Z"
 *       500:
 *         description: 伺服器錯誤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 伺服器錯誤
 */

router.get('/', commentController.getAllComments)


// 新增評論
/**
 * @swagger
 * /comments:
 *   post:
 *     tags:
 *       - Comments
 *     summary: 新增評論
 *     description: 為指定的活動或產品新增評論，需登入驗證。
 *     security:
 *       - bearerAuth: []  # 需要 JWT 驗證
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: 評論內容
 *                 example: "這個活動真的很棒！"
 *               activity_id:
 *                 type: integer
 *                 description: 參與的活動 ID（如果是針對活動的評論）
 *                 example: 1
 *               product_id:
 *                 type: integer
 *                 description: 評論的產品 ID（如果是針對產品的評論）
 *                 example: 2
 *     responses:
 *       200:
 *         description: 成功新增評論
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 10
 *                 content:
 *                   type: string
 *                   example: "這個活動真的很棒！"
 *                 user_id:
 *                   type: integer
 *                   example: 5
 *                 activity_id:
 *                   type: integer
 *                   example: 1
 *                 product_id:
 *                   type: integer
 *                   example: 2
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-09T12:00:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-09T12:30:00Z"
 *       500:
 *         description: 伺服器錯誤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 伺服器錯誤
 */

router.post('/', verifyToken, commentController.createComment)


// 更新評論
/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     tags:
 *       - Comments
 *     summary: 更新評論
 *     description: 更新指定評論的內容或相關資訊。
 *     security:
 *       - bearerAuth: []  # 需要 JWT 驗證
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要更新的評論 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: 更新後的評論內容
 *                 example: "我更改了這則評論。"
 *               user_id:
 *                 type: integer
 *                 description: 發表此評論的用戶 ID
 *                 example: 5
 *               activity_id:
 *                 type: integer
 *                 description: 相關的活動 ID
 *                 example: 1
 *               product_id:
 *                 type: integer
 *                 description: 相關的產品 ID
 *                 example: 2
 *     responses:
 *       200:
 *         description: 成功更新評論
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 評論更新成功
 *                 updatedComment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 10
 *                     content:
 *                       type: string
 *                       example: "我更改了這則評論。"
 *                     user_id:
 *                       type: integer
 *                       example: 5
 *                     activity_id:
 *                       type: integer
 *                       example: 1
 *                     product_id:
 *                       type: integer
 *                       example: 2
 *       404:
 *         description: 找不到評論
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 找不到指定的評論
 *       500:
 *         description: 伺服器錯誤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 伺服器錯誤
 */

router.put('/:id', verifyToken, commentController.updateComment)


// 刪除評論
/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     tags:
 *       - Comments
 *     summary: 刪除評論
 *     description: 刪除指定的評論。
 *     security:
 *       - bearerAuth: []  # 需要 JWT 驗證
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要刪除的評論 ID
 *     responses:
 *       200:
 *         description: 成功刪除評論
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 評論已刪除
 *       404:
 *         description: 找不到指定的評論
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 找不到指定的評論
 *       500:
 *         description: 伺服器錯誤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 伺服器錯誤
 */

router.delete('/:id', verifyToken, commentController.deleteComment)

// 取得特定活動評論
/**
 * @swagger
 * /comments/activities/{activityId}:
 *   get:
 *     tags:
 *       - Comments
 *     summary: 取得指定活動的所有評論
 *     description: 根據活動 ID 查詢所有相關的評論，並包含用戶資訊。
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要查詢的活動 ID
 *     responses:
 *       200:
 *         description: 成功取得指定活動的所有評論
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   content:
 *                     type: string
 *                     example: "這個活動非常精彩！"
 *                   user_id:
 *                     type: integer
 *                     example: 5
 *                   activity_id:
 *                     type: integer
 *                     example: 10
 *                   user:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       image:
 *                         type: string
 *                         example: "https://example.com/uploads/user1.jpg"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-09T12:00:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-09T12:30:00Z"
 *       404:
 *         description: 找不到任何相關評論
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 找不到任何相關評論
 *       500:
 *         description: 伺服器錯誤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 伺服器錯誤
 */

router.get('/activities/:activityId', commentController.getCommentsByActivityId)

// 取得特定商品評論
/**
 * @swagger
 * /comments/products/{productId}:
 *   get:
 *     tags:
 *       - Comments
 *     summary: 取得指定產品的所有評論
 *     description: 根據產品 ID 查詢所有相關的評論，並包含用戶資訊。
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要查詢的產品 ID
 *     responses:
 *       200:
 *         description: 成功取得指定產品的所有評論
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   content:
 *                     type: string
 *                     example: "這個產品品質很好，值得推薦。"
 *                   user_id:
 *                     type: integer
 *                     example: 5
 *                   product_id:
 *                     type: integer
 *                     example: 20
 *                   user:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "Jane Doe"
 *                       image:
 *                         type: string
 *                         example: "https://example.com/uploads/user2.jpg"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-09T12:00:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-09T12:30:00Z"
 *       404:
 *         description: 找不到任何相關評論
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 找不到任何相關評論
 *       500:
 *         description: 伺服器錯誤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 伺服器錯誤
 */

router.get('/products/:productId', commentController.getCommentsByProductId)


// 取得特定景點的所有評論
/**
 * @swagger
 * /comments/locations/{locationId}:
 *   get:
 *     tags:
 *       - Comments
 *     summary: 取得指定地點的所有評論
 *     description: 根據地點 ID 查詢所有相關的評論。
 *     parameters:
 *       - in: path
 *         name: locationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要查詢的地點 ID
 *     responses:
 *       200:
 *         description: 成功取得指定地點的所有評論
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   content:
 *                     type: string
 *                     example: "這個景點非常值得一來！"
 *                   user_id:
 *                     type: integer
 *                     example: 5
 *                   location_id:
 *                     type: integer
 *                     example: 10
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-09T12:00:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-09T12:30:00Z"
 *       404:
 *         description: 找不到任何相關評論
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 找不到任何相關評論
 *       500:
 *         description: 伺服器錯誤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 伺服器錯誤
 */

router.get('/locations/:locationId', commentController.getCommentsByLocationId)



// 取得特定user評論
/**
 * @swagger
 * /comments/users/{userId}:
 *   get:
 *     tags:
 *       - Comments
 *     summary: 取得指定使用者的所有評論
 *     description: 根據使用者 ID 查詢該用戶發表的所有評論。
 *     security:
 *       - bearerAuth: []  # 需要 JWT 驗證
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要查詢的使用者 ID
 *     responses:
 *       200:
 *         description: 成功取得指定使用者的所有評論
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   content:
 *                     type: string
 *                     example: "這個產品非常棒！"
 *                   user_id:
 *                     type: integer
 *                     example: 5
 *                   activity_id:
 *                     type: integer
 *                     example: 10
 *                   product_id:
 *                     type: integer
 *                     example: 20
 *                   location_id:
 *                     type: integer
 *                     example: 15
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-09T12:00:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-09T12:30:00Z"
 *       404:
 *         description: 找不到任何相關評論
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 找不到任何相關評論
 *       500:
 *         description: 伺服器錯誤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 伺服器錯誤
 */

router.get('/users/:userId', verifyToken, commentController.getCommentsByUserId)



module.exports = router