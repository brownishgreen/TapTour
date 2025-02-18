import ordersService from '../services/order-service.js'
import { handleError } from '../utils/handleError.js'

const ordersController = {
  createOrder: async (req, res) => {
    try {
      const orderData = req.body
      const createOrderResult = await ordersService.createOrder(orderData)
      res.status(201).json(createOrderResult)
    } catch (err) {
      handleError(res, err)
    }
  },

  getOrdersByUser: async (req, res) => {
    try {
      const { userId } = req.params
      const orders = await ordersService.getOrdersByUser(userId)
      res.status(200).json(orders)
    } catch (err) {
      handleError(res, err)
    }
  },

  getOrderDetails: async (req, res) => {
    try {
      const { orderId } = req.params
      const order = await ordersService.getOrderDetails(orderId)
      res.status(200).json(order)
    } catch (err) {
      handleError(res, err)
    }
  },
}

export default ordersController
