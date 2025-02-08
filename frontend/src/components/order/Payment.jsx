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
    <div>
      <h3>付款頁面</h3>
      <p>使用者名稱: {userName}</p>
      <p>Email: {userEmail}</p>
      <p>訂單編號: {uuid}</p>
      <p>商品名稱: {item.name}</p>
      <p>商品單價: NT$ {item.price}</p>
      <p>選擇日期: {chosenDate}</p>
      <p>訂單數量: {item.quantity}</p>
      <p>總金額: NT$ {totalAmount}</p>
    </div>
  )
}

export default Payment
