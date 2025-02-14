import express from 'express'
import verifyToken from '../middlewares/auth.js'
import followerController from '../controllers/follower-controller.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Followers
 *   description: 追蹤者相關操作
 */


/**
 * @swagger
 * /followers/follow:
 *   post:
 *     tags:
 *       - Followers
 *     summary: 追蹤使用者
 *     description: 讓當前登入用戶追蹤指定的使用者。
 *     security:
 *       - bearerAuth: []  # 需要 JWT 驗證
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               followingId:
 *                 type: integer
 *                 description: 要追蹤的使用者 ID
 *                 example: 2
 *     responses:
 *       201:
 *         description: 成功追蹤使用者
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Followed successfully.
 *                 follow:
 *                   type: object
 *                   properties:
 *                     follower_id:
 *                       type: integer
 *                       example: 1
 *                     following_id:
 *                       type: integer
 *                       example: 2
 *       200:
 *         description: 已經追蹤該使用者
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 您已追蹤該名使用者
 *                 alreadyFollowing:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: 無效的請求（如嘗試追蹤自己或缺少必要參數）
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 您不能追蹤自己
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

router.post('/follow', verifyToken, followerController.followUser)

/**
 * @swagger
 * /followers/unfollow:
 *   post:
 *     tags:
 *       - Followers
 *     summary: 取消追蹤使用者
 *     description: 讓當前登入用戶取消追蹤指定的使用者。
 *     security:
 *       - bearerAuth: []  # 需要 JWT 驗證
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               followingId:
 *                 type: integer
 *                 description: 要取消追蹤的使用者 ID
 *                 example: 2
 *     responses:
 *       200:
 *         description: 成功取消追蹤或用戶尚未被追蹤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 取消追蹤成功
 *                 alreadyUnfollowed:
 *                   type: boolean
 *                   example: true
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

router.post('/unfollow', verifyToken, followerController.unfollowUser)

export default router
