import { useState } from 'react'
import apiClient from '../../api/apiClient'
import { useNavigate } from 'react-router-dom'
import SuccessModal from '../modal/SuccessModal'
import ErrorModal from '../modal/ErrorModal'

const RegisterForm = () => {
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    // 初始化表單資料 用來儲存表單資料
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target // 取得表單元素的 name 和 value
    setFormData({ ...formData, [name]: value })
  }

  const handleGoogleSubmit = async () => {
    try {
      const response = await apiClient.get('/api/users/auth/google')
      console.log(response)
    } catch (error) {
      console.error('註冊失敗', error)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    //驗證必填欄位
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setErrorMessage('請填寫所有必填欄位')
      setShowError(true)
      return
    }
    // 密碼長度驗證
    if (formData.password.length < 8) {
      setErrorMessage('密碼至少需要8個字元')
      setShowError(true)
      return
    }
    // 密碼和確認密碼不相符
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('密碼和確認密碼不相符')
      setShowError(true)
      return
    }
    try {
      await apiClient.post('api/users/register', formData)
      setSuccessMessage('您已註冊成功，即將跳轉畫面')
      setShowSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || '註冊失敗')
      } else {
        setErrorMessage('註冊失敗')
      }
      setShowError(true)
    }
  }

  const closeAllModals = () => {
    setShowSuccess(false)
    setShowError(false)
  }

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            名稱
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            placeholder="請輸入您的名稱"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            信箱
          </label>
          <input
            type="email"
            className="form-input"
            id="email"
            name="email"
            placeholder="請輸入您的信箱"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            密碼
          </label>
          <input
            type="password"
            className="form-input"
            id="password"
            name="password"
            placeholder="請輸入您的密碼"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            確認密碼
          </label>
          <input
            type="password"
            className="form-input"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="請再次輸入您的密碼"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" className="form-button">
            註冊
          </button>
        </div>
        <div className="form-actions">
          <p className="login-link">
            已有帳戶？ <a href="/login">由此登入</a>
          </p>
          <div className="divider">
            <span>或</span>
          </div>
          <button
            className="google-login-button"
            type="button"
            onClick={() => {
              window.location.href =
                'https://taptour-backend.yuanologue.com/api/users/auth/google'
            }}
          >
            <img
              src="https://storage.googleapis.com/taptour/assets/images/Google%20Icon.webp"
              alt="Google Logo"
              className="google-icon"
              style={{ width: '30px', height: '30px' }}
            />
            使用 Google 帳號登入
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

export default RegisterForm
