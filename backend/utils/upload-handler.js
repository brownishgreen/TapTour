const fs = require('fs')
const path = require('path')
const { Image } = require('../models')
const pinyin = require('pinyin').default


const handleImageUpload = async (images, basePath, activityId, name) => {
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true })
  }

  if (!images) throw new Error('未提供任何圖片')

  const imageArray = Array.isArray(images) ? images : [images]

  if (imageArray.length > 5) throw new Error('最多只能上傳 5 張圖片')

  // 將活動名稱轉換成安全的字串（拼音）
  const sanitizedName = pinyin(name, { style: pinyin.STYLE_NORMAL })
    .map(word => word.join(''))
    .join('-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase();

  const uploadPath = path.join(basePath, `${sanitizedName}-${activityId}`)

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true })
  }

  //處理所有圖片上傳
  const imageUrls = await Promise.all(imageArray.map(async (image, index) => {
    const fileExtension = path.extname(image.name)

    const fileName = `${activityId}-${sanitizedName}-${String(index + 1).padStart(3, '0')}${fileExtension}`
    const filePath = path.join(uploadPath, fileName)

    console.log(`上傳圖片: ${image.name} 到 ${filePath}`)

    try {
      await image.mv(filePath)  // 待每個 mv 操作完成
      const imageUrl = `/uploads/activities/${sanitizedName}-${activityId}/${fileName}`
      console.log(`上傳成功: ${imageUrl}`)

      // 將上傳的圖片資料存入資料庫
      await Image.create({
        activity_id: activityId,
        image_url: imageUrl
      })

      return imageUrl
    } catch (error) {
      console.error(`活動${activityId} 的圖片 ${image.name} 上傳失敗:`, error)
      return null
    }
  }))

  return imageUrls.filter(Boolean) // 過濾掉失敗的圖片
}

module.exports = handleImageUpload
