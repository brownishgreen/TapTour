import express from 'express'
import userController from '../controllers/user-controller.js'
import verifyToken from '../middlewares/auth.js'
import multerConfig from '../utils/multer-config.js'
import passport from '../config/passport.js'
const { upload } = multerConfig

const router = express.Router()


// 檢查 userId 是否為有效數字的 middleware
const validateUserId = (req, res, next) => {
  const userId = req.params.userId
  if (!Number.isInteger(Number(userId)) || Number(userId) <= 0) {
    return res.status(400).json({ message: '無效的 userId' })
  }
  next()
}

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 用戶相關的路由
 */

/**
 * @swagger
 * /api/user/verify:
 *   get:
 *     summary: 檢查用戶的登入狀態
 *     tags: 
 *      - Users
 *     responses:
 *       200:
 *         description: 用戶已登入
 *       401:
 *         description: 未授權或未登入
 */

router.get('/verify', verifyToken, userController.verify);

/**
 * @swagger
 * api/user/register:
 *   get:
 *     summary: 註冊頁面
 *     tags: 
 *      - Users
 *     responses:
 *       200:
 *         description: 這是註冊頁面的json
 */

router.get('/register', userController.registerPage)

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: 用戶註冊
 *     tags: 
 *      - Users
 *     description: 註冊一個新用戶
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: 註冊成功
 *       400:
 *         description: 缺少必填欄位或 email 已註冊
 */

router.post('/register', userController.register)

/**
 * @swagger
 * /api/user/login:
 *   get:
 *     summary: 取得登入頁面
 *     description: 回傳登入頁面的 JSON 資訊。
 *     tags: 
 *      - Users
 *     responses:
 *       200:
 *         description: 成功取得登入頁面
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "這是登入頁面的json"
 */

router.get('/login', userController.loginPage);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: 用戶登入
 *     description: 驗證用戶的 email 和密碼，並設置 JWT token。
 *     tags: 
 *      - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "yuan@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: 登入成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "登入成功"
 *                 userId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: 缺少帳號或密碼
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "請輸入帳號密碼"
 *       401:
 *         description: 帳號或密碼錯誤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "帳號或密碼錯誤"
 *       500:
 *         description: 伺服器錯誤
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: 用戶登出
 *     description: 清除用戶的 JWT token 並返回成功訊息。
 *     tags: 
 *      - Users
 *     responses:
 *       200:
 *         description: 登出成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "已成功登出"
 *       500:
 *         description: 伺服器錯誤
 */
router.post('/logout', userController.logout);

/**
 * @swagger
 * /api/user/{userId}/profile:
 *   get:
 *     summary: 取得用戶個人檔案
 *     description: 驗證用戶是否登入並取得指定用戶的個人檔案。
 *     tags: 
 *      - Users
 *     security:
 *       - bearerAuth: []  # 需要用戶登入
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: 被訪問的用戶 ID
 *     responses:
 *       200:
 *         description: 成功取得用戶個人檔案
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "這是受保護的個人檔案頁面，你已成功獲取使用者資料"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     image:
 *                       type: string
 *                       example: "https://example.com/image.png"
 *                     name:
 *                       type: string
 *                       example: "Yuan"
 *                     email:
 *                       type: string
 *                       example: "yuan@example.com"
 *                     bio:
 *                       type: string
 *                       example: "後端工程師，喜歡旅遊和寫程式。"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                 isFollowing:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: 未授權，請先登入
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "未登入"
 *       404:
 *         description: 用戶不存在
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "用戶不存在"
 *       500:
 *         description: 伺服器錯誤
 */
router.get('/:userId/profile', verifyToken, userController.profile);

/**
 * @swagger
 * /api/user/{userId}/update-profile:
 *   put:
 *     summary: 更新用戶個人檔案
 *     description: 根據用戶輸入更新用戶名稱、密碼、簡介或頭像。
 *     tags: 
 *      - Users
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: 被更新的用戶 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Yuan"
 *               password:
 *                 type: string
 *                 example: "newpassword123"
 *               bio:
 *                 type: string
 *                 example: "後端工程師，喜歡旅遊和寫程式。"
 *               image:
 *                 type: string
 *                 description: Base64 編碼的圖片
 *                 example: "data:image/png;base64,iVBORw0..."
 *     responses:
 *       200:
 *         description: 資料更新成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "資料更新成功"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Yuan"
 *                     bio:
 *                       type: string
 *                       example: "後端工程師"
 *                     image:
 *                       type: string
 *                       example: "http://localhost:3000/uploads/avatars/avatar-123.png"
 *       404:
 *         description: 用戶不存在
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "用戶不存在"
 *       500:
 *         description: 伺服器錯誤
 */
router.put('/:userId/update-profile', verifyToken, upload.single('avatar'), userController.updateProfile);


router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['openid', 'profile', 'email'],
    prompt: 'select_account'
  })
)
router.get('/auth/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login',
  }),
  (req, res) => {
    console.log('登入成功', req.user) //check if user is logged in
    if (!req.user) {
      console.log('Google Auth Failed, user is undefined')
      return res.redirect('/login')
    }
    try {
      const token = jwt.sign(
        {
          id: req.user.id,
          email: req.user.email,
          name: req.user.name,
        },
        process.env.JWT_SECRET, { expiresIn: '1h' })

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      })
      res.redirect('/')
    } catch (error) {
      console.error('Google Auth Error:', error)
      res.redirect('/login')
    }
  })


export default router
