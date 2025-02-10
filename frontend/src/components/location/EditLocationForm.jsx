import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiClient from '../../api/apiClient'
import SuccessModal from '../modal/SuccessModal'
import ErrorModal from '../modal/ErrorModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const EditLocationForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    openingHours: '',
  })
  const [images, setImages] = useState([])
  const [mainImageId, setMainImageId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  // 獲取景點數據
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        setLoading(true)
        const response = await apiClient.get(`/api/locations/${id}`)
        const {
          name = '',
          description = '',
          opening_hours = '',
          address = '',
          main_image_id = null,
        } = response.data.location || {}
        setFormData({
          name,
          description,
          openingHours: opening_hours,
          address,
        })
        setMainImageId(main_image_id) // 設置主要圖片 ID

        // 獲取圖片數據
        const imageResponse = await apiClient.get(`/api/locations/${id}/images`)
        setImages(imageResponse.data)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch location data:', err)
        setLoading(false)
      }
    }

    fetchLocationData()
  }, [id])

  const handleSetMainImage = async (imageId) => {
    try {
      await apiClient.patch(`/api/locations/${id}/main-image`, {
        main_image_id: imageId,
      })
      setMainImageId(imageId) // 更新主要圖片 ID
    } catch (err) {
      console.error('Failed to set main image:', err)
      setShowError(true)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (loading) return
    setLoading(true)

    try {
      const response = await apiClient.put(`/api/locations/${id}`, {
        ...formData,
        opening_hours: formData.openingHours,
      })

      if (response.status === 200) {
        setShowSuccess(true)
        setTimeout(() => {
          navigate(`/locations/${id}`)
        }, 1000)
      } else {
        throw new Error('更新失敗，伺服器回傳錯誤。')
      }
    } catch (err) {
      console.error('更新失敗:', err)
      setShowError(true)
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
      <h2>編輯景點資訊</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            景點名稱
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ''} // 防止 undefined
            onChange={handleInputChange}
            placeholder="輸入景點名稱"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address" className="form-label">
            景點地址
          </label>
          <input
            type="text"
            name="address"
            value={formData.address || ''} // 防止 undefined
            onChange={handleInputChange}
            placeholder="輸入地址"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            景點描述
          </label>
          <textarea
            name="description"
            value={formData.description || ''} // 防止 undefined
            onChange={handleInputChange}
            placeholder="輸入描述"
            className="form-textarea"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="openingHours" className="form-label">
            營業時間
          </label>
          <input
            type="text"
            name="openingHours"
            value={formData.openingHours || ''} // 防止 undefined
            onChange={handleInputChange}
            placeholder="輸入營業時間"
            className="form-input"
            required
          />
        </div>
        {/* image */}
        <h2 style={{ marginTop: '3rem', fontSize: '26px' }}>選擇主要圖片</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            margin: '1rem 0 3rem 0',
          }}
        >
          {images.map((image) => (
            <div key={image.id} style={{ position: 'relative' }}>
              <img
                src={`${apiClient.defaults.baseURL.replace(/\/$/, '')}${image.image_url}`}
                alt="圖片"
                style={{
                  width: '150px',
                  height: '100px',
                  border:
                    image.id === mainImageId
                      ? '5px solid red'
                      : '1px solid gray',
                  cursor: 'pointer',
                }}
                onClick={() => handleSetMainImage(image.id)}
              />
              {image.id === mainImageId && (
                <span
                  style={{
                    position: 'absolute',
                    left: '5px',
                    backgroundColor: 'red',
                    color: 'white',
                    fontWeight: '800',
                    padding: '2px 5px',
                    fontSize: '18px',
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              )}
            </div>
          ))}
        </div>
        {/* btn */}
        <div className="form-button-group ">
          <button
            type="button"
            className="form-button cancel-button"
            onClick={handleCancel}
          >
            取消
          </button>
          <button type="submit" className="form-button" disabled={loading}>
            {loading ? '提交中...' : '確認修改'}
          </button>
        </div>
      </form>
      <SuccessModal
        show={showSuccess}
        message="您已成功更新！"
        onClose={closeAllModals}
      />
      <ErrorModal
        show={showError}
        message="更新失敗，請稍後再試。"
        onClose={closeAllModals}
      />
    </div>
  )
}

export default EditLocationForm
