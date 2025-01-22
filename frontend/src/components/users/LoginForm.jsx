import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'


const LoginForm = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setShowModal(false)

    if (!email || !password) {
      setErrorMessage('請填寫所有欄位')
      setShowModal(true)
      return
    }
    try {
      const response = await axios.post(
        'http://localhost:3000/api/user/login',
        {
          email,
          password,
        },
        { withCredentials: true } // 啟用 Cookie 傳輸
      )
      setPassword('') // 清空密碼欄位，增加用戶安全性

      setSuccessMessage('登入成功！即將跳轉...')
      setShowModal(true)
      setTimeout(() => {
        navigate('/profile')
      }, 1000) // 2 秒後跳轉個人檔案
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data.message || '帳號或密碼錯誤')
      } else {
        setErrorMessage('伺服器錯誤，請稍後再試')
      }
      setShowModal(true)
    }
  }

  return (
    <div className="form-container">
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
          <button className="google-login-button">
            <img
              src="../public/assets/images/icons/google-icon.svg"
              alt="Google Logo"
              className="google-icon"
            />
            使用 Google 帳號登入
          </button>
        </div>
      </form>
      {/* 登入提示訊息 */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="modal-title-container">
              {successMessage ? (
                <>
                  <FontAwesomeIcon icon={faCheck} className="success-icon" />
                  <span>操作成功</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faXmark} className="error-icon" />
                  <span>操作失敗</span>
                </>
              )}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className={successMessage ? 'modal-body-success' : 'modal-body-error'}
        >
          {successMessage || errorMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            className="modal-btn"
          >
            確定
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default LoginForm
