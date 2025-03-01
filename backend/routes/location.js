
import locationController from '../controllers/location-controller.js'
import multerConfig from '../utils/multer-config.js'
import isAdmin from '../middlewares/isAdmin.js'
import verifyToken from '../middlewares/auth.js'

const router = express.Router()
const downloadGoogleImages = multerConfig.downloadGoogleImages

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: 景點相關操作
 */

// 取得所有景點
/**
 * @swagger
 * /locations:
 *   get:
 *     tags:
 *       - Locations
 *     summary: 取得所有景點資訊
 *     description: 取得所有景點的基本資訊，支援模糊搜尋並包含對應的主要圖片資訊。
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: 模糊查詢景點名稱
 *     responses:
 *       200:
 *         description: 成功取得所有景點資訊
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 您已取得所有景點
 *                 locations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "台北101"
 *                       description:
 *                         type: string
 *                         example: "台北101 是台灣知名的地標建築。"
 *                       main_image_url:
 *                         type: string
 *                         example: "https://example.com/uploads/location1.jpg"
 *                       images:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 101
 *                             image_url:
 *                               type: string
 *                               example: "https://example.com/uploads/image1.jpg"
 *       404:
 *         description: 沒有符合條件的景點
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 沒有符合條件的景點
 *       500:
 *         description: 伺服器錯誤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 伺服器錯誤，無法取得景點資料
 */

router.get('/', locationController.getAllLocation)


/**
 * @swagger
 * /locations/paginated:
 *   get:
 *     tags:
 *       - Locations
 *     summary: 分頁取得景點列表
 *     description: 根據頁碼和每頁數量返回景點資料，包含對應的圖片資訊。
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
 *         description: 每頁返回的景點數量，預設為 9 筆
 *     responses:
 *       200:
 *         description: 成功取得分頁景點資料
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 locations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "阿里山國家風景區"
 *                       description:
 *                         type: string
 *                         example: "阿里山擁有美麗的雲海與森林步道。"
 *                       images:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             image_url:
 *                               type: string
 *                               example: "https://example.com/uploads/image1.jpg"
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
 *                   example: 伺服器錯誤，無法取得景點資料
 */

router.get('/paginated', locationController.getPaginatedLocations)


// 取得景點單一頁面
/**
 * @swagger
 * /locations/{id}:
 *   get:
 *     tags:
 *       - Locations
 *     summary: 取得指定景點的詳細資訊
 *     description: 根據景點 ID 查詢該景點的詳細資訊，包括關聯的圖片和活動。
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要查詢的景點 ID
 *     responses:
 *       200:
 *         description: 成功取得景點詳細資訊
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 您已成功訪問景點詳細頁面
 *                 location:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "日月潭國家風景區"
 *                     description:
 *                       type: string
 *                       example: "日月潭是台灣著名的旅遊景點，擁有美麗的湖景與自然風光。"
 *                     images:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           image_url:
 *                             type: string
 *                             example: "https://example.com/uploads/location1.jpg"
 *                     activities:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 101
 *                           name:
 *                             type: string
 *                             example: "划船體驗"
 *                           images:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 image_url:
 *                                   type: string
 *                                   example: "https://example.com/uploads/activity1.jpg"
 *       404:
 *         description: 找不到景點
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 景點不存在
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

router.get('/:id', locationController.getLocationById)


/**
 * @swagger
 * /locations/{id}/edit:
 *   get:
 *     tags:
 *       - Locations
 *     summary: 取得編輯景點的詳細資訊
 *     description: 取得指定景點的詳細資料，用於填充編輯表單，僅限管理員存取。
 *     security:
 *       - bearerAuth: []  # 需要 JWT 驗證
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要編輯的景點 ID
 *     responses:
 *       200:
 *         description: 成功取得景點詳細資料
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
 *                   example: "日月潭國家風景區"
 *                 description:
 *                   type: string
 *                   example: "日月潭是台灣著名的旅遊景點。"
 *                 main_image_id:
 *                   type: integer
 *                   example: 101
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-09T10:00:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-09T12:00:00Z"
 *       404:
 *         description: 景點不存在
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 景點不存在
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

router.get(
  '/:id/edit',
  verifyToken,
  isAdmin,
  locationController.editLocationPage
)


/**
 * @swagger
 * /locations/create:
 *   post:
 *     tags:
 *       - Locations
 *     summary: 新增景點
 *     description: 新增新的景點，支援 Google Place API 查詢資訊，並自動下載對應的圖片。
 *     security:
 *       - bearerAuth: []  # 需要 JWT 驗證
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 景點名稱
 *                 example: "阿里山國家風景區"
 *               googlePlaceId:
 *                 type: string
 *                 description: Google Place ID，用於查詢景點資訊
 *                 example: "ChIJN1t_tDeuEmsRUsoyG83frY4"
 *               description:
 *                 type: string
 *                 description: 景點描述
 *                 example: "阿里山以其壯麗的日出與雲海景觀聞名。"
 *     responses:
 *       201:
 *         description: 景點新增成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 新增景點成功
 *                 location:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "阿里山國家風景區"
 *                     description:
 *                       type: string
 *                       example: "阿里山以其壯麗的日出與雲海景觀聞名。"
 *                     address:
 *                       type: string
 *                       example: "台灣嘉義縣阿里山鄉"
 *                     latitude:
 *                       type: number
 *                       format: float
 *                       example: 23.508
 *                     longitude:
 *                       type: number
 *                       format: float
 *                       example: 120.802
 *                     google_place_id:
 *                       type: string
 *                       example: "ChIJN1t_tDeuEmsRUsoyG83frY4"
 *                     opening_hours:
 *                       type: string
 *                       example: "週一至週日 08:00 - 17:00"
 *                     google_url:
 *                       type: string
 *                       example: "https://maps.google.com/?q=阿里山"
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "https://example.com/uploads/locations/image1.jpg"
 *       400:
 *         description: 無效的請求，例如提供的 Google Place ID 無效
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 無效的 Google Place ID
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

router.post(
  '/create',
  verifyToken,
  isAdmin,
  downloadGoogleImages,
  locationController.createLocation
)


/**
 * @swagger
 * /locations/{id}:
 *   put:
 *     tags:
 *       - Locations
 *     summary: 編輯景點
 *     description: 編輯指定景點的資訊，包括名稱、描述、營業時間和地址，僅限管理員存取。
 *     security:
 *       - bearerAuth: []  # 需要 JWT 驗證
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要編輯的景點 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 新的景點名稱
 *                 example: "阿里山國家風景區"
 *               description:
 *                 type: string
 *                 description: 新的景點描述
 *                 example: "阿里山擁有壯麗的雲海和自然步道。"
 *               opening_hours:
 *                 type: string
 *                 description: 更新後的營業時間
 *                 example: "週一至週日 08:00 - 17:00"
 *               address:
 *                 type: string
 *                 description: 新的景點地址
 *                 example: "台灣嘉義縣阿里山鄉"
 *     responses:
 *       200:
 *         description: 景點更新成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 景點更新成功
 *       404:
 *         description: 景點不存在
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 景點不存在
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

router.put('/:id', verifyToken, isAdmin, locationController.editLocation)


/**
 * @swagger
 * /locations/{id}:
 *   delete:
 *     tags:
 *       - Locations
 *     summary: 刪除景點
 *     description: 刪除指定的景點，僅限管理員存取。
 *     security:
 *       - bearerAuth: []  # 需要 JWT 驗證
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要刪除的景點 ID
 *     responses:
 *       200:
 *         description: 景點刪除成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 景點刪除成功
 *       404:
 *         description: 景點不存在
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 景點不存在
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

router.delete('/:id', verifyToken, isAdmin, locationController.deleteLocation)


// 獲取該景點相關image
/**
 * @swagger
 * /locations/{id}/images:
 *   get:
 *     tags:
 *       - Locations
 *     summary: 取得景點的所有圖片
 *     description: 根據景點 ID 獲取該景點的所有圖片。
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要查詢的景點 ID
 *     responses:
 *       200:
 *         description: 成功取得景點的所有圖片
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
 *                   location_id:
 *                     type: integer
 *                     example: 1
 *                   image_url:
 *                     type: string
 *                     example: "https://example.com/uploads/location_image1.jpg"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-09T12:00:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-09T12:30:00Z"
 *       404:
 *         description: 景點不存在
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 景點不存在
 *       500:
 *         description: 伺服器錯誤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 獲取圖片失敗
 */

router.get('/:id/images', locationController.getLocationAllImages)


// 設置主要圖片
/**
 * @swagger
 * /locations/{id}/main-image:
 *   patch:
 *     tags:
 *       - Locations
 *     summary: 設定地點的主要圖片
 *     description: 更新指定地點的主要圖片，僅限管理員存取。
 *     security:
 *       - bearerAuth: []  # 需要 JWT 驗證
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要更新的地點 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               main_image_id:
 *                 type: integer
 *                 description: 要設定為主要圖片的圖片 ID
 *                 example: 101
 *     responses:
 *       200:
 *         description: 成功更新主要圖片
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 主要圖片已更新
 *                 main_image_id:
 *                   type: integer
 *                   example: 101
 *       400:
 *         description: 圖片不存在或不屬於該地點
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 圖片不存在或不屬於該地點
 *       404:
 *         description: 地點不存在
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 地點不存在
 *       500:
 *         description: 伺服器錯誤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 更新失敗
 */

router.patch(
  '/:id/main-image',
  verifyToken,
  isAdmin,
  locationController.setLocationMainImage
)


// 自動補全地點
/**
 * @swagger
 * /locations/google/autocomplete:
 *   get:
 *     tags:
 *       - Locations
 *     summary: 地點名稱自動補全
 *     description: 使用 Google Places Autocomplete API 根據使用者的輸入提供地點建議。
 *     parameters:
 *       - in: query
 *         name: input
 *         required: true
 *         schema:
 *           type: string
 *         description: 使用者輸入的地點名稱
 *     responses:
 *       200:
 *         description: 成功返回地點建議
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   description:
 *                     type: string
 *                     example: "台北101, 台北市"
 *                   place_id:
 *                     type: string
 *                     example: "ChIJL5y_5LdJbjQR0AFb6GgJb_k"
 *                   structured_formatting:
 *                     type: object
 *                     properties:
 *                       main_text:
 *                         type: string
 *                         example: "台北101"
 *                       secondary_text:
 *                         type: string
 *                         example: "台北市"
 *       400:
 *         description: 無法獲取地點建議
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 無法獲取地點建議
 *       500:
 *         description: 伺服器錯誤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Google Autocomplete API 錯誤
 */

router.get('/google/autocomplete', locationController.autocompleteLocation)

// 獲取地點詳細資訊
/**
 * @swagger
 * /locations/google/details:
 *   get:
 *     tags:
 *       - Locations
 *     summary: 獲取地點詳細資訊
 *     description: 使用 Google Places Details API 根據 Place ID 獲取地點的詳細資訊。
 *     parameters:
 *       - in: query
 *         name: place_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Google Place ID
 *     responses:
 *       200:
 *         description: 成功獲取地點詳細資訊
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "台北101"
 *                 address:
 *                   type: string
 *                   example: "台北市信義區信義路五段7號"
 *                 photos:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=ABC123&key=your_api_key"
 *                 url:
 *                   type: string
 *                   example: "https://maps.google.com/?cid=1234567890"
 *                 opening_hours:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "星期一: 09:00 – 22:00"
 *       400:
 *         description: 無法獲取地點詳細資訊
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 無法獲取地點詳細資訊
 *       500:
 *         description: 伺服器錯誤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Google Place Details API 錯誤
 */

router.get('/google/details', locationController.detailsLocation)

export default router
