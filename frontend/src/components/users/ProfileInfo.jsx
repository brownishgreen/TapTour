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
import { useNavigate } from 'react-router-dom'

const ProfileInfo = ({ userId }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${userId}/profile`,
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
  }, [userId])

  if (loading) {
    return <div>載入中...</div>
  }

  if (error) {
    return <div>{error}</div>
  }
  const handleEditProfile = () => {
    navigate(`/users/${userId}/profile/edit`)
  }
  return (
    <div className="profile-wrapper">
      <div className="profile-info">
        <div className="profile-avatar">
          <img
            src={
              user.image ||
              '../../public/assets/images/others/default-avatar.jpg'
            }
            alt="預設大頭貼"
            className="default-avatar"
          />
        </div>
        <div className="profile-details">
          <p>姓名: {user.name}</p>
          <p>信箱: {user.email}</p>
          <p>註冊日期: {user.createdAt.split('T')[0]}</p>
          <p>個人簡介: </p>
          <p className="profile-bio">
            {user.bio || '請至編輯頁面輸入您的個人簡介...'}
          </p>
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
          <h5 className="profile-content-title">
            最新評論
            <FontAwesomeIcon icon={faPen} className="icon" />
          </h5>
          <div className="profile-content__comment-box">
            {/* 範例評論 */}
            <div className="profile-content__comment-item">
              <p className="profile-content__comment-text">
                這個活動真的很棒！非常推薦給大家！
              </p>
              <p className="profile-content__comment-author">
                - by User123, 2025-01-15
              </p>
            </div>
            <div className="profile-content__comment-item">
              <p className="profile-content__comment-text">
                地點很漂亮，但安排稍微有點緊湊。
              </p>
              <p className="profile-content__comment-author">
                - by JaneDoe, 2025-01-10
              </p>
            </div>
          </div>
        </div>
        <div className="profile-content__activities">
          <h5 className="profile-content-title">
            參與過的活動
            <FontAwesomeIcon icon={faStreetView} className="icon" />
          </h5>
          <div className="profile-content__activities-box">
            <div className="profile-content__activities-list">
              <Card style={{ width: '230px', height: '320px' }}>
                <Card.Img
                  variant="top"
                  src="../../assets/images/backgrounds/taipei.jpg"
                  style={{ width: '228px', height: '150px' }}
                />
                <Card.Body>
                  <Card.Title>台北一日遊</Card.Title>
                  <Card.Text>
                    101觀景台→兒童新樂園→士林官邸or故宮博物院...
                  </Card.Text>
                  <Button variant="secondary">查看更多</Button>
                </Card.Body>
              </Card>
              <Card style={{ width: '230px', height: '320px' }}>
                <Card.Img
                  variant="top"
                  src="../../assets/images/others/korea.jpg"
                  style={{ width: '228px', height: '150px' }}
                />
                <Card.Body>
                  <Card.Title>花漾釜山５日</Card.Title>
                  <Card.Text>
                    鎮海、慶州古都賞櫻、黑白大廚、彩色甘川洞文化村...
                  </Card.Text>
                  <Button variant="secondary">查看更多</Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>

        <div className="profile-content__followers">
          <h5 className="profile-content-title">
            追蹤者
            <FontAwesomeIcon icon={faUserPlus} className="icon" />
          </h5>
          <div className="profile-content__follower-box">
            <div className="profile-content__follower-item">
              <img
                src="../../public/assets/images/others/default-avatar.jpg"
                alt="預設追蹤者 1"
                className="followers"
              />
              <p>wilson</p>
            </div>
            <div className="profile-content__follower-item">
              <img
                src="../../public/assets/images/others/default-avatar.jpg"
                alt="預設追蹤者 2"
                className="followers"
              />
              <p>andy</p>
            </div>
            <div className="profile-content__follower-item">
              <img
                src="../../public/assets/images/others/default-avatar.jpg"
                alt="預設追蹤者 3"
                className="followers"
              />
              <p>candy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
