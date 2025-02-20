import { useEffect, useState } from 'react'
import apiClient from '../../api/apiClient'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Payment = () => {
  const navigate = useNavigate()
  const { userId: currentUserId } = useAuth()
  const { orderId } = useParams() // 從 URL 獲取 orderId
  const [orderDetails, setOrderDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!currentUserId) return // 確保已經獲取當前登入用戶 ID

    const fetchOrderDetails = async () => {
      try {
        const response = await apiClient.get(`api/orders/${orderId}`)
        const orderData = response.data

        if (!orderData?.userId) {
          throw new Error('訂單數據異常，缺少 userId')
        }

        if (String(orderData.userId) !== String(currentUserId)) {
          setError('❌ 你無權查看此訂單')
          setTimeout(() => navigate('/'), 1500) // 1.5 秒後導回首頁
          return
        }

        setOrderDetails(orderData)
      } catch (err) {
        console.error('❌ 無法獲取訂單詳細資料:', err)
        setError('❌ 查無此訂單，請聯繫客服')
        setTimeout(() => navigate('/'), 1500)
      } finally {
        setLoading(false) // 加載完成
      }
    }

    fetchOrderDetails()
  }, [orderId, currentUserId, navigate])

  if (loading) return <p>🔄 載入中...</p>
  if (error) return <p>{error}</p>

  const { userName, userEmail, uuid, chosenDate, totalAmount, item } =
    orderDetails

  return (
    <form
      className="form-container"
      style={{
        width: '700px',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
      }}
    >
      <div className="payment-title">
        <h3>付款頁面</h3>
      </div>
      <div className="payment-form">
        <div className="form-group">
          <label className="form-label">使用者:</label>
          <input className="form-input" type="text" value={userName} disabled />
        </div>
        <div className="form-group">
          <label className="form-label">信箱: </label>
          <input
            className="form-input"
            type="email"
            value={userEmail}
            disabled
          />
        </div>
        <div className="form-group">
          <label className="form-label">訂單號: </label>
          <input className="form-input" type="text" value={uuid} disabled />
        </div>
        <div className="form-group">
          <label className="form-label">名稱: </label>
          <input
            className="form-input"
            type="text"
            value={item.name}
            disabled
          />
        </div>
        <div className="form-group">
          <label className="form-label">單價: </label>
          <input
            className="form-input"
            type="text"
            value={`NT$ ${item.price}`}
            disabled
          />
        </div>
        <div className="form-group">
          <label className="form-label">日期: </label>
          <input
            className="form-input"
            type="text"
            value={chosenDate}
            disabled
          />
        </div>
        <div className="form-group">
          <label className="form-label">數量: </label>
          <input
            className="form-input"
            type="number"
            value={item.quantity}
            disabled
          />
        </div>
        <div className="form-group">
          <label className="form-label">總金額: </label>
          <input
            className="form-input"
            type="text"
            value={`NT$ ${totalAmount}`}
            disabled
          />
        </div>
        <div className="form-group">
          <label className="form-label">信用卡: </label>
          <input
            className="form-input"
            type="text"
            value="**** **** **** 1234"
            disabled
          />
        </div>
      </div>

      <button type="button" disabled className="form-button">
        提交付款
      </button>
    </form>
  )
}

export default Payment
