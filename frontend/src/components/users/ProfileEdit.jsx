import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'
import apiClient from '../../api/apiClient'
import { useAuth } from '../context/AuthContext'
import SuccessModal from '../modal/SuccessModal'
import ErrorModal from '../modal/ErrorModal'

const ProfileEdit = () => {
  const navigate = useNavigate()
  const { userId } = useParams()
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [bio, setBio] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const { userId: currentUserId } = useAuth()

  useEffect(() => {
    if (String(currentUserId) !== String(userId)) {
      setErrorMessage('您無權更改此頁面資訊')
      setShowError(true)
      setTimeout(() => navigate(`/users/${currentUserId}/profile`), 1000)
      return
    }

    const fetchUserData = async () => {
      try {
        const response = await apiClient.get(`api/users/${userId}/profile`)
        const { name, bio, image } = response.data.user
        setName(name)
        setBio(bio || '')
        setImage(image || '/assets/images/others/default-avatar.jpg')
      } catch (err) {
        const message = err.response?.data?.message || '無法載入用戶資料'
        setErrorMessage(message)
        setShowError(true)
      }
    }

    fetchUserData()
  }, [currentUserId, userId, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'password') setPassword(value)
    else if (name === 'confirmPassword') setConfirmPassword(value)
    else if (name === 'name') setName(value)
    else if (name === 'bio') setBio(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password && password !== confirmPassword) {
      setErrorMessage('密碼與確認密碼不一致')
      setShowError(true)
      return
    }

    if (password && password.length < 8) {
      setErrorMessage('密碼至少需要8個字元')
      setShowError(true)
      return
    }
    
    const formData = new FormData()
    formData.append('name', name)
    formData.append('password', password)
    formData.append('bio', bio)
    
    if (imageFile) {
      formData.append('avatar', imageFile)
    }

    console.log('formData', formData)
    try {
      // 不需要手動設置 Content-Type，Axios 會自動處理
      await apiClient.put(`api/users/${userId}/update-profile`, formData)

      setSuccessMessage('更新成功，即將跳轉...')
      setShowSuccess(true)
      setTimeout(() => navigate(`/users/${userId}/profile`), 1500)
    } catch (error) {
      setErrorMessage(error.response?.data?.message || '更新失敗，請稍後再試')
      setShowError(true)
    }
  }

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
    })

  const closeAllModals = () => {
    setShowSuccess(false)
    setShowError(false)
  }

  return (
    <div className="profile-edit-form-container form-container ">
      <div className="profile-edit-avatar">
        <img src={image} alt="大頭貼" className="profile-avatar" />
        <span
          className="change-picture-btn"
          onClick={() => document.getElementById('fileInput').click()}
        >
          <FontAwesomeIcon icon={faCameraRetro} className="change-picture" />
        </span>
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0]
            if (
              file &&
              file.size <= 5 * 1024 * 1024 &&
              file.type.startsWith('image/')
            ) {
              setImage(URL.createObjectURL(file))
              setImageFile(file)
            } else {
              alert('請上傳小於 5MB 且為正確格式的圖片')
            }
          }}
        />
      </div>

      <form onSubmit={handleSubmit}>
        {/* 表單輸入 */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            名稱
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            value={name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            密碼
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            placeholder="輸入新密碼"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            確認密碼
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-input"
            placeholder="再次輸入密碼"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio" className="form-label">
            個人簡介
          </label>
          <textarea
            id="bio"
            name="bio"
            className="form-input"
            value={bio}
            onChange={handleChange}
            rows="5"
          />
        </div>

        <div className="form-button-group">
          <button
            type="button"
            className="form-button cancel-button"
            onClick={() => navigate(`/users/${userId}/profile`)} // 返回個人檔案頁面
          >
            取消
          </button>

          <button type="submit" className="form-button">
            確認修改
          </button>
        </div>
      </form>

      <SuccessModal
        show={showSuccess}
        message={successMessage}
        onClose={closeAllModals}
      />

      <ErrorModal
        show={showError}
        message={errorMessage}
        onClose={closeAllModals}
      />
    </div>
  )
}

export default ProfileEdit
