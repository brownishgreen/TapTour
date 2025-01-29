require('dotenv').config() // 載入環境變數
const { Location } = require('../models')
const axios = require('axios')
// const handleImageUpload = require('../utils/upload-handler')
// const path = require('path')

const locationController = {
  getAllLocation: async (req, res, next) => {
    try {
      const locations = await Location.findAll()
      res.status(200).json({ message: '您已取得所有景點', locations })
    } catch (err) {
      err.statusCode = 500
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

        // 返回地點詳細資訊，包括圖片 URL
        res.status(200).json({
          name: place.name,
          address: place.formatted_address,
          photos: photos, // 返回生成的圖片 URL 陣列
          url: place.url || 'null',
          opening_hours: place.opening_hours?.weekday_text || [],
        })
      } else {
        console.log('無法獲取地點詳細資訊')
        res.status(400).json({ error: '無法獲取地點詳細資訊' })
      }
    } catch (err) {
      console.error('Google Place Details API 錯誤:', err)
      err.statusCode = 500
      next(err)
    }
  },

  createLocation: async (req, res, next) => {
    const { name, googlePlaceId } = req.body
    const apiKey = process.env.GOOGLE_API_KEY

    try {
      // 呼叫 Google API 獲取景點資訊
      let latitude, longitude, address, description, openingHours, googleUrl
      if (googlePlaceId) {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${googlePlaceId}&key=${apiKey}`
        )

        if (response.data.result) {
          const place = response.data.result

          // 提取所需的資訊
          latitude = place.geometry.location.lat
          longitude = place.geometry.location.lng
          address = place.formatted_address || null 
          description = '' || null
          openingHours =
            place.opening_hours?.weekday_text.join(', ') || '無營業時間資訊'
          googleUrl = place.url || null
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
    
      res.status(201).json({
        message: '新增景點成功',
        location, 
      })
    } catch (err) {
      console.error(err)
      next(err)
    }
  },
}
module.exports = locationController
