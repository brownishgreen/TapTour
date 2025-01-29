const express = require('express')
const router = express.Router()
const locationController = require('../controllers/location-controller')

// 取得所有景點
router.get('/', locationController.getAllLocation)

router.post('/create', locationController.createLocation)
// 自動補全地點
router.get('/autocomplete', locationController.autocompleteLocation)

module.exports = router