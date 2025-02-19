import { Order, OrderedItem, Product, Activity, User } from '../models/index.js'
import CustomError from '../utils/CustomError.js'

const ordersService = {
  createOrder: async (orderData) => {
    const { userId, productIds = [], activityIds = [], total_amount, chosen_date, quantities = [] } = orderData
    if (!Array.isArray(productIds) && !Array.isArray(activityIds)) {
      throw new CustomError(400, '請至少選擇一個產品或活動')
    }

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

    await OrderedItem.bulkCreate(orderedItems)

    return { message: '訂單建立成功', orderId: newOrder.id }
  },

  getOrdersByUser: async (userId) => {
    const orders = await Order.findAll({
      where: { user_id: userId },
      include: [
        {
          model: OrderedItem,
          as: 'orderedItems',
          include: [
            { model: Product, as: 'product', attributes: ['name', 'price'] },
            { model: Activity, as: 'activity', attributes: ['name', 'price'] },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    })

    if (!orders.length) {
      throw new CustomError(404, '沒有找到相關訂單')
    }

    return orders.map((order) => ({
      orderId: order.id,
      uuid: order.uuid,
      createdAt: order.createdAt,
      totalAmount: order.total_amount,
      items: order.orderedItems.map((item) => ({
        name: item.product?.name || item.activity?.name || '未知名稱',
        quantity: item.quantity,
        price: item.product?.price || item.activity?.price || 0,
      })),
    }))
  },

  getOrderDetails: async (orderId) => {
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
          attributes: ['name', 'email'],
        },
      ],
    })

    if (!order) {
      throw new CustomError(404, '沒有找到相關訂單')
    }

    const item = order.orderedItems[0]
    if (!item) {
      throw new CustomError(400, '該訂單中沒有任何產品或活動')
    }

    return {
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
  },
}

export default ordersService
