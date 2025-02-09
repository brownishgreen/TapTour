const express = require('express')
const router = express.Router()
const ordersController = require('../controllers/order-controller')

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: 訂單相關操作
 */


/**
 * @swagger
 * /orders/create:
 *   post:
 *     summary: 建立新訂單
 *     description: 根據用戶的產品和活動選擇創建訂單，並紀錄訂單的詳細項目。
 *     tags: 
 *      - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: 下訂單的用戶 ID
 *                 example: 1
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: 要購買的產品 ID 列表
 *                 example: [101, 102]
 *               activityIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: 要參與的活動 ID 列表
 *                 example: [201, 202]
 *               total_amount:
 *                 type: number
 *                 format: float
 *                 description: 訂單總金額
 *                 example: 500.75
 *               chosen_date:
 *                 type: string
 *                 format: date
 *                 description: 用戶選擇的日期
 *                 example: "2025-03-15"
 *               quantities:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: 每個產品或活動的購買數量，順序需與 productIds 和 activityIds 對應
 *                 example: [2, 1, 3, 1]
 *     responses:
 *       201:
 *         description: 訂單建立成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 訂單建立成功
 *                 orderId:
 *                   type: integer
 *                   example: 123
 *       400:
 *         description: 請求數據不完整或無效
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 請至少選擇一個產品或活動
 *       500:
 *         description: 伺服器錯誤，建立訂單失敗
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 伺服器錯誤，建立訂單失敗
 */

router.post('/create', ordersController.createOrder)

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: 取得訂單詳細資訊
 *     description: 根據訂單 ID 查詢訂單的詳細資訊，包括用戶資料、選擇的產品或活動以及其他細節。
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要查詢的訂單 ID
 *     responses:
 *       200:
 *         description: 成功取得訂單詳細資訊
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                   example: "John Doe"
 *                 userEmail:
 *                   type: string
 *                   example: "john.doe@example.com"
 *                 uuid:
 *                   type: string
 *                   example: "b4d1fc30-49d4-4b5a-9b71-1234567890ab"
 *                 chosenDate:
 *                   type: string
 *                   format: date
 *                   example: "2025-03-15"
 *                 totalAmount:
 *                   type: number
 *                   format: float
 *                   example: 299.99
 *                 item:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Sample Product"
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 149.99
 *       404:
 *         description: 找不到相關訂單或該訂單中沒有任何產品或活動
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 沒有找到相關訂單
 *       500:
 *         description: 伺服器錯誤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 伺服器錯誤
 *                 error:
 *                   type: string
 *                   example: "詳細的錯誤訊息"
 */

router.get('/:orderId', ordersController.getOrderDetails)
router.get('/user/:userId', ordersController.getOrdersByUser)

module.exports = router
