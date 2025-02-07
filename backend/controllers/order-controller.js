const { Order, OrderProduct, Product } = require('../models')

const ordersController = {
  createProductOrder: async (req, res, next) => {
    const { userId, productIds, name, email, total_amount } = req.body // 確保 total_amount 名稱一致

    if (
      typeof userId !== 'number' || // 確保 userId 是數字
      typeof name !== 'string' || // 確保 name 是字串
      typeof email !== 'string' || // 確保 email 是字串
      typeof total_amount !== 'number' || // 確保 total_amount 是數字
      !Array.isArray(productIds) || // 確保 productIds 是陣列
      productIds.length === 0 // 確保陣列不是空的
    ) {
      return res.status(400).json({ message: '缺少必要參數' })
    }

    const validProducts = await Product.findAll({
      where: { id: productIds },
    })
    if (validProducts.length !== productIds.length) {
      return res
        .status(400)
        .json({ message: '部分產品不存在，請檢查您的訂單內容' })
    }

    try {
      const newOrder = await Order.create({
        user_id: userId,
        name,
        email,
        total_amount,
        status: 'pending',
        created_at: new Date(),
        updated_at: new Date(),
      })

      const orderProducts = productIds.map((productId) => ({
        order_id: newOrder.id,
        product_id: productId,
        created_at: new Date(),
        updated_at: new Date(),
      }))
      await OrderProduct.bulkCreate(orderProducts)

      res
        .status(201)
        .json({ message: '產品訂單建立成功', orderId: newOrder.id })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: '伺服器錯誤，建立產品訂單失敗' })
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
            model: OrderProduct, // 關聯訂單產品表
            include: [{ model: Product }], // 關聯產品表
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
