const express = require('express')
const router = express.Router()
const ordersController = require('../controllers/order-controller')

router.post('/create', ordersController.createOrder)
router.get('/:orderId', ordersController.getOrderDetails)
router.get('/user/:userId', ordersController.getOrdersByUser)

module.exports = router
