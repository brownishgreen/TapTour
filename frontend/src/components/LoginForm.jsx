import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!email || !password) {
      setErrorMessage('請填寫所有欄位')
      setShowModal(true)
      return
    }
    try {
      const response = await fetch('http://localhost:3000/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // 啟用 Cookie 傳輸
      })

      if (!response.ok) {
        const errorData = await response.json()
        setErrorMessage(errorData.message || '登入失敗')
        setShowModal(true)
        return
      }

      const data = await response.json()
      console.log('登入成功', data)
    } catch (error) {
      setErrorMessage('伺服器錯誤，請稍後再試')
      setShowModal(true)
      console.error('錯誤：', error)
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
            尚未註冊帳戶？ <a href="/signup">由此註冊</a>
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
      {/* 錯誤訊息彈窗 */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>TapTour 登入流程提示</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            確定
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default RegisterForm
