require('dotenv').config() // 載入環境變數
const { Location, Image } = require('../models')
const axios = require('axios')
const { downloadGoogleImages } = require('../utils/upload-handler')
const path = require('path')
const { Op } = require('sequelize') // 引入 Sequelize 的操作符

const locationController = {
  getAllLocation: async (req, res, next) => {
    const { search } = req.query // 從請求的查詢參數中提取 search 關鍵字

    try {
      // 初始化查詢選項
      // 即使查詢條件只有 name，仍然應該 include: Image，這樣可以：
      // 確保查詢結果一次性包含對應的圖片，避免額外 API 請求
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
          name: { [Op.like]: `%${search}%` }, // 模糊查詢，用來查詢包含某些關鍵字或字符的數據，而不需要完全匹配
        }
      }

      const locations = await Location.findAll(queryOptions)

      if (locations.length === 0) {
        return res.status(404).json({ message: '沒有符合條件的景點' })
      }

      const locationsWithMainImage = locations.map((location) => {
        const mainImage = location.images?.find(
          (image) => image.id === location.main_image_id
        )
        return {
          ...location.toJSON(),
          main_image_url: mainImage ? mainImage.image_url : null,
        }
      })

      res.status(200).json({
        message: '您已取得所有景點',
        locations: locationsWithMainImage,
      })
    } catch (err) {
      console.error('取得景點失敗:', err)
      res.status(500).json({ message: '伺服器錯誤，無法取得景點資料' })
      next(err)
    }
  },

  // 自動補全地點
  autocompleteLocation: async (req, res, next) => {
    const { input } = req.query // 使用者輸入的地點名稱
    const apiKey = process.env.GOOGLE_API_KEY

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}&language=zh-TW`
      )

      if (response.data.predictions) {
        res.status(200).json(response.data.predictions) // 返回地點建議
      } else {
        res.status(400).json({ error: '無法獲取地點建議' })
      }
    } catch (err) {
      console.error('Google Autocomplete API 錯誤:', err)
      err.statusCode = 500
      next(err)
    }
  },

  // 獲取地點詳細資訊
  detailsLocation: async (req, res, next) => {
    const { place_id } = req.query // 從查詢參數獲取 place_id
    const apiKey = process.env.GOOGLE_API_KEY

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${apiKey}&language=zh-TW`
      )

      if (response.data.result) {
        const place = response.data.result

        // 提取照片 URL
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

        // 返回地點詳細資訊，包括清理後的地址
        res.status(200).json({
          name: place.name,
          address: cleanedAddress,
          photos: photos,
          url: place.url || 'null',
          opening_hours: place.opening_hours?.weekday_text || [],
        })
      } else {
        res.status(400).json({ error: '無法獲取地點詳細資訊' })
      }
    } catch (err) {
      console.error('Google Place Details API 錯誤:', err)
      err.statusCode = 500
      next(err)
    }
  },

  createLocation: async (req, res, next) => {
    const { name, googlePlaceId, description } = req.body
    const apiKey = process.env.GOOGLE_API_KEY

    try {
      // 呼叫 Google API 獲取景點資訊
      let latitude, longitude, address, openingHours, googleUrl
      let googlePhotos = [] // 初始化為空陣列
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
            console.log('Google Photos:', place.photos) // 檢查原始圖片數據
            googlePhotos = place.photos.slice(0, 5).map((photo) => ({
              reference: photo.photo_reference,
            }))
            console.log('Generated googlePhotos:', googlePhotos) // 檢查生成的圖片引用陣列
          }
        } else {
          return res.status(400).json({ error: '無效的 Google Place ID' })
        }
      }

      // 將資料存入資料庫
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

      const basePath = path.join(__dirname, '../uploads/locations')

      const imageUrls = await downloadGoogleImages(
        googlePhotos,
        basePath,
        location.id,
        name,
        'locations',
        'location_id'
      )

      res.status(201).json({
        message: '新增景點成功',
        location,
        images: imageUrls,
      })
    } catch (err) {
      console.error(err)
      next(err)
    }
  },
  getLocationById: async (req, res, next) => {
    try {
      const location = await Location.findByPk(req.params.id, {
        include: {
          model: Image,
          as: 'images',
          attributes: ['image_url'],
        },
      })

      if (!location) {
        return res.status(404).json({ message: '景點不存在' })
      }
      res.status(200).json({ message: '您已成功訪問景點詳細頁面', location })
    } catch (err) {
      err.statusCode = 500
      next(err)
    }
  },
  deleteLocation: async (req, res, next) => {
    try {
      const location = await Location.findByPk(req.params.id)

      if (!location) {
        return res.status(404).json({ message: '景點不存在' })
      }
      await location.destroy()
      res.status(200).json({ message: '景點刪除成功' })
    } catch (err) {
      err.statusCode = 500
      next(err)
    }
  },
  editLocationPage: async (req, res, next) => {
    try {
      const location = await Location.findByPk(req.params.id)
      if (!location) {
        return res.status(404).json({ message: '景點不存在' })
      }
      res.status(200).json(location)
    } catch (err) {
      err.statusCode = 500
      next(err)
    }
  },
  editLocation: async (req, res, next) => {
    try {
      const location = await Location.findByPk(req.params.id)
      const { name, description, opening_hours, address } = req.body
      if (!location) {
        return res.status(404).json({ message: '景點不存在' })
      }
      await location.update({ name, description, opening_hours, address })
      res.status(200).json({ message: '景點更新成功' })
    } catch (err) {
      err.statusCode = 500
      next(err)
    }
  },
  getLocationAllImage: async (req, res, next) => {
    try {
      const location = await Location.findByPk(req.params.id)
      if (!location) {
        return res.status(404).json({ message: '景點不存在' })
      }
      const images = await Image.findAll({
        where: { location_id: location.id },
      })
      res.json(images)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: '獲取圖片失敗' })
    }
  },
  setLocationMainImage: async (req, res, next) => {
    const { main_image_id } = req.body
    try {
      // 確認地點是否存在
      const location = await Location.findByPk(req.params.id)
      if (!location) return res.status(404).json({ error: '地點不存在' })

      // 確認圖片是否存在且屬於該地點
      const image = await Image.findOne({
        where: {
          id: main_image_id,
          location_id: location.id,
        },
      })
      if (!image) {
        return res.status(400).json({ error: '圖片不存在或不屬於該地點' })
      }

      // 更新主要圖片
      await location.update({ main_image_id })

      res.json({ message: '主要圖片已更新', main_image_id })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: '更新失敗' })
    }
  },
  getPaginatedLocations: async (req, res, next) => {
    // limit 主要是由前端傳入的，但如果前端沒有傳入，後端會使用預設的值
    // 10代表十進位制，不能隨意改動
    const page = parseInt(req.query.page, 10) || 1 // 預設為第 1 頁
    const limit = parseInt(req.query.limit, 10) || 9 // 預設每頁 9 筆
    const offset = (page - 1) * limit // 計算偏移量，分頁查詢時決定從第幾筆資料開始

    // 驗證 page 和 limit 是否有效，若無效則返回 400 錯誤
    if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
      return res
        .status(400)
        .json({ message: 'Page and limit must be positive numbers' })
    }

    try {
      // 獲取活動資料（包含關聯的圖片）
      const locations = await Location.findAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: Image,
            as: 'images',
            attributes: ['image_url'], // 僅返回圖片 URL
          },
        ],
      })

      // 獲取活動的總數（不包含關聯表，避免多次計算）
      //  Sequelize 提供的方法，用於計算資料表的總記錄數
      const totalItems = await Location.count()

      res.status(200).json({
        locations,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
      })
    } catch (error) {
      console.log('分頁獲取活動數據失敗:', error)
      next(error)
    }
  },
}
module.exports = locationController
