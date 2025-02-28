import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import apiClient from '../../api/apiClient'
import SuccessModal from '../modal/SuccessModal'
import ErrorModal from '../modal/ErrorModal'

const ActivityForm = ({ mode }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const activityId = Number(id) || null
  const isEditMode = mode === 'edit' // 判斷模式
  const [categories, setCategories] = useState([])
  const [locations, setLocations] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    time_duration: '',
    category_id: '',
    location_id: '',
    images: [],
  })
  // Modal 狀態
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // 如果 mode 是 edit，則從後端獲取活動資料
  useEffect(() => {
    if (isEditMode && activityId) {
      console.log('Fetching data for edit mode with id:', activityId)
      apiClient
        .get(`api/activities/${activityId}`)
        .then((response) => setFormData(response.data))
        .catch((error) => console.error('獲取活動資料失敗', error))
    }
  }, [isEditMode, activityId])

  // 獲取所有分類
  useEffect(() => {
    apiClient
      .get('api/categories')
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('獲取分類資料失敗', error))
  }, [])

  // 獲取所有景點
  useEffect(() => {
    apiClient
      .get('api/locations')
      .then((response) => setLocations(response.data.locations))
      .catch((error) => console.error('獲取景點資料失敗', error))
  }, [])

  //更新表單資料
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: ['price', 'category_id', 'time_duration', 'location_id'].includes(
        name
      )
        ? Number(value) || 0
        : value,
    }))
  }
  // 處理圖片上傳
  const handleImageChange = (event) => {
    //只接受圖片格式
    const newFiles = Array.from(event.target.files).filter((file) =>
      file.type.startsWith('image/')
    )

    if (formData.images.length + newFiles.length > 5) {
      setErrorMessage('最多只能上傳 5 張圖片')
      setShowError(true)
      return
    }

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newFiles], // 更新圖片到 formData
    }))
  }

  const validationForm = () => {
    const requiredFields = [
      'name',
      'price',
      'location_id',
      'description',
      'category_id',
      'time_duration',
    ]
    for (const field of requiredFields) {
      if (!formData[field]?.toString().trim()) {
        setErrorMessage('請填寫所有欄位')
        setShowError(true)
        return
      }
    }
    if (formData.images.length === 0) {
      setErrorMessage('請至少傳一張照片')
      setShowError(true)
      return 
    }
    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('提交表單時的資料', formData)

    if (!validationForm()) {
      console.log('表單驗證失敗')
      return
    }

    const data = new FormData()
    Object.keys(formData).forEach((key) => {
      if (key === 'images') {
        //逐一上傳圖片
        formData.images.forEach((image) => {
          data.append('images', image)
        })
      } else if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key])
      }
    })

    console.log(' Submitting FormData', Array.from(data.entries()))

    try {
      const url = isEditMode
        ? `${apiClient.defaults.baseURL}/api/activities/${activityId}`
        : `${apiClient.defaults.baseURL}/api/activities`
      const method = isEditMode ? 'put' : 'post'
      const response = await apiClient({
        method,
        url,
        data
      })
      console.log('Server Response:', response.data)
      setSuccessMessage(`${isEditMode ? '活動更新' : '建立活動'}成功`)
      setShowSuccess(true)

      setTimeout(() => {
        const redirectPath = isEditMode
          ? `/activities/${activityId}`
          : '/activities'
        navigate(redirectPath)
      }, 3000)
    } catch (error) {
      console.error('錯誤:', error.response || error.message)
      console.error('錯誤詳細資訊:', error.response?.data)
      setErrorMessage(`${isEditMode ? '活動更新' : '活動建立'}失敗，請檢查錯誤`)
      setShowError(true)
    }
  }

  const closeAllModals = () => {
    setShowSuccess(false)
    setShowError(false)
  }
  return (
    <form className="activity-form" onSubmit={handleSubmit}>
      <div className="activity-form__form">
        <h1>{mode === 'edit' ? '編輯活動' : '新增活動'}</h1>
        <div className="activity-form__form-item">
          <div className="activity-form__category">

            <label htmlFor="category_id" style={{ marginBottom: '10px' }}>
              活動類別
            </label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
            >
              <option value="">請選擇活動類別</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <label htmlFor="name">活動名稱</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || ''}
            onChange={handleInputChange}
          />

          <label htmlFor="time_duration">活動所需時間</label>
          <input
            type="text"
            id="time_duration"
            value={formData.time_duration || ''}
            name="time_duration"
            onChange={handleInputChange}
          />

          <label htmlFor="price">活動單價</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price || ''}
            onChange={handleInputChange}
          />

          <label htmlFor="location_id">活動所在景點</label>
          <select
            id="location_id"
            name="location_id"
            value={formData.location_id}
            onChange={handleInputChange}
          >
            <option value="">請選擇景點</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>

          <label htmlFor="description">活動介紹</label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleInputChange}
          />

          <div className="activity-form__image-upload">
            <label htmlFor="images">活動圖片（最多 5 張）</label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </div>
          <div className="activity-form__form-item-button">
            <button
              className="activity-form__form-item-button-cancel"
              type="button"
              onClick={() => navigate('/activities')}
            >
              取消
            </button>
            <button type="submit">
              {isEditMode ? '更新活動' : '新增活動'}
            </button>
          </div>
        </div>
      </div>

      {/* 成功訊息的 Modal */}
      <SuccessModal
        show={showSuccess}
        message={successMessage}
        onClose={closeAllModals}
      />

      {/* 錯誤訊息的 Modal */}
      <ErrorModal
        show={showError}
        message={errorMessage}
        onClose={closeAllModals}
      />
    </form>
  )
}

export default ActivityForm