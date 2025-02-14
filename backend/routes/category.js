import express from 'express'
import categoryController from '../controllers/category-controller.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: 活動類別相關操作
 */


// 取得所有活動類別
/**
 * @swagger
 * /categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: 取得所有分類
 *     description: 獲取系統中所有可用的分類。
 *     responses:
 *       200:
 *         description: 成功取得所有分類
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
 *                     example: "戶外活動"
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

router.get('/', categoryController.getAllCategories)


export default router
