import React, { useState } from 'react'
import axios from 'axios'

const CreateLocation = () => {
  const [name, setName] = useState('') // 地點名稱
  const [placeSuggestions, setPlaceSuggestions] = useState([]) // 地點建議
  const [selectedPlace, setSelectedPlace] = useState(null) // 選中的地點資訊
  const [image, setImage] = useState('') // 圖片 URL
  const [loading, setLoading] = useState(false) // 加載狀態
  const [successMessage, setSuccessMessage] = useState('') // 成功訊息
  const [errorMessage, setErrorMessage] = useState('') // 錯誤訊息

  // 搜尋地點
  const handlePlaceSearch = async (query) => {
    if (!query) {
      setPlaceSuggestions([])
      return
    }

    try {
      const response = await axios.get(
        'http://localhost:3000/api/locations/autocomplete',
        {
          params: { input: query }, // 傳送使用者輸入到後端
        }
      )
      setPlaceSuggestions(response.data) // 更新地點建議
    } catch (error) {
      console.error('無法獲取地點建議:', error.message)
    }
  }

  // 選擇地點
  const handlePlaceSelect = (place) => {
    setSelectedPlace(place) // 設定選中的地點
    setName(place.description) // 更新名稱輸入框
    setPlaceSuggestions([]) // 清空建議清單
  }

  // 提交表單
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedPlace) {
      alert('請選擇一個地點！')
      return
    }

    setLoading(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      const response = await axios.post(
        'http://localhost:3000/api/locations/create',
        {
          name: selectedPlace.description, // 使用選定的地點名稱
          googlePlaceId: selectedPlace.place_id, // 使用選定的地點 ID
          image, // 圖片 URL
        }
      )
      setSuccessMessage(`景點「${response.data.location.name}」已成功建立！`)
      setName('')
      setSelectedPlace(null)
      setImage('')
    } catch (error) {
      setErrorMessage(error.response?.data?.error || '建立景點失敗，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h2>建立景點</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            景點名稱
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              handlePlaceSearch(e.target.value) // 搜尋地點建議
            }}
            placeholder="輸入地點名稱"
            className="form-input"
            required
          />
          {/* 顯示地點建議 */}
          {placeSuggestions.length > 0 && (
            <ul
              style={{
                border: '1px solid #ccc',
                padding: 0,
                listStyleType: 'none',
                margin: 0,
              }}
            >
              {placeSuggestions.map((place) => (
                <li
                  key={place.place_id}
                  onClick={() => handlePlaceSelect(place)}
                  style={{ padding: '5px', cursor: 'pointer' }}
                >
                  {place.description}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label className="form-label">圖片 URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="form-input"
            placeholder="輸入圖片網址"
          />
        </div>
        <button type="submit" disabled={loading} className="form-button">
          {loading ? '建立中...' : '建立景點'}
        </button>
      </form>

      {/* 成功與錯誤訊息 */}
      {successMessage && (
        <p style={{ color: 'green', margin: '2rem' }}>{successMessage}</p>
      )}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  )
}

export default CreateLocation
