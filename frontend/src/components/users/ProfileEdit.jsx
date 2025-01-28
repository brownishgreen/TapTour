import { React, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCameraRetro,
  faCheck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const ProfileEdit = () => {
  const navigate = useNavigate()
  const { userId } = useParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [bio, setBio] = useState('')
  const [imageFile, setImageFile] = useState(null) // 儲存選中的圖片文件
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [showModal, setShowModal] = useState(false)
  const { userId: currentUserId } = useAuth()

  useEffect(() => {
    // 檢查是否有權訪問該頁面
    if (String(currentUserId) !== String(userId)) {
      setErrorMessage('您無權更改此頁面資訊')
      setShowModal(true)
      setTimeout(() => {
        navigate(`/users/${currentUserId}/profile`)
      }, 1000)
      return
    }

    // 初始化表單數據
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${userId}/profile`,
          {
            withCredentials: true, // 攜帶驗證資訊
          }
        )
        const { name, email, bio, image } = response.data.user
        setName(name)
        setEmail(email)
        setBio(bio || '')
        setImage(image || '/assets/images/others/default-avatar.jpg')
      } catch (err) {
        setErrorMessage('無法載入用戶資料')
        setShowModal(true)
      }
    }

    fetchUserData()
  }, [currentUserId, userId, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'password') {
      setPassword(value)
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value)
    } else if (name === 'name') {
      setName(value)
    } else if (name === 'bio') {
      setBio(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setShowModal(false)

    if (password && password !== confirmPassword) {
      setErrorMessage('密碼與確認密碼不一致')
      setShowModal(true)
      return
    }

    const submittedBio = bio === '請輸入您的個人簡介...' ? '' : bio
    const formData = new FormData()
    formData.append('name', name)
    formData.append('password', password)
    formData.append('confirmPassword', confirmPassword)
    formData.append('bio', submittedBio)

    if (imageFile) {
      formData.append('image', imageFile)
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/${userId}/update-profile`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true, // 携带验证信息
        }
      )
      setImage(response.data.user.image)
      setSuccessMessage('更新成功，即將跳轉...')
      setShowModal(true)
      setTimeout(() => {
        navigate(`/users/${userId}/profile`)
      }, 1000)
    } catch (error) {
      setErrorMessage('更新失敗')
      setShowModal(true)
    }
  }

  return (
    <div className="profile-edit-form-container">
      <div className="profile-edit-avatar">
        <img
          src={image ? image : '/assets/images/others/default-avatar.jpg'} // 替換大頭貼路徑
          alt="大頭貼"
          className="profile-avatar"
        />
        <span
          className="change-picture-btn"
          onClick={() => {
            document.getElementById('fileInput').click()
          }}
        >
          <FontAwesomeIcon icon={faCameraRetro} className="change-picture" />
        </span>
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          accept='"image/*'
          onChange={(e) => {
            const file = e.target.files[0]
            if (file) {
              setImage(URL.createObjectURL(file))
              setImageFile(file)
            }
          }}
        />
      </div>
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
            value={name}
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
            disabled
            value={email}
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
            placeholder="請輸入您要修改的密碼"
            value={password}
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
            placeholder="請再次輸入您要修改的密碼"
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
            placeholder="請輸入您的個人簡介..."
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
      {/* 資料修改成功、失敗提示訊息 */}
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

export default ProfileEdit
