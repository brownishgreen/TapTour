import { React, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProfileEdit = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [bio, setBio] = useState('')
  const [message, setMessage] = useState('')
  const [imageFile, setImageFile] = useState(null) // 儲存選中的圖片文件

  useEffect(() => {
    const userData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/user/profile',
          {
            withCredentials: true, // 攜帶驗證資訊
          }
        )
        // 從後端回傳的資料中初始化表單數據
        const { name, email, bio, image } = response.data.user
        setName(name)
        setEmail(email)
        setBio(bio || '')
        setImage(
          image ? image : '../public/assets/images/others/default-avatar.jpg'
        )
      } catch (err) {
        setMessage('無法載入用戶資料')
      }
    }
    userData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    // 獲取觸發事件的欄位名稱和輸入值
    if (name === 'password') {
      // 如果欄位名稱是 password
      setPassword(value) // 更新 password 狀態
      if (confirmPassword && value !== confirmPassword) {
        setMessage('密碼與確認密碼不一致')
      } else {
        setMessage('')
      }
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value)
      if (password && value !== password) {
        setMessage('密碼與確認密碼不一致')
      } else {
        setMessage('')
      }
    } else {
      // 動態處理其他需要更新的欄位（如 name、bio）
      if (name === 'name') {
        setName(value)
      } else if (name === 'bio') {
        setBio(value)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const submittedBio = bio === '請輸入您的個人簡介...' ? '' : bio

    const formData = new FormData()
    formData.append('name', name)
    formData.append('password', password)
    formData.append('confirmPassword', confirmPassword)
    formData.append('bio', submittedBio)

    if (imageFile) {
      // 如果用戶選擇了新圖片，才上傳
      formData.append('image', imageFile)
    }

    try {
      const response = await axios.put(
        'http://localhost:3000/api/user/update-profile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true, // 攜帶驗證資訊
        }
      )
      setImage(response.data.user.image)
      navigate('/profile')
      setMessage(response.data.message)
    } catch (error) {
      setMessage(error.response?.data?.message || '更新失敗')
    }
  }

  return (
    <div className="profile-edit-form-container">
      <div className="profile-edit-avatar">
        <img
          src={
            image ? image : '../public/assets/images/others/default-avatar.jpg'
          } // 替換大頭貼路徑
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
        <div>
          <button
            type="button"
            className="form-button cancel-button"
            onClick={() => navigate('/profile')} // 返回個人檔案頁面
          >
            取消
          </button>
          <button type="submit" className="form-button">
            確認修改
          </button>
        </div>
      </form>
      {/* 等資料串接好，之後會顯示訊息彈窗 */}
    </div>
  )
}

export default ProfileEdit
