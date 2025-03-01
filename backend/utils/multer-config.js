import dotenv from 'dotenv'
import { Storage } from '@google-cloud/storage'
import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import pinyin from 'pinyin'
import axios from 'axios'
import { Image } from '../models/index.js'
dotenv.config()

const gcsStorage = new Storage({
  keyFilename: process.env.GOOGLE_CLOUD_FILE,
})

const bucketName = process.env.GOOGLE_CLOUD_BUCKET
const bucket = gcsStorage.bucket(bucketName)

//記憶體
const memoryStorage = multer.memoryStorage()


// 設定 Multer 儲存配置
const upload = multer({
  storage: memoryStorage,
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

const downloadGoogleImages = async (
  googlePhotos,
  entityId,
  name,
  entityType,
  dbColumn
) => {
  const imageUrls = []

  if (!googlePhotos || googlePhotos.length === 0) {
    return imageUrls
  }

  // 轉換名稱為拼音格式
  const sanitizedName = pinyin.default(name, { style: pinyin.STYLE_NORMAL })
    .map((word) => word.join(''))
    .join('-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase()

  // 依照 entityType、entityId 與 sanitizedName 建立完整的 GCS 路徑
  // 範例結構: taptour/uploads/{entityType}/{entityId}/{sanitizedName}/{entityId}-{sanitizedName}-{index}.jpg
  for (const [index, photo] of googlePhotos.entries()) {
    const apiKey = process.env.GOOGLE_API_KEY
    const googlePhotoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photo.reference}&key=${apiKey}`
    const fileExtension = '.jpg'
    const fileName = `${entityId}-${sanitizedName}-${index + 1}${fileExtension}`
    const filePath = `taptour/uploads/${entityType}/${entityId}/${sanitizedName}/${fileName}`

    try {
      // 下載 Google 圖片（以串流方式取得）
      const response = await axios({
        url: googlePhotoUrl,
        responseType: 'stream',
      })

      // 建立對應的 GCS 檔案，並以串流上傳
      const gcsFile = bucket.file(filePath)
      await new Promise((resolve, reject) => {
        response.data
          .pipe(
            gcsFile.createWriteStream({
              resumable: false,
              contentType: 'image/jpeg',
              metadata: {
                cacheControl: 'public, max-age=31536000',
              },
            })
          )
          .on('finish', resolve)
          .on('error', reject)
      })

      // 將上傳後的檔案設為公開存取
      await gcsFile.makePublic()

      // 取得公開圖片 URL
      const imageUrl = `https://storage.googleapis.com/${bucketName}/${filePath}`
      imageUrls.push(imageUrl)

      // 存入資料庫
      await Image.create({
        [dbColumn]: entityId,
        image_url: imageUrl,
      })
    } catch (error) {
      console.error(`下載 Google 圖片失敗: ${googlePhotoUrl}`, error)
    }
  }

  return imageUrls
}

const multerConfig = { upload, uploadToGCS, downloadGoogleImages }

export default multerConfig


