import { useEffect, useState } from 'react'
import apiClient from '../../api/apiClient'
import { useAuth } from '../context/AuthContext'
import { getImageUrl } from '../../utils/imageHelper'

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
        const response = await apiClient.get(`orders/user/${user.id}`) // 使用 user.id
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
    <div className="table-container">
      <div className="main-title">
        <h3>歷史訂單</h3>
      </div>
      {orders.length === 0 ? (
        <p>目前尚無歷史訂單。</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>訂單編號</th>

              <th>商品名稱</th>
              <th style={{ minWidth: '180px' }}>單價</th>
              <th style={{ maxWidth: '80px' }}>數量</th>
              <th>總金額</th>
              <th>建立日期</th>
              <th style={{ minWidth: '100px' }}>訂單狀態</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) =>
              order.items.map((item, index) => (
                <tr key={`${order.orderId}-${index}`}>
                  <td title={order.uuid}>
                    {index === 0 ? `${order.uuid.substring(0, 8)}...` : ''}
                  </td>

                  <td>{item.name}</td>
                  <td>NT$ {item.price}</td>

                  <td>{item.quantity}</td>
                  <td>{index === 0 ? `NT$ ${order.totalAmount}` : ''}</td>
                  <td>
                    {index === 0
                      ? new Date(order.createdAt).toLocaleString()
                      : ''}
                  </td>
                  <td>待確認</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default HistoryOrdersPage
