// utils/multer-config.js
import dotenv from 'dotenv'
import { Storage } from '@google-cloud/storage'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import pinyin from 'pinyin'
import axios from 'axios'
import { fileURLToPath } from 'url'
import { Image } from '../models/index.js'

dotenv.config()

// ----------------------------------------------------
// 基本設定
// ----------------------------------------------------
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 本機 uploads 根目錄（backend/uploads）
const UPLOAD_ROOT = path.join(__dirname, '..', 'uploads')

// 記憶體儲存，讓我們自行決定寫入 GCS 或本機
const memoryStorage = multer.memoryStorage()
export const upload = multer({
  storage: memoryStorage,
  limits: { fileSize: 5 * 1024 * 1024 }
})

// 用環境變數決定存放目的地：'gcs' 或 'local'
const FILE_STORAGE = (process.env.FILE_STORAGE || 'local').toLowerCase()

// ----------------------------------------------------
// GCS 上傳
// ----------------------------------------------------
const gcsStorage = new Storage({
  keyFilename: process.env.GOOGLE_CLOUD_FILE,
})
const bucketName = process.env.GOOGLE_CLOUD_BUCKET
const bucket = gcsStorage.bucket(bucketName)

//----------------------------------------------------
// 上傳到 GCS，回傳公開 URL 
//----------------------------------------------------
export const uploadToGCS = async (file, entityType, entityId) => {
  const fileExtension = path.extname(file.originalname) || '.jpg'
  const filePath = `taptour/uploads/${entityType}/${entityId}/${uuidv4()}${fileExtension}`
  const gcsFile = bucket.file(filePath)

  try {
    if (!file.buffer) return null

    await gcsFile.save(file.buffer, {
      metadata: { contentType: file.mimetype || 'image/jpeg' },
      resumable: false,
    })
    await gcsFile.makePublic()

    const imageUrl = `https://storage.googleapis.com/${bucketName}/${filePath}`
    return imageUrl
  } catch (err) {
    console.error('GCS 上傳失敗:', err)
    return null
  }
}

// ----------------------------------------------------
// 本機上傳：寫檔到 backend/uploads/... 並回傳可直接給前端用的 URL
// ----------------------------------------------------
export const saveToLocal = async (file, entityType, entityId) => {
  const ext = path.extname(file.originalname) || '.jpg'
  const filename = `${Date.now()}-${uuidv4()}${ext}`
  const destDir = path.join(UPLOAD_ROOT, entityType, String(entityId))

  fs.mkdirSync(destDir, { recursive: true })
  const absPath = path.join(destDir, filename)
  fs.writeFileSync(absPath, file.buffer)

  // 前端可直接存取（確保 app.js 有 static: app.use('/uploads', express.static(...))）
  const publicUrl = `/uploads/${entityType}/${entityId}/${filename}`
  return publicUrl
}

// ----------------------------------------------------
// 統一入口：依 FILE_STORAGE 決定要走 GCS 或 Local
// ----------------------------------------------------
export const saveImage = async (file, entityType, entityId) => {
  if (FILE_STORAGE === 'gcs') {
    return uploadToGCS(file, entityType, entityId)
  }
  return saveToLocal(file, entityType, entityId)
}

// ----------------------------------------------------
// Google 圖片下載到 GCS（保留原功能，若要支援本機也可再加一版）
// ----------------------------------------------------
export const downloadGoogleImages = async (
  googlePhotos,
  entityId,
  name,
  entityType,
  dbColumn
) => {
  const imageUrls = []
  if (!googlePhotos || googlePhotos.length === 0) return imageUrls

  const sanitizedName = pinyin.default(name, { style: pinyin.STYLE_NORMAL })
    .map((w) => w.join(''))
    .join('-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase()

  for (const [index, photo] of googlePhotos.entries()) {
    const apiKey = process.env.GOOGLE_API_KEY
    const googlePhotoUrl =
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photo.reference}&key=${apiKey}`
    const filePath =
      `taptour/uploads/${entityType}/${entityId}/${sanitizedName}/${entityId}-${sanitizedName}-${index + 1}.jpg`

    try {
      const response = await axios({ url: googlePhotoUrl, responseType: 'stream' })
      const gcsFile = bucket.file(filePath)

      await new Promise((resolve, reject) => {
        response.data
          .pipe(gcsFile.createWriteStream({
            resumable: false,
            contentType: 'image/jpeg',
            metadata: { cacheControl: 'public, max-age=31536000' }
          }))
          .on('finish', resolve)
          .on('error', reject)
      })

      await gcsFile.makePublic()
      const imageUrl = `https://storage.googleapis.com/${bucketName}/${filePath}`
      imageUrls.push(imageUrl)

      await Image.create({ [dbColumn]: entityId, image_url: imageUrl })
    } catch (err) {
      console.error('下載 Google 圖片失敗:', err)
    }
  }
  return imageUrls
}

export default {
  upload,
  uploadToGCS,
  saveToLocal,
  saveImage,
  downloadGoogleImages,
}
