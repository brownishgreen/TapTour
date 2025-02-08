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
          <label className="payment-form-label">使用者名稱:</label>
          <input
            className="payment-form-input"
            type="text"
            value={userName}
            disabled
          />
        </div>
        <div className="form-group">
          <label className="payment-form-label">Email: </label>
          <input
            className="payment-form-input"
            type="email"
            value={userEmail}
            disabled
          />
        </div>
        <div className="form-group">
          <label className="payment-form-label">訂單編號: </label>
          <input
            className="payment-form-input"
            type="text"
            value={uuid}
            disabled
          />
        </div>
        <div className="form-group">
          <label className="payment-form-label">商品名稱: </label>
          <input
            className="payment-form-input"
            type="text"
            value={item.name}
            disabled
          />
        </div>
        <div className="form-group">
          <label className="payment-form-label">商品單價: </label>
          <input
            className="payment-form-input"
            type="text"
            value={`NT$ ${item.price}`}
            disabled
          />
        </div>
        <div className="form-group">
          <label className="payment-form-label">選擇日期: </label>
          <input
            className="payment-form-input"
            type="text"
            value={chosenDate}
            disabled
          />
        </div>
        <div className="form-group">
          <label className="payment-form-label">訂單數量: </label>
          <input
            className="payment-form-input"
            type="number"
            value={item.quantity}
            disabled
          />
        </div>
        <div className="form-group">
          <label className="payment-form-label">總金額: </label>
          <input
            className="payment-form-input"
            type="text"
            value={`NT$ ${totalAmount}`}
            disabled
          />
        </div>
        <div className="form-group">
          <label className="payment-form-label">信用卡資訊: </label>
          <input
            className="payment-form-input"
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
