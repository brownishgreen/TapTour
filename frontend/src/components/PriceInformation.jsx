import { useState } from 'react'
import apiClient from '../api/apiClient'
import { useNavigate } from 'react-router-dom'

const PriceInformation = ({ price, productId, activityId, user }) => {
  const navigate = useNavigate()
  const [date, setDate] = useState('')
  const [people, setPeople] = useState(1)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleBooking = async () => {
    if (!user || !user.id) {
      setMessage('請先登入後再進行預訂。')
      return
    }

    if (!date || people < 1) {
      setMessage('請選擇日期並填寫人數')
      return
    }

    setLoading(true)
    setMessage('')

    // 動態組裝 productIds 和 activityIds
    const productIds = productId ? [productId] : []
    const activityIds = activityId ? [activityId] : []
    if (!productIds.length && !activityIds.length) {
      setMessage('請至少選擇一個產品或活動。')
      return
    }

    try {
      const response = await apiClient.post('api/orders/create', {
        userId: user.id,
        productIds,
        activityIds,
        total_amount: price * people,
        chosen_date: date,
        quantities: Array(productIds.length + activityIds.length).fill(people),
      })

      console.log('成功建立訂單:', response)
      setMessage('訂單建立成功!')
      const orderId = response.data.orderId // 從後端獲取訂單 ID
      navigate(`/payment/${orderId}`) // 跳轉到付款頁面
    } catch (error) {
      console.error('訂單建立失敗:', error)
      setMessage('訂單建立失敗，請稍後再試')
      alert('無法完成訂單，請稍後再試。')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="price-information">
      <div className="price-information__container">
        <div className="price-information__price">NT$ {price} 起</div>
        <div className="price-information__description">
          <p className="price-information__description-title">
            每名成人（價格依人數而有不同）
          </p>
          <div className="price-information__description-content">
            <div className="price-information__description-content-title">
              選擇日期
              <br />
            </div>
            <input
              type="date"
              className="price-information__date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <br />
            <div className="price-information__description-content-title">
              選擇人數
              <br />
            </div>
            <input
              type="number"
              style={{ width: '45px' }}
              max="5"
              min="1"
              placeholder="1"
              value={people}
              onChange={(e) => setPeople(parseInt(e.target.value, 10) || 1)}
            />{' '}
            人
            <br />
            <div className="price-information__description-content-note">
              免費取消，活動前1日隨時取消並獲全額退款。
              <br />
              先預訂後付款！確保名額同時保有彈性。
            </div>
          </div>
          <button
            className="price-information__button primary-button"
            onClick={handleBooking}
            disabled={loading}
          >
            立即預訂
          </button>
        </div>
      </div>
    </div>
  )
}

export default PriceInformation
