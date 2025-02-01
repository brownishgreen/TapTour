const express = require('express')
const router = express.Router()
const locationController = require('../controllers/location-controller')
const { downloadGoogleImages } = require('../utils/upload-handler')
require('dotenv').config() // 載入環境變數


// 取得所有景點
router.get('/', locationController.getAllLocation)

// 取得景點單一頁面
router.get('/:id', locationController.getLocationById)

router.post('/create', downloadGoogleImages, locationController.createLocation)

router.delete('/:id', locationController.deleteLocation)

// 自動補全地點
router.get('/google/autocomplete', locationController.autocompleteLocation)
// 獲取地點詳細資訊
router.get('/google/details', locationController.detailsLocation)

module.exports = router
