const express = require('express')
const router = express.Router()
const activityController = require('../controllers/activity-controller.js')
const verifyToken = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')
const { handleImageUpload } = require('../utils/upload-handler')

/**
 * @swagger
 * tags:
 *   name: Activities
 *   description: 活動相關操作
 */


// 取得所有活動
/**
 * @swagger
 * /activities:
 *   get:
 *     tags:
 *       - Activities
 *     summary: 取得所有活動
 *     description: 根據查詢參數（例如關鍵字）篩選並取得所有活動資訊，包含關聯的圖片與分類資訊。
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: 用於模糊查詢活動名稱
 *     responses:
 *       200:
 *         description: 成功取得所有活動資訊
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
 *                     example: "阿里山日出觀景活動"
 *                   description:
 *                     type: string
 *                     example: "觀賞阿里山的日出，並享受自然步道探索。"
 *                   images:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         image_url:
 *                           type: string
 *                           example: "https://example.com/uploads/activity_image1.jpg"
 *                   category:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "戶外活動"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-09T12:00:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-09T12:30:00Z"
 *       404:
 *         description: 沒有符合條件的活動
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 沒有符合條件的活動
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

router.get('/', activityController.getAllActivities)


/**
 * @swagger
 * /activities/paginated:
 *   get:
 *     tags:
 *       - Activities
 *     summary: 分頁取得活動
 *     description: 根據頁碼與每頁數量分頁取得活動資料，包含活動的圖片資訊。
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 要查詢的頁碼，預設為第 1 頁
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 9
 *         description: 每頁返回的活動數量，預設為 9 筆
 *     responses:
 *       200:
 *         description: 成功取得分頁的活動資料
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 activities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "阿里山日出觀景活動"
 *                       description:
 *                         type: string
 *                         example: "觀賞阿里山日出，享受自然步道探索。"
 *                       images:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             image_url:
 *                               type: string
 *                               example: "https://example.com/uploads/activity_image1.jpg"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-09T12:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-09T12:30:00Z"
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 totalItems:
 *                   type: integer
 *                   example: 45
 *       400:
 *         description: 無效的 page 或 limit 參數
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Page and limit must be positive numbers
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

router.get('/paginated', activityController.getPaginatedActivities)


//取得活動編輯頁面
/**
 * @swagger
 * /activities/{id}/edit:
 *   get:
 *     tags:
 *       - Activities
 *     summary: 取得活動編輯頁面的詳細資料
 *     description: 取得指定活動的詳細資料，用於填充編輯表單，僅限管理員存取。
 *     security:
 *       - bearerAuth: []  # 需要 JWT 驗證
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要編輯的活動 ID
 *     responses:
 *       200:
 *         description: 成功取得活動詳細資料
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "阿里山日出觀景活動"
 *                 description:
 *                   type: string
 *                   example: "觀賞阿里山日出並享受自然步道探索。"
 *                 category_id:
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
 *       404:
 *         description: 活動不存在
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 活動不存在
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

router.get('/:id/edit', verifyToken, isAdmin, activityController.editActivityPage)

// 取得活動創建頁面
/**
 * @swagger
 * /activities/create:
 *   get:
 *     tags:
 *       - Activities
 *     summary: 取得活動創建頁面的資訊
 *     description: 返回創建活動所需的基本資訊，僅限管理員存取。
 *     security:
 *       - bearerAuth: []  # 需要 JWT 驗證
 *     responses:
 *       200:
 *         description: 成功返回創建活動頁面的資訊
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 這是創建活動頁面的json
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

router.get('/create', verifyToken, isAdmin, activityController.createActivityPage)

// 創建活動
/**
 * @swagger
 * /activities:
 *   post:
 *     tags:
 *       - Activities
 *     summary: 創建新活動
 *     description: 創建新的活動，需提供基本資訊並上傳圖片，僅限管理員存取。
 *     security:
 *       - bearerAuth: []  # 需要 JWT 驗證
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 活動名稱
 *                 example: "阿里山日出觀景活動"
 *               description:
 *                 type: string
 *                 description: 活動描述
 *                 example: "觀賞阿里山的日出，並享受自然步道探索。"
 *               time_duration:
 *                 type: string
 *                 description: 活動時長
 *                 example: "3 小時"
 *               price:
 *                 type: number
 *                 description: 活動價格
 *                 example: 1500
 *               location_id:
 *                 type: integer
 *                 description: 活動對應的地點 ID
 *                 example: 1
 *               category_id:
 *                 type: integer
 *                 description: 活動分類 ID
 *                 example: 2
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: 上傳的活動圖片
 *     responses:
 *       201:
 *         description: 成功創建活動
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 活動已創建
 *                 activity:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "阿里山日出觀景活動"
 *                     description:
 *                       type: string
 *                       example: "觀賞阿里山的日出，並享受自然步道探索。"
 *                     time_duration:
 *                       type: string
 *                       example: "3 小時"
 *                     price:
 *                       type: number
 *                       example: 1500
 *                     location_id:
 *                       type: integer
 *                       example: 1
 *                     category_id:
 *                       type: integer
 *                       example: 2
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "https://example.com/uploads/activities/image1.jpg"
 *       400:
 *         description: 缺少必要的參數
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 必須提供活動名稱、描述、時間、價格、地點、類別
 *       500:
 *         description: 伺服器錯誤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 活動創建失敗
 */

router.post('/', verifyToken, isAdmin, handleImageUpload, activityController.createActivity)


// 編輯活動
/**
 * @swagger
 * /activities/{id}:
 *   put:
 *     tags:
 *       - Activities
 *     summary: 更新活動
 *     description: 更新指定活動的詳細資訊，僅限管理員存取。
 *     security:
 *       - bearerAuth: []  # 需要 JWT 驗證
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要更新的活動 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 活動名稱
 *                 example: "阿里山日出觀景活動"
 *               description:
 *                 type: string
 *                 description: 活動描述
 *                 example: "觀賞阿里山的日出，並享受自然步道探索。"
 *               location_id:
 *                 type: integer
 *                 description: 活動對應的地點 ID
 *                 example: 1
 *               category_id:
 *                 type: integer
 *                 description: 活動分類 ID
 *                 example: 2
 *               time_duration:
 *                 type: string
 *                 description: 活動時長
 *                 example: "3 小時"
 *               price:
 *                 type: number
 *                 description: 活動價格
 *                 example: 1500
 *     responses:
 *       200:
 *         description: 成功更新活動
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 活動更新成功
 *       400:
 *         description: 無效的活動 ID 或請求體
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 活動 ID 無效
 *       404:
 *         description: 活動不存在
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 活動不存在
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

router.put('/:id', verifyToken, isAdmin, activityController.editActivity)


// 刪除活動
/**
 * @swagger
 * /activities/{id}:
 *   delete:
 *     tags:
 *       - Activities
 *     summary: 刪除活動
 *     description: 刪除指定的活動，僅限管理員存取。
 *     security:
 *       - bearerAuth: []  # 需要 JWT 驗證
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要刪除的活動 ID
 *     responses:
 *       200:
 *         description: 成功刪除活動
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 活動刪除成功
 *       400:
 *         description: 活動 ID 無效
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 活動 ID 無效
 *       404:
 *         description: 活動不存在
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 活動不存在
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

router.delete('/:id', verifyToken, isAdmin, activityController.deleteActivity)

// 取得活動
/**
 * @swagger
 * /activities/{id}:
 *   get:
 *     tags:
 *       - Activities
 *     summary: 取得活動詳細資訊
 *     description: 根據活動 ID 取得活動的詳細資訊，包括圖片和分類。
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要查詢的活動 ID
 *     responses:
 *       200:
 *         description: 成功取得活動詳細資訊
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "阿里山日出觀景活動"
 *                 description:
 *                   type: string
 *                   example: "觀賞阿里山日出並享受自然步道探索。"
 *                 time_duration:
 *                   type: string
 *                   example: "3 小時"
 *                 price:
 *                   type: number
 *                   example: 1500
 *                 location_id:
 *                   type: integer
 *                   example: 1
 *                 category:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "戶外活動"
 *                 images:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       image_url:
 *                         type: string
 *                         example: "https://example.com/uploads/activity_image1.jpg"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-09T12:00:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-09T12:30:00Z"
 *       404:
 *         description: 活動不存在
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 活動不存在
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

router.get('/:id', activityController.getActivityById)

module.exports = router
