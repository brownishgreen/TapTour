const express = require('express')
const router = express.Router()
const ordersController = require('../controllers/order-controller')

router.post('/product', ordersController.createProductOrder)
router.get('/:userId', ordersController.getOrdersByUser)

module.exports = router
