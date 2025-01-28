const fs = require('fs')
const path = require('path')

/**
 * 上傳圖片的工具函數
 * @param {Array} images - 上傳的圖片陣列
 * @param {String} uploadPath - 圖片的存放目錄
 * @param {String} prefix - 檔名的前綴（例如活動 ID）
 * @param {String} sanitizedName - 活動名稱（處理後的格式化名稱）
 * @returns {Array} imageUrls - 圖片的 URL 列表
 */

const handleImageUpload = async (images, uploadPath, prefix, sanitizedName) => {
  // 確保上傳目錄存在
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true })
  }

  // 檢查圖片數量
  if (images.length > 5) {
    throw new Error('最多只能上傳 5 張圖片')
  }

  const imageUrls = []

  for (const [index, image] of images.entries()) {
    const fileExtension = path.extname(image.name)
    const fileName = `${prefix}-${sanitizedName}-${String(index + 1).padStart(3, '0')}${fileExtension}`
    const filePath = path.join(uploadPath, fileName)

    // 移動圖片
    await image.mv(filePath)

    // 生成圖片 URL
    imageUrls.push(`/uploads/activities/${prefix}/${fileName}`)
  }

  return imageUrls
}

module.exports = handleImageUpload
