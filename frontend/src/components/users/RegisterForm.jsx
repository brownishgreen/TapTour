import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
const RegisterForm = () => {
  const [showModal, setShowModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({ // 初始化表單資料 用來儲存表單資料
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target // 取得表單元素的 name 和 value
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    //驗證必填欄位
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessage('請填寫所有必填欄位')
      setShowModal(true)
      return
    }
    // 密碼長度驗證
    if (formData.password.length < 8) {
      setErrorMessage('密碼至少需要8個字元')
      setShowModal(true)
      return
    }
    // 密碼和確認密碼不相符
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('密碼和確認密碼不相符')
      setShowModal(true)
      return
    }
    console.log(formData)
    //這裡要寫註冊的API 發送API請求
    try {
      const response = await axios.post('http://localhost:3000/api/user/register', formData)
      console.log(response.data)
      setSuccessMessage('註冊成功！即將跳轉...')
      setShowModal(true)
      setTimeout(() => {
        window.location.href = '/profile'
      }, 2000) // 2 秒後跳轉個人檔案
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || '註冊失敗')
      } else {
        setErrorMessage('註冊失敗')
      }
      setShowModal(true)
    }
  }

  return (
    <div className="form-container">
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
      {/* 訊息彈窗 */}
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
        <Modal.Body className={successMessage ? 'modal-body-success' : 'modal-body-error'}>
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

export default RegisterForm
