const { Order, OrderedItem, Product, Activity } = require('../models')

const ordersController = {
  createOrder: async (req, res, next) => {
    const {
      userId,
      productIds,
      activityIds,
      total_amount,
      chosen_date,
      quantities,
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

      console.log('新訂單:', newOrder)

      // **Step 2: 動態檢查 product_id 和 activity_id**
      const orderedItems = []
      if (Array.isArray(productIds)) {
        productIds.forEach((productId, index) => {
          orderedItems.push({
            order_id: newOrder.id,
            product_id: productId || null,
            activity_id: null,
            quantity: quantities[index] || 1,
          })
        })
      }
      if (Array.isArray(activityIds)) {
        activityIds.forEach((activityId, index) => {
          orderedItems.push({
            order_id: newOrder.id,
            product_id: null,
            activity_id: activityId || null,
            quantity: quantities[index] || 1,
          })
        })
      }

      // **Step 3: 插入 OrderedItems**
      await OrderedItem.bulkCreate(orderedItems)

      res.status(201).json({ message: '訂單建立成功', orderId: newOrder.id })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: '伺服器錯誤，建立訂單失敗' })
    }
  },
  getOrdersByUser: async (req, res, next) => {
    const { userId } = req.params // 從請求 URL 中獲取使用者 ID

    try {
      // 查詢該使用者的所有訂單
      const orders = await Order.findAll({
        where: { user_id: userId },
        include: [
          {
            model: OrderedItem,
            include: [{ model: Product }, { model: Activity }],
          },
        ],
        order: [['created_at', 'DESC']], // 根據建立時間降序排列
      })

      if (!orders.length) {
        return res.status(404).json({ message: '沒有找到相關訂單' })
      }

      res.status(200).json(orders)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: '伺服器錯誤，查詢訂單失敗' })
    }
  },
}
module.exports = ordersController
