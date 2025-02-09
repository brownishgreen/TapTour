const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin-controller')
const verifyToken = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: 管理員相關操作
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Admin
 *     summary: 取得所有使用者資訊
 *     description: 僅限管理員存取，獲取系統中的所有使用者資訊。
 *     security:
 *       - bearerAuth: []  # 需要 JWT 驗證
 *     responses:
 *       200:
 *         description: 成功取得所有使用者資訊
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
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "johndoe@example.com"
 *                   is_admin:
 *                     type: boolean
 *                     example: true
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-09T12:00:00Z"
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
 */

router.get('/users', verifyToken, isAdmin, adminController.getAllUsers)


/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     tags:
 *       - Admin
 *     summary: 更新使用者角色
 *     description: 僅限管理員存取，更新指定使用者的角色（管理員或一般用戶）。
 *     security:
 *       - bearerAuth: []  # 需要 JWT 驗證
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要更新角色的使用者 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_admin:
 *                 type: boolean
 *                 description: 新的角色設置，true 表示管理員，false 表示一般用戶
 *                 example: false
 *     responses:
 *       200:
 *         description: 角色更新成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 角色更新成功
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     is_admin:
 *                       type: boolean
 *                       example: false
 *       403:
 *         description: 管理員無法修改自己的角色
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 管理員無法修改自己的角色
 *       404:
 *         description: 使用者不存在
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 使用者不存在
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
 */

router.put('/users/:userId', verifyToken, isAdmin, adminController.updateUserRole)

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: 刪除使用者
 *     description: 僅限管理員存取，刪除指定使用者。
 *     security:
 *       - bearerAuth: []  # 需要 JWT 驗證
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要刪除的使用者 ID
 *     responses:
 *       200:
 *         description: 成功刪除用戶
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 已成功刪除用戶
 *       403:
 *         description: 管理員無法刪除自己的帳號
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 管理員無法刪除自己的角色
 *       404:
 *         description: 使用者不存在
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 使用者不存在
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
 */

router.delete('/users/:userId', verifyToken, isAdmin, adminController.deleteUser)


module.exports = router
