const express = require('express')
const router = express.Router()
const locationController = require('../controllers/location-controller')

// 取得所有景點
router.get('/', locationController.getAllLocation)

// 取得景點單一頁面
router.get('/:id', locationController.getLocationById)

router.post('/create', locationController.createLocation)
// 自動補全地點
router.get('/google/autocomplete', locationController.autocompleteLocation)
// 獲取地點詳細資訊
router.get('/google/details', locationController.detailsLocation)

module.exports = router