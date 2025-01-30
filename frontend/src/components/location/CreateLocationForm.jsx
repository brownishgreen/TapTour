import { useState } from 'react'
import axios from 'axios'

const CreateLocationForm = () => {
  const [name, setName] = useState('')
  const [placeSuggestions, setPlaceSuggestions] = useState([])
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [placeDetails, setPlaceDetails] = useState(null) //儲存 GoogleAPI 獲取的地點詳細資訊
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false) // btn的加載狀態
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // 搜尋地點並獲取建議
  const handlePlaceSearch = async (query) => {
    if (!query) {
      setPlaceSuggestions([]) // 若使用者清空輸入框，清空建議
      return
    }

    try {
      const response = await axios.get(
        'http://localhost:3000/api/locations/google/autocomplete',
        { params: { input: query } } // 將使用者輸入作為參數
      )
      setPlaceSuggestions(response.data) // 輸入後會更新地點建議列表
    } catch (error) {
      console.error('無法獲取地點建議:', error.message)
    }
  }

  // 獲取地點詳細資訊
  const fetchPlaceDetails = async (placeId) => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/locations/google/details',
        { params: { place_id: placeId } } // 根據 placeId 獲取詳細資訊
      )
      const place = response.data

      // 清理地址格式
      const cleanedAddress = place.address?.replace(/\s[\w+]+$/, '') || '無地址'

      setPlaceDetails({
        ...place,
        address: cleanedAddress,
      })
    } catch (error) {
      console.error('無法獲取地點詳細資訊:', error.message)
      setErrorMessage('無法獲取地點詳細資訊，請稍後再試')
      setTimeout(() => setErrorMessage(''), 3000)
    }
  }

  // 使用者選擇地點後會處理的事
  const handlePlaceSelect = (place) => {
    const simplifiedName = place.structured_formatting.main_text //簡化地點名稱
    setSelectedPlace(place)
    setName(simplifiedName)
    setPlaceSuggestions([])
    fetchPlaceDetails(place.place_id) // 獲取選定地點的詳細資訊
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!placeDetails) {
      alert('請先選擇一個地點！')
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(
        'http://localhost:3000/api/locations/create',
        {
          name: placeDetails.name,
          googlePlaceId: selectedPlace.place_id,
          description,
        }
      )
      setSuccessMessage(`景點「${response.data.location.name}」已成功建立！`)
      setTimeout(() => setSuccessMessage(''), 2000)
      setName('')
      setSelectedPlace(null)
      setPlaceDetails(null)
      setDescription('')
    } catch (error) {
      setErrorMessage(error.response?.data?.error || '建立景點失敗，請稍後再試')
      setTimeout(() => setErrorMessage(''), 2000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="location-form-container">
      <h2>建立景點</h2>
      <form onSubmit={handleSubmit}>
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

        {placeDetails && (
          <div className="place-details">
            <h3>地點資訊預覽</h3>
            <p>
              <strong>名稱：</strong> {placeDetails.name || '無名稱'}
            </p>
            <p>
              <strong>地址：</strong> {placeDetails.address}
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
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                地點描述
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="輸入地點描述"
                className="form-input"
                rows="4"
              ></textarea>
            </div>
          </div>
        )}

        <button type="submit" disabled={loading} className="form-button">
          {loading ? '建立中...' : '建立景點'}
        </button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  )
}

export default CreateLocationForm
