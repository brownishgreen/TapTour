const fs = require('fs')
const path = require('path')

const handleImageUpload = async (images, uploadPath, prefix, sanitizedName) => {
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true })
  }

  if (!images) throw new Error('未提供任何圖片')

  const imageArray = Array.isArray(images) ? images : [images]

  if (imageArray.length > 5) throw new Error('最多只能上傳 5 張圖片')

  const imageUrls = await Promise.all(imageArray.map(async (image, index) => {
    const fileExtension = path.extname(image.name)
    const fileName = `${prefix}-${sanitizedName}-${String(index + 1).padStart(3, '0')}${fileExtension}`
    const filePath = path.join(uploadPath, fileName)

    try {
      await image.mv(filePath)  // 待每個 mv 操作完成
      return `/uploads/activities/${prefix}/${fileName}`
    } catch (error) {
      console.error(`圖片 ${image.name} 上傳失敗:`, error)
      return null
    }
  }))

  return imageUrls.filter(Boolean) // 過濾掉失敗的圖片
}

module.exports = handleImageUpload
