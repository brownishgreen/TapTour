const fs = require('fs')
const path = require('path')

const handleImageUpload = async (images, uploadPath, activityId, sanitizedName) => {
  const imageUrls = []

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true }) 
  }

  // 使用 Promise.all 處理所有圖片的異步上傳
  await Promise.all(images.map(async (image, index) => {
    const fileExtension = path.extname(image.name)
    const fileName = `${activityId}-${sanitizedName}-${String(index + 1).padStart(3, '0')}${fileExtension}`
    const filePath = path.join(uploadPath, fileName)

    // 使用 await 確保 image.mv 是非同步的
    await image.mv(filePath)
    imageUrls.push(`/uploads/activities/${activityId}/${fileName}`)
  }))

  return imageUrls // 確保回傳 Promise
}

module.exports = handleImageUpload
