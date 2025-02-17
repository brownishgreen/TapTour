import ordersService from '../services/order-service.js'

const ordersController = {
  createOrder: async (req, res, next) => {
    try {
      const orderData = req.body
      const createOrderResult = await ordersService.createOrder(orderData)
      res.status(201).json(createOrderResult)
    } catch (err) {
      next(err)
    }
  },

  getOrdersByUser: async (req, res, next) => {
    try {
      const { userId } = req.params
      const orders = await ordersService.getOrdersByUser(userId)
      res.status(200).json(orders)
    } catch (err) {
      next(err)
    }
  },

  getOrderDetails: async (req, res, next) => {
    try {
      const { orderId } = req.params
      const order = await ordersService.getOrderDetails(orderId)
      res.status(200).json(order)
    } catch (err) {
      next(err)
    }
  },
}

export default ordersController
