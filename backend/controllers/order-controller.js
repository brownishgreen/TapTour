const { Order, OrderedItem, Product, Activity, User } = require('../models')

const ordersController = {
  createOrder: async (req, res, next) => {
    const {
      userId,
      productIds = [],
      activityIds = [],
      total_amount,
      chosen_date,
      quantities = [],
    } = req.body

    if (!Array.isArray(productIds) && !Array.isArray(activityIds)) {
      return res.status(400).json({ message: '請至少選擇一個產品或活動' })
    }

    try {
      // **Step 1: 創建訂單**
      const newOrder = await Order.create({
        user_id: userId,
        total_amount,
        status: 'pending',
        chosen_date,
      })

      const orderedItems = []

      productIds.forEach((productId, index) => {
        orderedItems.push({
          order_id: newOrder.id,
          product_id: productId || null,
          activity_id: null,
          quantity: quantities[index] || 1,
        })
      })

      activityIds.forEach((activityId, index) => {
        orderedItems.push({
          order_id: newOrder.id,
          product_id: null,
          activity_id: activityId || null,
          quantity: quantities[index + productIds.length] || 1,
        })
      })

      // 批量插入 OrderedItems
      await OrderedItem.bulkCreate(orderedItems)

      res.status(201).json({ message: '訂單建立成功', orderId: newOrder.id })
    } catch (error) {
      res.status(500).json({ message: '伺服器錯誤，建立訂單失敗' })
      next(error)
    }
  },
  getOrdersByUser: async (req, res, next) => {
    const { userId } = req.params

    try {
      const orders = await Order.findAll({
        where: { user_id: userId },
        include: [
          {
            model: Product,
            as: 'products', // 與模型定義中的別名一致
          },
          {
            model: Activity,
            as: 'activities', // 與模型定義中的別名一致
          },
        ],
        order: [['createdAt', 'DESC']],
      })

      if (!orders.length) {
        return res.status(404).json({ message: '沒有找到相關訂單' })
      }

      res.status(200).json(orders)
    } catch (error) {
      res.status(500).json({ message: '伺服器錯誤，查詢訂單失敗' })
      next(error)
    }
  },
  getOrderDetails: async (req, res, next) => {
    const { orderId } = req.params

    console.log('OrderId from request:', orderId)

    try {
      const order = await Order.findOne({
        where: { id: orderId },
        include: [
          {
            model: OrderedItem,
            as: 'orderedItems',
            include: [
              { model: Product, as: 'product' },
              { model: Activity, as: 'activity' },
            ],
          },
          {
            model: User,
            as: 'user',
            attributes: ['name', 'email'], // 僅返回需要的字段
          },
        ],
      })
      if (!order) {
        return res.status(404).json({ message: '沒有找到相關訂單' })
      }

      const item = order.orderedItems[0]
      if (!item) {
        return res.status(404).json({ message: '該訂單中沒有任何產品或活動' })
      }

      const orderDetails = {
        userName: order.user.name,
        userEmail: order.user.email,
        uuid: order.uuid,
        chosenDate: order.chosen_date,
        totalAmount: order.total_amount,
        item: {
          name: item.product ? item.product.name : item.activity.name,
          quantity: item.quantity,
          price: item.product ? item.product.price : item.activity.price,
        },
      }

      res.status(200).json(orderDetails)
    } catch (error) {
      res.status(500).json({ message: '伺服器錯誤', error: error.message })
      next(error)
    }
  },
}
module.exports = ordersController
