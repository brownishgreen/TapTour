import 'dotenv/config' // 載入環境變數
import { Location, Image, Activity } from '../models/index.js'
import axios from 'axios'
import { downloadGoogleImages } from '../utils/upload-handler.js'
import { fileURLToPath } from 'url'
import path from 'path'
import { Op } from 'sequelize' // 引入 Sequelize 的操作符
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import CustomError from '../utils/CustomError.js'

const locationService = {
  getAllLocations: async (search) => {
    try {
      // 準備查詢選項
      const queryOptions = {
        include: {
          model: Image,
          as: 'images',
          attributes: ['id', 'image_url'], // 包含圖片資訊
        },
      }

      // 如果有搜尋條件，添加模糊查詢條件
      if (search) {
        queryOptions.where = {
          name: { [Op.like]: `%${search}%` },
        }
      }

      // 查詢資料庫
      const locations = await Location.findAll(queryOptions)

      if (locations.length === 0) {
        throw new CustomError(404, '沒有符合條件的景點')
      }

      // 處理主要圖片的邏輯
      const locationsWithMainImage = locations.map((location) => {
        const mainImage = location.images?.find(
          (image) => image.id === location.main_image_id
        )
        return {
          ...location.toJSON(),
          main_image_url: mainImage ? mainImage.image_url : null,
        }
      })

      return locationsWithMainImage
    } catch (err) {
      console.error('❌ 取得景點失敗:', err)
      throw new CustomError(500, '伺服器錯誤，無法取得景點資料')
    }
  },
  autocompleteLocation: async (input) => {
    if (!input) {
      throw new CustomError(400, '請提供地點名稱')
    }
    try {
      const apiKey = process.env.GOOGLE_API_KEY
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}&language=zh-TW`
      )

      if (!response.data.predictions) {
        throw new CustomError(404, '無法獲取地點建議')
      }
      return response.data.predictions
    } catch (err) {
      console.error('❌ Google Autocomplete API 錯誤:', err)
      throw new CustomError(500, 'Google Autocomplete API 請求失敗')
    }
  },
  getLocationDetails: async (place_id) => {
    if (!place_id) {
      throw new CustomError(400, '請提供 place_id')
    }
    const apiKey = process.env.GOOGLE_API_KEY

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${apiKey}&language=zh-TW`
      )

      if (!response.data.result) {
        throw new CustomError(404, '無法獲取地點詳細資訊')
      }

      const place = response.data.result

      // 提取照片 URL（最多 5 張）
      const photos = (place.photos || []).slice(0, 5).map((photo) => {
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo.photo_reference}&key=${apiKey}`
      })

      // 清理地址格式
      let cleanedAddress = place.formatted_address || '無地址'
      if (/\w+\+\w+$/.test(cleanedAddress) && place.address_components) {
        cleanedAddress = place.address_components
          .map((comp) => comp.long_name)
          .join(', ')
      }

      return {
        name: place.name,
        address: cleanedAddress,
        photos: photos,
        url: place.url || null,
        opening_hours: place.opening_hours?.weekday_text || [],
      }
    } catch (err) {
      console.error('Google Place Details API 錯誤:', err)
      throw new CustomError(500, 'Google Place Details API 請求失敗')
    }
  },
  createLocation: async ({ name, googlePlaceId, description }) => {
    if (!name) {
      throw new CustomError(400, '景點名稱為必填')
    }

    const apiKey = process.env.GOOGLE_API_KEY
    let latitude, longitude, address, openingHours, googleUrl
    let googlePhotos = []

    try {
      //如果有 googlePlaceId，則向 Google Maps API 獲取詳細資訊
      if (googlePlaceId) {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${googlePlaceId}&key=${apiKey}&language=zh-TW`
        )

        if (response.data.result) {
          const place = response.data.result

          // 提取所需的資訊
          latitude = place.geometry.location.lat
          longitude = place.geometry.location.lng
          address = place.formatted_address || null
          openingHours =
            place.opening_hours?.weekday_text.join(', ') || '無營業時間資訊'
          googleUrl = place.url || null

          // 取得 Google 提供的圖片 (最多5張)
          if (place.photos && place.photos.length > 0) {
            googlePhotos = place.photos.slice(0, 5).map((photo) => ({
              reference: photo.photo_reference,
            }))
          }
        } else {
          throw new CustomError(400, '無效的 Google Place ID')
        }
      }

      //將資料存入資料庫
      const location = await Location.create({
        name,
        description: description || '無描述',
        address: address || '無地址',
        latitude: latitude || null,
        longitude: longitude || null,
        google_place_id: googlePlaceId || null,
        opening_hours: openingHours,
        google_url: googleUrl,
      })

      //下載 Google Maps 圖片
      const basePath = path.join(__dirname, '../uploads/locations')
      const imageUrls = await downloadGoogleImages(
        googlePhotos,
        basePath,
        location.id,
        name,
        'locations',
        'location_id'
      )

      return {
        message: '新增景點成功',
        location,
        images: imageUrls,
      }
    } catch (err) {
      console.error('新增景點失敗:', err)
      throw new CustomError(500, '無法創建景點，請稍後再試')
    }
  },
  getLocationById: async (id) => {
    if (!id) {
      throw new CustomError(400, '請提供景點 ID')
    }
    try {
      const location = await Location.findByPk(id, {
        include: [
          {
            model: Image,
            as: 'images',
            attributes: ['image_url'],
          },
          {
            model: Activity,
            as: 'activities',
            include: [
              {
                model: Image,
                as: 'images',
                attributes: ['image_url'],
              },
            ],
          },
        ],
      })

      if (!location) {
        throw new CustomError(404, '景點不存在')
      }

      return location
    } catch (err) {
      console.error('獲取景點詳細資訊失敗:', err)
      throw new CustomError(500, '伺服器錯誤，無法獲取景點資料')
    }
  },
  deleteLocation: async (id) => {
    if (!id) {
      throw new CustomError(400, '請提供景點 ID')
    }
    try {
      const location = await Location.findByPk(id)

      if (!location) {
        throw new CustomError(404, '景點不存在')
      }

      await location.destroy()
      return { message: '景點刪除成功' }
    } catch (err) {
      console.error('刪除景點失敗:', err)
      throw new CustomError(500, '伺服器錯誤，無法刪除景點')
    }
  },
  getLocationForEdit: async (id) => {
    if (!id) {
      throw new CustomError(400, '請提供景點 ID')
    }
    try {
      const location = await Location.findByPk(id)

      if (!location) {
        throw new CustomError(404, '景點不存在')
      }

      return location
    } catch (err) {
      console.error('獲取景點編輯頁面失敗:', err)
      throw new CustomError(500, '伺服器錯誤，無法獲取景點資訊')
    }
  },
  updateLocation: async (id, updateData) => {
    if (!id) {
      throw new CustomError(400, '請提供景點 ID')
    }
    try {
      const location = await Location.findByPk(id)

      if (!location) {
        throw new CustomError(404, '景點不存在')
      }

      await location.update(updateData)
      return { message: '景點更新成功' }
    } catch (err) {
      console.error('更新景點失敗:', err)
      throw new CustomError(500, '伺服器錯誤，無法更新景點')
    }
  },
  getLocationAllImages: async (id) => {
    if (!id) {
      throw new CustomError(400, '請提供景點 ID')
    }
    try {
      const location = await Location.findByPk(id)

      if (!location) {
        throw new CustomError(404, '景點不存在')
      }

      const images = await Image.findAll({
        where: { location_id: location.id },
      })

      return images
    } catch (err) {
      console.error('獲取景點圖片失敗:', err)
      throw new CustomError(500, '伺服器錯誤，無法獲取景點圖片')
    }
  },
  setLocationMainImage: async (locationId, mainImageId) => {
    if (!locationId || !mainImageId) {
      throw new CustomError(400, '請提供地點 ID 和主要圖片 ID') 
    }
    try {
      // 確認地點是否存在
      const location = await Location.findByPk(locationId)
      if (!location) {
        throw new CustomError(404, '地點不存在')
      }

      // 確認圖片是否存在且屬於該地點
      const image = await Image.findOne({
        where: {
          id: mainImageId,
          location_id: location.id,
        },
      })
      if (!image) {
        throw new CustomError(400, '圖片不存在或不屬於該地點')
      }

      // 更新主要圖片
      await location.update({ main_image_id: mainImageId })

      return { message: '主要圖片已更新', main_image_id: mainImageId }
    } catch (err) {
      console.error('更新主要圖片失敗:', err)
      throw new CustomError(500, '伺服器錯誤，無法更新主要圖片')
    }
  },
  getPaginatedLocations: async (page = 1, limit = 6) => {
    try {
      // 解析 page 和 limit，確保為數字
      page = parseInt(page, 10)
      limit = parseInt(limit, 10)

      if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
        throw new Error('Page and limit must be positive numbers')
      }

      const offset = (page - 1) * limit

      // 獲取景點數據
      const locations = await Location.findAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: Image,
            as: 'images',
            attributes: ['id', 'image_url'], // 確保返回 id 和 image_url
          },
        ],
      })

      // 計算總景點數
      const totalItems = await Location.count()

      // 對數據進行處理，提取主要圖片
      const locationsWithMainImage = locations.map((location) => {
        const mainImage = location.images.find(
          (image) => image.id === location.main_image_id
        )
        return {
          ...location.toJSON(),
          main_image_url: mainImage ? mainImage.image_url : null,
          images: location.images.map((image) => ({
            id: image.id,
            image_url: image.image_url,
          })),
        }
      })

      return {
        locations: locationsWithMainImage,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
      }
    } catch (error) {
      console.error('獲取分頁景點失敗:', error)
      throw new CustomError(500, '伺服器錯誤，無法獲取景點資料')
    }
  }
}

export default locationService
