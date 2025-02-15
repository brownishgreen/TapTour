import { Storage } from '@google-cloud/storage'
import dotenv from 'dotenv'
import path from 'path'
import axios from 'axios'
import db from '../models/index.js'
import pinyinModule from 'pinyin'

dotenv.config()

const { Image } = db
const pinyin = pinyinModule.default

// ✅ Google Cloud Storage 設定
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
})
const bucketName = process.env.GOOGLE_CLOUD_STORAGE_BUCKET || 'taptour-uploads'
const bucket = storage.bucket(bucketName)

console.log("✅ Using Bucket:", bucketName) // 確認變數是否正確

// ✅ **統一 `uploadToGCS` 方法**
export const uploadToGCS = (fileBuffer, destinationPath) => {
  return new Promise((resolve, reject) => {
    const blob = bucket.file(destinationPath)
    const blobStream = blob.createWriteStream({
      resumable: false,
      predefinedAcl: 'publicRead',
    })

    blobStream.on('error', (err) => reject(err))
    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${destinationPath}`
      resolve(publicUrl)
    })

    blobStream.end(fileBuffer)
  })
}

// ✅ **handleImageUpload**（處理上傳圖片到 GCS）
export const handleImageUpload = async (images, entityId, name, entityType, dbColumn) => {
  if (!images) throw new Error('未提供任何圖片')

  const imageArray = Array.isArray(images) ? images : [images]
  if (imageArray.length > 5) throw new Error('最多只能上傳 5 張圖片')

  const sanitizedName = pinyin(name, { style: pinyin.STYLE_NORMAL })
    .map((word) => word.join(''))
    .join('-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase()

  const uploadPath = `uploads/${entityType}/${sanitizedName}-${entityId}/`

  const imageUrls = await Promise.all(
    imageArray.map(async (image, index) => {
      const fileExtension = path.extname(image.name)
      const fileName = `${entityId}-${sanitizedName}-${String(index + 1).padStart(3, '0')}${fileExtension}`
      const destinationPath = `${uploadPath}${fileName}`

      try {
        const imageUrl = await uploadToGCS(image.data, destinationPath)
        console.log(`✔️ 圖片上傳成功: ${imageUrl}`)

        await Image.create({
          [dbColumn]: entityId,
          image_url: imageUrl,
        })

        return imageUrl
      } catch (error) {
        console.error(`❌ 圖片 ${image.name} 上傳失敗:`, error)
        return null
      }
    })
  )

  return imageUrls.filter(Boolean)
}

// ✅ **下載 Google Places API 圖片並存入 GCS**
export const downloadGoogleImages = async (googlePhotos, entityId, name, entityType, dbColumn) => {
  const imageUrls = []
  if (!googlePhotos || googlePhotos.length === 0) return imageUrls

  const sanitizedName = pinyin(name, { style: pinyin.STYLE_NORMAL })
    .map((word) => word.join(''))
    .join('-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase()

  const uploadPath = `uploads/${entityType}/${sanitizedName}-${entityId}/`

  for (const [index, photo] of googlePhotos.entries()) {
    const apiKey = process.env.GOOGLE_API_KEY
    const googlePhotoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photo.reference}&key=${apiKey}`
    const fileExtension = '.jpg'
    const fileName = `${entityId}-${sanitizedName}-${index + 1}${fileExtension}`
    const destinationPath = `${uploadPath}${fileName}`

    try {
      const response = await axios({
        url: googlePhotoUrl,
        responseType: 'arraybuffer', // 下載為 Buffer 以便存入 GCS
      })

      // 上傳到 GCS
      const imageUrl = await uploadToGCS(response.data, destinationPath)
      imageUrls.push(imageUrl)

      // 存入資料庫
      await Image.create({
        [dbColumn]: entityId,
        image_url: imageUrl,
      })
    } catch (error) {
      console.error(`❌ 下載 Google 圖片失敗: ${googlePhotoUrl}`, error)
    }
  }

  return imageUrls
}
