import { useState } from 'react'
import apiClient from '../../api/apiClient'
import SuccessModal from '../modal/SuccessModal'
import ErrorModal from '../modal/ErrorModal'
import { useNavigate } from 'react-router-dom'

const CreateLocationForm = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [placeSuggestions, setPlaceSuggestions] = useState([])
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [placeDetails, setPlaceDetails] = useState(null) //儲存 GoogleAPI 獲取的地點詳細資訊
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false) // btn的加載狀態
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  // 搜尋地點並獲取建議
  const handlePlaceSearch = async (query) => {
    if (!query) {
      setPlaceSuggestions([]) // 若使用者清空輸入框，清空建議
      return
    }

    try {
      const response = await apiClient.get(
        'api/locations/google/autocomplete',
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
      const response = await apiClient.get(
        'locations/google/details',
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
      setErrorMessage('無法獲取地點詳細資訊，請稍後再試')
      setShowError(true)
      return
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
      setErrorMessage('請輸入景點名稱')
      setShowError(true)
      return
    }

    setLoading(true)

    try {
      await apiClient.post('locations/create', {
        name: placeDetails.name,
        googlePlaceId: selectedPlace.place_id,
        description,
      })
      setShowSuccess(true)
      setTimeout(() => navigate('/locations'), 1500)
      setName('')
      setSelectedPlace(null)
      setPlaceDetails(null)
      setDescription('')
    } catch (error) {
      setErrorMessage(error.response?.data?.error || '建立景點失敗，請稍後再試')
      setShowError(true)
      setTimeout(() => setErrorMessage(''), 2000)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async () => {
    navigate(-1)
  }

  const closeAllModals = () => {
    setShowSuccess(false)
    setShowError(false)
  }

  return (
    <div className="location-form-container">
      <h2>建立景點</h2>
      <form onSubmit={handleSubmit}>
        <div className="location-form-group" style={{ position: 'relative' }}>
          <p className="location-p">
            ⨳輸入景點後，會由 GOOGLE 自動帶入相關資料
          </p>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              handlePlaceSearch(e.target.value)
            }}
            placeholder="輸入景點名稱"
            className="location-form-input"
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
            <div className="location-form-group">
              <label htmlFor="description" className="form-label">
                景點描述
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="請輸入景點描述..."
                className="form-textarea"
                rows="4"
              ></textarea>
            </div>
          </div>
        )}
        <div className="form-button-group ">
          <button
            type="button"
            className="form-button cancel-button"
            onClick={handleCancel}
          >
            取消
          </button>

          <button type="submit" disabled={loading} className="form-button">
            {loading ? '建立中...' : '建立景點'}
          </button>
        </div>
      </form>

      {/* 成功訊息的 Modal */}
      <SuccessModal
        show={showSuccess}
        message="恭喜！您已成功創建景點 "
        onClose={closeAllModals}
      />

      {/* 錯誤訊息的 Modal */}
      <ErrorModal
        show={showError}
        message={errorMessage}
        onClose={closeAllModals}
      />
    </div>
  )
}

export default CreateLocationForm
