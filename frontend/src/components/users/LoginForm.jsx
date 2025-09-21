import { useState } from 'react'
import apiClient from '../../api/apiClient'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import SuccessModal from '../modal/SuccessModal'
import ErrorModal from '../modal/ErrorModal'

const LoginForm = () => {
  const { handleAuthSuccess } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!email || !password) {
      setErrorMessage('請填寫所有欄位')
      setShowError(true)
      return
    }
    try {
      const response = await apiClient.post(
        '/users/login',
        {
          email,
          password,
        },
        { withCredentials: true } // 啟用 Cookie 傳輸
      )
      const { userId, isAdmin } = response.data
      // 確保更新 AuthContext 狀態
      handleAuthSuccess(true, userId, isAdmin)
      setPassword('') // 清空密碼欄位，增加用戶安全性
      setSuccessMessage('您已登入成功！即將跳轉畫面')
      setShowSuccess(true)
      setTimeout(() => {
        navigate(`/users/${userId}/profile`)
      }, 1500)
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data.message || '帳號或密碼錯誤')
      } else {
        setErrorMessage('伺服器錯誤，請稍後再試')
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
          <label htmlFor="email" className="form-label">
            信箱
          </label>
          <input
            type="email"
            className="form-input"
            id="email"
            name="email"
            placeholder="請輸入您的信箱"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="form-button">
            登入
          </button>
        </div>
        <div className="form-actions">
          <p className="login-link">
            尚未註冊帳戶？ <a href="/register">由此註冊</a>
          </p>
          <div className="divider">
            <span>或</span>
          </div>
          <button
            className="google-login-button"
            type="button"
            onClick={() => {
              window.location.href = 'http://localhost:3000/api/users/auth/google'
            }}
          >
            <img
              src="/assets/images/Google%20Icon.webp"
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
export default LoginForm
