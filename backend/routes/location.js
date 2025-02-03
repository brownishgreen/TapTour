const express = require('express')
const router = express.Router()
const locationController = require('../controllers/location-controller')
const { downloadGoogleImages } = require('../utils/upload-handler')
const isAdmin = require('../middlewares/isAdmin')
const verifyToken = require('../middlewares/auth')
// require('dotenv').config() // 載入環境變數

// 取得所有景點
router.get('/', locationController.getAllLocation)

// 取得景點單一頁面
router.get('/:id', locationController.getLocationById)

router.get(
  '/:id/edit',
  verifyToken,
  isAdmin,
  locationController.editLocationPage
)

router.post(
  '/create',
  isAdmin,
  downloadGoogleImages,
  locationController.createLocation
)

router.put('/:id', verifyToken, isAdmin, locationController.editLocation)

router.delete('/:id', isAdmin, locationController.deleteLocation)

// 獲取該景點相關image
router.get('/:id/images', locationController.getLocationAllImage)

// 設置主要圖片
router.patch(
  '/:id/main-image',
  verifyToken,
  isAdmin,
  locationController.setLocationMainImage
)

// 自動補全地點
router.get('/google/autocomplete', locationController.autocompleteLocation)
// 獲取地點詳細資訊
router.get('/google/details', locationController.detailsLocation)

module.exports = router
