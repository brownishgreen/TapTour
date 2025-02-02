import { React, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
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
  const [imageFile, setImageFile] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [showModal, setShowModal] = useState(false)
  const { userId: currentUserId } = useAuth()

  useEffect(() => {
    if (String(currentUserId) !== String(userId)) {
      setErrorMessage('您無權更改此頁面資訊')
      setShowModal(true)
      setTimeout(() => navigate(`/users/${currentUserId}/profile`), 1000)
      return
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${userId}/profile`, { withCredentials: true })
        const { name, email, bio, image } = response.data.user
        setName(name)
        setEmail(email)
        setBio(bio || '')
        setImage(image || '/assets/images/others/default-avatar.jpg')
      } catch (err) {
        const message = err.response?.data?.message || '無法載入用戶資料'
        setErrorMessage(message)
        setShowModal(true)
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
    setErrorMessage('')
    setShowModal(false)

    let base64Image = ''
    // 附加圖片到 FormData
    if (imageFile) {
      base64Image = await toBase64(imageFile)
    }


    const payload = {
      name,
      password,
      bio,
      image: base64Image
    }

    console.log('payload', payload)
    try {
      // 不需要手動設置 Content-Type，Axios 會自動處理
      const response = await axios.put(
        `http://localhost:3000/api/users/${userId}/update-profile`,
        payload,
        {
          headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
        })
      
      setSuccessMessage('更新成功，即將跳轉...')
      setShowModal(true)
      setTimeout(() => navigate(`/users/${userId}/profile`), 1000)
    } catch (error) {
      const message = error.response?.data?.message || '更新失敗，請稍後再試'
      console.error('提交表單失敗:', message)
      setErrorMessage(message)
      setShowModal(true)
    }
  }

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

  return (
    <div className="profile-edit-form-container">
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

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{successMessage ? '操作成功' : '操作失敗'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{successMessage || errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>確定</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProfileEdit
