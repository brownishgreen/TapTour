import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiClient from '../../api/apiClient'
import SuccessModal from '../modal/SuccessModal'
import ErrorModal from '../modal/ErrorModal'

const EditLocationForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    openingHours: '',
  })

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
        } = response.data.location || {}
        setFormData({
          name,
          description,
          openingHours: opening_hours,
          address,
        })
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch location data:', err)
        setLoading(false)
      }
    }

    fetchLocationData()
  }, [id])

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
      <h2>編輯地點資訊</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            地點名稱
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ''} // 防止 undefined
            onChange={handleInputChange}
            placeholder="輸入地點名稱"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address" className="form-label">
            地址
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
            描述
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
        message="您已成功更新景點！"
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
