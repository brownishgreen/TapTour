import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiClient from '../../api/apiClient'

const Payment = () => {
  const { orderId } = useParams() // 從 URL 獲取orderId
  const [orderDetails, setOrderDetails] = useState(null)

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await apiClient.get(`api/orders/${orderId}`)
        setOrderDetails(response.data)
      } catch (error) {
        console.error('無法獲取訂單詳細資料:', error)
      }
    }

    fetchOrderDetails()
  }, [orderId])

  if (!orderDetails) {
    return <p>載入中...</p>
  }

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
