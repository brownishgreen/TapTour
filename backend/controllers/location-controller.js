import locationService from '../services/location-service.js'

const locationController = {
  getAllLocation: async (req, res, next) => {
    try {
      const { search } = req.query
      const locations = await locationService.getAllLocations(search)

      res.status(200).json({
        message: '您已取得所有景點',
        locations,
      })
    } catch (err) {
      if (err.message === '沒有符合條件的景點') {
        return res.status(404).json({ message: err.message })
      }
      console.error('取得景點失敗:', err)
      res.status(500).json({ message: '伺服器錯誤，無法取得景點資料' })
      next(err)
    }
  },

  // 自動補全地點
  autocompleteLocation: async (req, res, next) => {
    try {
      const { input } = req.query
      if (!input) {
        return res.status(400).json({ error: '請提供地點名稱' })
      }

      const predictions = await locationService.autocompleteLocation(input)
      res.status(200).json(predictions)
    } catch (err) {
      console.error('自動補全地點失敗:', err)
      res.status(500).json({ error: '伺服器錯誤，無法獲取地點建議' })
      next(err)
    }
  },

  // 獲取地點詳細資訊
  detailsLocation: async (req, res, next) => {
    try {
      const { place_id } = req.query
      if (!place_id) {
        return res.status(400).json({ error: '請提供 place_id' })
      }

      const locationDetails = await locationService.getLocationDetails(place_id)
      res.status(200).json(locationDetails)
    } catch (err) {
      console.error('獲取地點詳細資訊失敗:', err)
      res.status(500).json({ error: '伺服器錯誤，無法獲取地點詳細資訊' })
      next(err)
    }
  },
  createLocation: async (req, res, next) => {
    try {
      const { name, googlePlaceId, description } = req.body
      if (!name) {
        return res.status(400).json({ error: '景點名稱為必填' })
      }

      const newLocation = await locationService.createLocation({
        name,
        googlePlaceId,
        description,
      })

      res.status(201).json(newLocation)
    } catch (err) {
      console.error('創建景點失敗:', err)
      next(err)
    }
  },
  getLocationById: async (req, res, next) => {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({ message: '請提供景點 ID' })
      }

      const location = await locationService.getLocationById(id)

      res.status(200).json({ message: '您已成功訪問景點詳細頁面', location })
    } catch (err) {
      if (err.message === '景點不存在') {
        return res.status(404).json({ message: err.message })
      }
      console.error('獲取景點詳細資訊失敗:', err)
      res.status(500).json({ message: '伺服器錯誤，無法獲取景點資料' })
      next(err)
    }
  },
  deleteLocation: async (req, res, next) => {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({ message: '請提供景點 ID' })
      }

      const deleteResult = await locationService.deleteLocation(id)

      res.status(200).json(deleteResult)
    } catch (err) {
      if (err.message === '景點不存在') {
        return res.status(404).json({ message: err.message })
      }
      console.error('刪除景點失敗:', err)
      res.status(500).json({ message: '伺服器錯誤，無法刪除景點' })
      next(err)
    }
  },
  editLocationPage: async (req, res, next) => {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({ message: '請提供景點 ID' })
      }

      const location = await locationService.getLocationForEdit(id)

      res.status(200).json(location)
    } catch (err) {
      if (err.message === '景點不存在') {
        return res.status(404).json({ message: err.message })
      }
      console.error('獲取景點編輯頁面失敗:', err)
      res.status(500).json({ message: '伺服器錯誤，無法獲取景點資訊' })
      next(err)
    }
  },
  editLocation: async (req, res, next) => {
    try {
      const { id } = req.params
      const updateData = req.body

      if (!id) {
        return res.status(400).json({ message: '請提供景點 ID' })
      }

      const updateResult = await locationService.updateLocation(id, updateData)

      res.status(200).json(updateResult)
    } catch (err) {
      if (err.message === '景點不存在') {
        return res.status(404).json({ message: err.message })
      }
      console.error('更新景點失敗:', err)
      res.status(500).json({ message: '伺服器錯誤，無法更新景點' })
      next(err)
    }
  },
  getLocationAllImages: async (req, res, next) => {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({ message: '請提供景點 ID' })
      }

      const images = await locationService.getLocationAllImages(id)

      res.status(200).json(images)
    } catch (err) {
      if (err.message === '景點不存在') {
        return res.status(404).json({ message: err.message })
      }
      console.error('獲取景點圖片失敗:', err)
      res.status(500).json({ message: '伺服器錯誤，無法獲取景點圖片' })
      next(err)
    }
  },
  setLocationMainImage: async (req, res, next) => {
    try {
      const { id } = req.params
      const { main_image_id } = req.body

      if (!id || !main_image_id) {
        return res.status(400).json({ error: '請提供地點 ID 和主要圖片 ID' })
      }

      const updateResult = await locationService.setLocationMainImage(id, main_image_id)

      res.status(200).json(updateResult)
    } catch (err) {
      if (err.message === '地點不存在' || err.message === '圖片不存在或不屬於該地點') {
        return res.status(400).json({ error: err.message })
      }
      console.error('更新主要圖片失敗:', err)
      res.status(500).json({ error: '伺服器錯誤，無法更新主要圖片' })
      next(err)
    }
  },
  getPaginatedLocations: async (req, res, next) => {
    try {
      const { page, limit } = req.query

      const paginatedLocations = await locationService.getPaginatedLocations(page, limit)

      res.status(200).json(paginatedLocations)
    } catch (err) {
      if (err.message === 'Page and limit must be positive numbers') {
        return res.status(400).json({ message: err.message })
      }
      console.error('獲取分頁景點失敗:', err)
      res.status(500).json({ message: '伺服器錯誤，無法獲取景點資料' })
      next(err)
    }
  }
}
export default locationController