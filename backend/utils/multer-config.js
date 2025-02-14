import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

// ✅ 取得 `__dirname` 替代方案
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ✅ 設定 Multer 存儲配置
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/avatars')) // 儲存到 `uploads/avatars` 目錄
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
    cb(null, `avatar-${uniqueSuffix}`) // 命名格式：`avatar-時間戳記-隨機數.副檔名`
  },
})

// ✅ 設定 Multer 參數
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true) // 允許上傳
    } else {
      cb(new Error('只接受圖片檔案')) // 拒絕上傳
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 限制檔案大小為 5MB
})

// ✅ 轉換為 ES 模組的 `export`
export default upload
