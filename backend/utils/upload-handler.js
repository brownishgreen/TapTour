const fs = require('fs')
const path = require('path')
const { Image } = require('../models')
const pinyin = require('pinyin').default

/**
 * 這是一個通用圖片上傳處理器
 * @param {Array|Object} images - 單一或多個圖片檔案
 * @param {String} basePath - 圖片存放的基底路徑
 * @param {Number} entityId - 相關的資料 ID（活動、商品等）
 * @param {String} name - 相關的名稱，用於產生目錄
 * @param {String} entityType - 實體類型 (如 'activities' 或 'products')，決定上傳目錄
 * @param {String} dbColumn - 資料庫中對應的外鍵欄位名 (如 'activity_id', 'product_id')
 */

const handleImageUpload = async (images, basePath, entityId, name, entityType, dbColumn) => {
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
    .map(word => word.join(''))
    .join('-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase();

  const uploadPath = path.join(basePath, `${sanitizedName}-${entityId}`)

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true })
  }

  //處理所有圖片上傳
  const imageUrls = await Promise.all(imageArray.map(async (image, index) => {
    const fileExtension = path.extname(image.name)

    const fileName = `${entityId}-${sanitizedName}-${String(index + 1).padStart(3, '0')}${fileExtension}`
    const filePath = path.join(uploadPath, fileName)

    console.log(`上傳圖片: ${image.name} 到 ${filePath}`)

    try {
      await image.mv(filePath)  // 待每個 mv 操作完成
      const imageUrl = `/uploads/${entityType}/${sanitizedName}-${entityId}/${fileName}`
      console.log(`上傳成功: ${imageUrl}`)

      // 將上傳的圖片資料存入資料庫
      await Image.create({
        [dbColumn]: entityId,
        image_url: imageUrl
      })

      return imageUrl
    } catch (error) {
      console.error(`${entityType} ${entityId} 的圖片 ${image.name} 上傳失敗:`, error)
      return null
    }
  }))

  return imageUrls.filter(Boolean) // 過濾掉失敗的圖片
}

module.exports = handleImageUpload
