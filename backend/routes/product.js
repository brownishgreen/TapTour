import express from 'express'
import productController from '../controllers/product-controller.js'
import verifyToken from '../middlewares/auth.js'
import isAdmin from '../middlewares/isAdmin.js'
import { handleImageUpload } from '../utils/upload-handler.js'
import multerConfig from '../utils/multer-config.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: 商品相關操作
 */



/**
 * @swagger
 * /products:
 *   get:
 *     summary: 取得產品列表
 *     description: 可依據搜尋關鍵字篩選產品，並支援分頁功能。
 *     tags: 
 *      - Products
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: 搜尋產品名稱
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 頁碼
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 每頁的產品數量
 *     responses:
 *       200:
 *         description: 成功取得產品列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   images:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         image_url:
 *                           type: string
 *                   category:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *       404:
 *         description: 沒有符合的產品
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 沒有符合的產品
 *       500:
 *         description: 伺服器錯誤
 */

router.get('/', productController.getAllProducts)


/**
 * @swagger
 * /products/paginated:
 *   get:
 *     summary: 分頁取得產品列表
 *     description: 根據頁碼和每頁數量返回產品資料，包含圖片和總記錄數資訊。
 *     tags: 
 *      - Products
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
 *         description: 每頁返回的產品數量，預設為 9 筆
 *     responses:
 *       200:
 *         description: 成功取得分頁產品資料
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       images:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             image_url:
 *                               type: string
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
 */

router.get('/paginated', productController.getPaginatedProducts)


/**
 * @swagger
 * /products/{id}/edit:
 *   get:
 *     summary: 編輯商品頁面
 *     description: 取得指定商品的詳細資料，僅限管理員存取。
 *     tags: 
 *      - Products
 *     security:
 *       - bearerAuth: []  # 需要 JWT 驗證
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要編輯的商品 ID
 *     responses:
 *       200:
 *         description: 成功取得商品資料
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
 *                   example: "Sample Product"
 *                 price:
 *                   type: number
 *                   format: float
 *                   example: 99.99
 *                 description:
 *                   type: string
 *                   example: "This is a sample product description."
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: 無效的商品 ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 無效的商品 ID
 *       404:
 *         description: 商品不存在
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 商品不存在
 *       500:
 *         description: 伺服器錯誤
 */

router.get('/:id/edit', verifyToken, isAdmin, productController.editProductPage)


/**
 * @swagger
 * /products/create:
 *   get:
 *     summary: 取得創建商品頁面
 *     description: 返回創建商品頁面，僅限管理員存取。
 *     tags: 
 *      - Products
 *     security:
 *       - bearerAuth: []  # 需要 JWT 驗證
 *     responses:
 *       200:
 *         description: 成功取得創建商品頁面的訊息
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 這是創建商品頁面的json
 *       403:
 *         description: 無存取權限（未授權或非管理員）
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 權限不足
 *       500:
 *         description: 伺服器錯誤
 */

router.get('/create', verifyToken, multerConfig.upload.array('images', 5), isAdmin, productController.createProductPage)


/**
 * @swagger
 * /products:
 *   post:
 *     summary: 創建新商品
 *     description: 創建新的商品，包括名稱、描述、價格和類別等資訊，並支援圖片上傳。僅限管理員存取。
 *     tags: 
 *      - Products
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
 *                 description: 商品名稱
 *                 example: "Sample Product"
 *               description:
 *                 type: string
 *                 description: 商品描述
 *                 example: "這是示例商品的描述"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: 商品價格
 *                 example: 199.99
 *               category_id:
 *                 type: integer
 *                 description: 類別 ID
 *                 example: 1
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: 上傳的商品圖片
 *     responses:
 *       201:
 *         description: 商品已成功創建
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 商品已創建
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *                     category_id:
 *                       type: integer
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "https://example.com/uploads/products/image1.jpg"
 *       400:
 *         description: 必填欄位未提供或無效
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 必須提供商品名稱、描述、價格、類別
 *       500:
 *         description: 伺服器錯誤
 */

router.post(
  '/',
  verifyToken,
  isAdmin,
  handleImageUpload,
  productController.createProduct
)


/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: 編輯商品
 *     description: 編輯指定商品的資訊，僅限管理員存取。
 *     tags: 
 *      - Products
 *     security:
 *       - bearerAuth: []  # 需要 JWT 驗證
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要編輯的商品 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 商品名稱
 *                 example: "Updated Product Name"
 *               description:
 *                 type: string
 *                 description: 商品描述
 *                 example: "更新後的商品描述"
 *               location:
 *                 type: string
 *                 description: 商品地點
 *                 example: "Taipei"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: 商品活動日期
 *                 example: "2025-03-01"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: 商品價格
 *                 example: 150.99
 *     responses:
 *       200:
 *         description: 商品更新成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 商品更新成功
 *       400:
 *         description: 無效的商品 ID 或輸入數據
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 商品 ID 無效
 *       404:
 *         description: 商品不存在
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 商品不存在
 *       500:
 *         description: 伺服器錯誤
 */

router.put(
  '/:id',
  verifyToken,
  isAdmin,
  handleImageUpload,
  productController.editProduct
)


/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: 刪除商品
 *     description: 刪除指定商品，僅限管理員存取。
 *     tags: 
 *      - Products
 *     security:
 *       - bearerAuth: []  # 需要 JWT 驗證
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要刪除的商品 ID
 *     responses:
 *       200:
 *         description: 商品刪除成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 商品刪除成功
 *       400:
 *         description: 無效的商品 ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 商品 ID 無效
 *       404:
 *         description: 商品不存在
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 商品不存在
 *       500:
 *         description: 伺服器錯誤
 */

router.delete('/:id', verifyToken, isAdmin, productController.deleteProduct)

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: 取得指定商品的詳細資訊
 *     description: 根據商品 ID 取得商品詳細資料，包括圖片與類別資訊。
 *     tags: 
 *      - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要查詢的商品 ID
 *     responses:
 *       200:
 *         description: 成功取得商品詳細資訊
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                   example: "Sample Product"
 *                 description:
 *                   type: string
 *                   example: "這是示例商品的詳細描述。"
 *                 price:
 *                   type: number
 *                   example: 199.99
 *                 images:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       image_url:
 *                         type: string
 *                         example: "https://example.com/images/product1.jpg"
 *                 category:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Electronics"
 *       400:
 *         description: 無效的商品 ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 無效的商品 ID
 *       404:
 *         description: 商品不存在
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 商品不存在
 *       500:
 *         description: 伺服器錯誤
 */

router.get('/:id', productController.getProductById)


export default router
