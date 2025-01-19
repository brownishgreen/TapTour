const multer = require('multer')
const path = require('path')

// 自訂儲存位置和檔案命名
const storage = multer.diskStorage({
  // 根據檔案類型存放到不同的資料夾
  destination: (req, file, cb) => {
    // 依據路徑的用途設置不同的存放資料夾
    const folder = file.fieldname === 'avatar' ? 'avatars' : 'others'
    cb(null, path.join(__dirname, `../uploads/${folder}`))
  },
  // 確保檔名唯一，避免覆蓋
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const name = path.basename(file.originalname, ext)
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `${name}-${uniqueSuffix}${ext}`)
  },
})

// 過濾檔案類型，只允許上傳圖片
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('只接受圖片檔案'), false)
  }
}

// 建立 multer 實例
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 限制檔案大小為 5MB
})

module.exports = upload
