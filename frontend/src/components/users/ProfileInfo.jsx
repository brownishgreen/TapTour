import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart as solidHeart,
  faPen,
  faStreetView,
} from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import { Card, Button } from 'react-bootstrap'
import apiClient from '../../api/apiClient'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const ProfileInfo = ({ userId }) => {
  const { userId: currentUserId } = useAuth() // 從上下文獲取當前用戶的 ID
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [followers, setFollowers] = useState([]) // 追蹤我的人 -列表
  const [following, setFollowing] = useState([]) // 我正在追蹤的人-列表
  const [isFollowing, setIsFollowing] = useState(false)
  const [followLoading, setFollowLoading] = useState(false)

  useEffect(() => {
    const userData = async () => {
      try {
        const response = await apiClient.get(`api/users/${userId}/profile`, {
          withCredentials: true,
        })
        setUser(response.data.user)
        setFollowers(response.data.followers) // 設置追蹤者
        setFollowing(response.data.following) // 設置正在追蹤的列表
        setIsFollowing(response.data.isFollowing || false) // 檢查當前用戶是否已追蹤該用戶，假設後端返回 isFollowing
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

  const handleFollow = async (e) => {
    e.preventDefault()

    if (followLoading) return
    setFollowLoading(true)

    try {
      const response = await apiClient.post('api/followers/follow', {
        followerId: currentUserId, // 確保 userId 是當前用戶的 ID
        followingId: user.id, // 目標用戶 ID
      })
      if (response.data.alreadyFollowing) {
        console.log('已追蹤該用戶')
        setIsFollowing(true) // 確保按鈕切換到「已追蹤」
      } else {
        setIsFollowing(true) // 新增成功
      }
    } catch (error) {
      console.error('追蹤失敗:', error.message)
    } finally {
      setFollowLoading(false)
    }
  }

  const handleUnfollow = async (e) => {
    e.preventDefault() // 防止跳轉

    if (followLoading) return
    setFollowLoading(true)

    try {
      await apiClient.post(
        'api/followers/unfollow', // 假設你有後端的取消追蹤 API
        {
          followerId: currentUserId, // 當前用戶 ID
          followingId: user.id, // 目標用戶 ID
        },
        { withCredentials: true }
      )
      setIsFollowing(false) // 更新為未追蹤
    } catch (error) {
      console.error('取消追蹤失敗:', error.message)
    } finally {
      setFollowLoading(false)
    }
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
          <div>
            {currentUserId !== user.id &&
              (isFollowing ? (
                <button
                  type="button"
                  className="follow-btn following"
                  onClick={handleUnfollow}
                  disabled={followLoading}
                  style={{ backgroundColor: '#54A2C0', color: '#fff' }}
                >
                  {followLoading ? '處理中...' : '已追蹤'}
                  <FontAwesomeIcon className="icon" icon={solidHeart} />
                </button>
              ) : (
                <button
                  type="button"
                  className="follow-btn"
                  onClick={handleFollow}
                  disabled={followLoading}
                >
                  {followLoading ? '處理中...' : '追蹤我'}
                  <FontAwesomeIcon icon={regularHeart} className="icon" />
                </button>
              ))}

            {currentUserId === user.id && (
              <button className="profile-btn" onClick={handleEditProfile}>
                編輯個人檔案
              </button>
            )}
          </div>
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
          <div className="profile-content__follow">
            <h5 className="profile-content-title">
              追蹤者（{followers.length}）
            </h5>
            <div className="profile-content__follower-box">
              {followers.length === 0 ? (
                <p>尚無追蹤者</p>
              ) : (
                followers.map((f) => (
                  <div
                    key={f.id}
                    className="profile-content__follower-item"
                  >
                    <Link to={`/users/${f.id}/profile`}>
                      <img
                        src={f.image || '/default-avatar.jpg'}
                        alt={f.name}
                      />
                    </Link>

                    <p>{f.name}</p>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="profile-content__follow">
            <h5 className="profile-content-title">
              正在追蹤（{following.length}）
            </h5>
            <div className="profile-content__follower-box">
              {following.length === 0 ? (
                <p>尚未追蹤任何人</p>
              ) : (
                following.map((f) => (
                  <div key={f.id} className="profile-content__follower-item">
                    <Link to={`/users/${f.id}/profile`}>
                      <img
                        src={f.image || '/default-avatar.jpg'}
                        alt={f.name}
                      />
                    </Link>

                    <p>{f.name}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
