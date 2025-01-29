import { useState } from 'react'
import axios from 'axios'

const CreateLocationForm = () => {
  const [name, setName] = useState('') // 地點名稱
  const [placeSuggestions, setPlaceSuggestions] = useState([]) // 地點建議
  const [selectedPlace, setSelectedPlace] = useState(null) // 選中的地點資訊
  const [placeDetails, setPlaceDetails] = useState(null) // Google API 獲取的地點詳細資訊
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
        'http://localhost:3000/api/locations/google/autocomplete',
        {
          params: { input: query }, // 傳入使用者輸入的內容
        }
      )
      setPlaceSuggestions(response.data) // 更新地點建議
    } catch (error) {
      console.error('無法獲取地點建議:', error.message)
    }
  }

  // 獲取地點詳細資訊
  const fetchPlaceDetails = async (placeId) => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/locations/google/details',
        {
          params: { place_id: placeId },
        }
      )
      setPlaceDetails(response.data) // 設置地點詳細資訊
    } catch (error) {
      console.error('無法獲取地點詳細資訊:', error.message)
    }
  }

  // 處理使用者選擇的地點
  const handlePlaceSelect = (place) => {
    const simplifiedName = place.structured_formatting.main_text // 取得簡化的地點名稱
    setSelectedPlace(place)
    setName(simplifiedName)
    setPlaceSuggestions([]) // 清空建議清單
    fetchPlaceDetails(place.place_id) // 獲取地點詳細資訊
  }

  // 提交表單
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!placeDetails) {
      alert('請先選擇一個地點！')
      return
    }

    setLoading(true)

    try {
      // 建立新景點
      const response = await axios.post(
        'http://localhost:3000/api/locations/create',
        {
          name: placeDetails.name,
          googlePlaceId: selectedPlace.place_id,
        }
      )
      setSuccessMessage(`景點「${response.data.location.name}」已成功建立！`)
      setTimeout(() => {
        setSuccessMessage('')
      }, 2000)
      setName('')
      setSelectedPlace(null)
      setPlaceDetails(null)
    } catch (error) {
      setErrorMessage(error.response?.data?.error || '建立景點失敗，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="location-form-container">
      <h2>建立景點</h2>
      <form onSubmit={handleSubmit}>
        {/* 地點名稱輸入框 */}
        <div className="form-group" style={{ position: 'relative' }}>
          <label htmlFor="name" className="form-label">
            地點名稱
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              handlePlaceSearch(e.target.value)
            }}
            placeholder="輸入地點名稱"
            className="form-input"
            required
          />
          {/* 顯示地點建議 */}
          {placeSuggestions.length > 0 && (
            <ul className="suggestions-list">
              {placeSuggestions.map((place) => (
                <li
                  key={place.place_id}
                  onClick={() => handlePlaceSelect(place)}
                  className="suggestion-item"
                >
                  {place.description}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 動態顯示地點詳細資訊 */}
        {placeDetails && (
          <div className="place-details">
            <h3>地點資訊預覽</h3>
            <p>
              <strong>名稱：</strong> {placeDetails.name || '無名稱'}
            </p>
            <p>
              <strong>地址：</strong> {placeDetails?.address || '無地址'}
            </p>
            <p>
              <strong>Google Map：</strong>
              {placeDetails.url ? (
                <a
                  href={placeDetails.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {placeDetails.url}
                </a>
              ) : (
                '無網址'
              )}
            </p>
            <p>
              <strong>營業時間：</strong>
            </p>
            <ul>
              {placeDetails?.opening_hours?.length > 0 ? (
                placeDetails.opening_hours.map((day, index) => (
                  <li key={index}>{day}</li>
                ))
              ) : (
                <p>無營業時間資訊</p>
              )}
            </ul>
            {placeDetails.photos?.length > 0 && (
              <div>
                {placeDetails.photos.map((photoUrl, index) => (
                  <img
                    key={index}
                    src={photoUrl}
                    alt={`地點圖片 ${index + 1}`}
                    style={{
                      maxWidth: '200px',
                      maxHeight: '200px',
                      margin: '5px',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* 提交按鈕 */}
        <button type="submit" disabled={loading} className="form-button">
          {loading ? '建立中...' : '建立景點'}
        </button>
      </form>

      {/* 成功與錯誤訊息 */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  )
}

export default CreateLocationForm
