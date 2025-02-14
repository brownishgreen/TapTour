import fs from 'fs'
import path from 'path'
import db from '../models/index.js' // ✅ 確保 `models/index.js` 使用 `export default db`
import pinyinModule from 'pinyin'
import axios from 'axios'

const { Image } = db // ✅ 從 `db` 物件中解構
const pinyin = pinyinModule.default

/**
 * 這是一個通用圖片上傳處理器
 * @param {Array|Object} images - 單一或多個圖片檔案
 * @param {String} basePath - 圖片存放的基底路徑
 * @param {Number} entityId - 相關的資料 ID（活動、商品等）
 * @param {String} name - 相關的名稱，用於產生目錄
 * @param {String} entityType - 實體類型 (如 'activities' 或 'products')，決定上傳目錄
 * @param {String} dbColumn - 資料庫中對應的外鍵欄位名 (如 'activity_id', 'product_id')
 *  @param {Array} googlePhotos - Google API 返回的照片引用陣列
 *  @returns {Array} imageUrls - 成功下載的圖片 URL 陣列
 */

export const handleImageUpload = async (
  images,
  basePath,
  entityId,
  name,
  entityType,
  dbColumn
) => {
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true })
  }

  if (!images) throw new Error('未提供任何圖片')

  // 將 images 轉換成陣列
  const imageArray = Array.isArray(images) ? images : [images]

  // 檢查圖片數量
  if (imageArray.length > 5) throw new Error('最多只能上傳 5 張圖片')

  // 將活動名稱轉換成安全的字串（拼音）
  const sanitizedName = pinyin(name, { style: pinyin.STYLE_NORMAL })
    .map((word) => word.join(''))
    .join('-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase()

  const uploadPath = path.join(basePath, `${sanitizedName}-${entityId}`)

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true })
  }

  //處理所有圖片上傳
  const imageUrls = await Promise.all(
    imageArray.map(async (image, index) => {
      const fileExtension = path.extname(image.name)

      const fileName = `${entityId}-${sanitizedName}-${String(index + 1).padStart(3, '0')}${fileExtension}`
      const filePath = path.join(uploadPath, fileName)

      console.log(`上傳圖片: ${image.name} 到 ${filePath}`)

      try {
        await image.mv(filePath) // 待每個 mv 操作完成
        const imageUrl = `/uploads/${entityType}/${sanitizedName}-${entityId}/${fileName}`
        console.log(`上傳成功: ${imageUrl}`)

        // 將上傳的圖片資料存入資料庫
        await Image.create({
          [dbColumn]: entityId,
          image_url: imageUrl,
        })

        return imageUrl
      } catch (error) {
        console.error(
          `${entityType} ${entityId} 的圖片 ${image.name} 上傳失敗:`,
          error
        )
        return null
      }
    })
  )

  return imageUrls.filter(Boolean) // 過濾掉失敗的圖片
}

export const downloadGoogleImages = async (
  googlePhotos,
  basePath,
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
  const sanitizedName = pinyin(name, { style: pinyin.STYLE_NORMAL })
    .map((word) => word.join(''))
    .join('-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase()

  // 建立轉拼音的資料夾
  const uploadPath = path.join(basePath, sanitizedName)
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true })
  }

  for (const [index, photo] of googlePhotos.entries()) {
    const apiKey = process.env.GOOGLE_API_KEY
    const googlePhotoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photo.reference}&key=${apiKey}`
    const fileExtension = '.jpg'
    const fileName = `${entityId}-${sanitizedName}-${index + 1}${fileExtension}`
    const filePath = path.join(uploadPath, fileName) // 儲存到轉拼音資料夾

    try {
      // 下載 Google 圖片
      const response = await axios({
        url: googlePhotoUrl,
        responseType: 'stream',
      })

      // 儲存到本地
      const writer = fs.createWriteStream(filePath)
      response.data.pipe(writer)

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
      })

      const imageUrl = `/uploads/${entityType}/${sanitizedName}/${fileName}`
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
