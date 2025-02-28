import dotenv from 'dotenv'
import { Storage } from '@google-cloud/storage'
import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

dotenv.config()

const storage = new Storage({
  keyFilename: process.env.GOOGLE_CLOUD_FILE,
})

const bucketName = process.env.GOOGLE_CLOUD_BUCKET
const bucket = storage.bucket(bucketName)

//記憶體
const memoryStorage = multer.memoryStorage()


// 設定 Multer 儲存配置
const upload = multer({
  storage: memoryStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true) // 允許上傳
    } else {
      cb(new Error('只接受圖片檔案')) // 拒絕上傳
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 限制檔案大小
})
/**
 * 上傳圖片到 Google Cloud Storage，並為每個活動/商品/地點建立專屬資料夾
 * @param {Object} file - `multer` 提供的 `file` 物件
 * @param {String} entityType - 'avatars' / 'activities' / 'products' / 'locations'
 * @param {Number} entityId - 活動、商品、用戶、地點的 ID
 * @returns {Promise<String>} imageUrl
 */
const uploadToGCS = async (file, entityType, entityId) => {
  const fileExtension = path.extname(file.originalname) || '.jpg'

  //讓每個活動、商品、地點建立獨立資料夾
  const filePath = `taptour/uploads/${entityType}/${entityId}/${uuidv4()}${fileExtension}`
  const gcsFile = bucket.file(filePath)

  try {
    if (!file.buffer) {
      console.error(`圖片 ${file.originalname} 沒有 buffer 資料`)
      return null
    }

    // 上傳到 GCS
    await gcsFile.save(file.buffer, {
      metadata: { contentType: file.mimetype || 'image/jpeg' },
      resumable: false,
    })

    // 設定公開權限
    await gcsFile.makePublic()

    const imageUrl = `https://storage.googleapis.com/${bucketName}/${filePath}`
    console.log(`${entityType} ${entityId} 的圖片 ${file.originalname} 上傳成功:`, imageUrl)

    return imageUrl
  } catch (error) {
    console.error(`${entityType} ${entityId} 的圖片 ${file.originalname} 上傳失敗:`, error)
    return null
  }
}

export { upload, uploadToGCS }

