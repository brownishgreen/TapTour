import { useEffect, useState } from 'react'
import apiClient from '../../api/apiClient'
import { useAuth } from '../context/AuthContext'

const HistoryOrdersPage = () => {
  const { user } = useAuth() // 取得當前登入使用者
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (user === null) {
      // 等待 AuthContext 初始化完成
      return
    }

    if (!user || !user.id) {
      setError('尚未登入，無法取得歷史訂單資料')
      setLoading(false)
      return
    }

    const fetchOrders = async () => {
      try {
        const response = await apiClient.get(`/api/orders/user/${user.id}`) // 使用 user.id
        setOrders(response.data)
      } catch (error) {
        console.error('無法獲取歷史訂單資料:', error)
        setError('無法取得歷史訂單資料，請稍後再試')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  if (loading) return <p>載入中...</p>

  if (error) {
    return <p>無法獲取歷史訂單，請稍後再試。</p>
  }

  if (!orders.length) {
    return <p>目前尚無歷史訂單。</p>
  }

  return (
    <div>
      <h3>歷史訂單</h3>
      {orders.length === 0 ? (
        <p>目前尚無歷史訂單。</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.orderId}>
              <p>訂單編號: {order.uuid}</p>
              <p>建立日期: {new Date(order.createdAt).toLocaleString()}</p>
              <p>總金額: NT$ {order.totalAmount}</p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    商品名稱: {item.name}，數量: {item.quantity}，單價: NT${' '}
                    {item.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default HistoryOrdersPage
