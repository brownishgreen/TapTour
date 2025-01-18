import { React, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart,
  faPen,
  faStreetView,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'

const ProfileInfo = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/user/profile',
          {
            withCredentials: true,
          }
        )
        setUser(response.data.user)
      } catch (err) {
        setError('無法載入用戶資料')
      } finally {
        setLoading(false) // 加載完成
      }
    }
    userData()
  }, [])

  if (loading) {
    return <div>載入中...</div>
  }

  if (error) {
    return <div>{error}</div>
  }
  const handleEditProfile = () => {
    window.location.href = '/profile/edit'
  }
  return (
    <div className="profile-wrapper">
      <div className="profile-info">
        <div className="profile-avatar">
          {/* 預設大頭貼 */}
          <img
            src="../public/assets/images/others/default-avatar.jpg"
            alt="預設大頭貼"
            className="default-avatar"
          />
        </div>
        <div className="profile-details">
          <p>姓名: {user.name}</p>
          <p>信箱: {user.email}</p>
          <p>註冊日期: {user.createdAt.split('T')[0]}</p>
          <p>個人簡介 {user.bio}</p>
          <textarea name="" id=""></textarea>
          {/* <textarea value={bio} readOnly /> */}
        </div>
        <div>
          <button className="follow-btn">
            追蹤我
            <FontAwesomeIcon icon={faHeart} className="icon" />
          </button>
          <button className="profile-btn" onClick={handleEditProfile}>
            編輯個人檔案
          </button>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-content__comments">
          <h5 className="profile-content__comments-title">
            最新評論
            <FontAwesomeIcon icon={faPen} className="icon" />
          </h5>
          <div className="profile-content__comment-box"></div>
        </div>
        <div className="profile-content__activities">
          <h5 className="profile-content__activities-title">
            參與過的活動
            <FontAwesomeIcon icon={faStreetView} className="icon" />
          </h5>
          <Card style={{ width: '15rem', height: '20rem' }}>
            <Card.Img
              variant="top"
              src="../assets/images/backgrounds/taipei.jpg"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                This is a card example using React-Bootstrap.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>

        <div className="profile-content__followers">
          <h5 className="profile-content__followers-title">
            追蹤者
            <FontAwesomeIcon icon={faUserPlus} className="icon" />
          </h5>
          <div className="profile-content__follower-items">
            <div className="profile-content__follower-item">
              <img
                src="../public/assets/images/others/default-avatar.jpg"
                alt="預設追蹤者 1"
                className="followers"
              />
            </div>
            <div className="profile-content__follower-item">
              <img
                src="../public/assets/images/others/default-avatar.jpg"
                alt="預設追蹤者 2"
                className="followers"
              />
            </div>
            <div className="profile-content__follower-item">
              <img
                src="../public/assets/images/others/default-avatar.jpg"
                alt="預設追蹤者 3"
                className="followers"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
