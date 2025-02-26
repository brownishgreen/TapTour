import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart as solidHeart,
  faBullhorn,
  faFire,
  faMapLocationDot,
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
  const [favoriteActivities, setFavoriteActivities] = useState([])
  const [favoriteProducts, setFavoriteProducts] = useState([])
  const [comments, setCommemts] = useState([])

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

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await apiClient.get(`/api/favorites/users/${userId}`)

        setFavoriteActivities(response.data.activities)
        setFavoriteProducts(response.data.products)
      } catch (err) {
        console.error('無法獲取收藏清單', err)
      }
    }
    fetchFavorites()
  }, [userId])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await apiClient.get(`/api/comments/users/${userId}`)
        setCommemts(response.data)
      } catch (err) {
        console.error('無法獲取留言', err)
      }
    }
    fetchComments()
  }, [userId])

  if (loading) {
    return <div>載入中...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  // new

  const fetchFollowers = async () => {
    try {
      const response = await apiClient.get(`/api/users/${userId}/profile`, {
        withCredentials: true,
      })
      setFollowers(response.data.followers) 
    } catch (error) {
      console.error('無法獲取追蹤者清單', error)
    }
  }

  const handleFollow = async (e) => {
    e.preventDefault()
    if (followLoading) return
    setFollowLoading(true)

    try {
      await apiClient.post('/api/followers/follow', {
        followerId: currentUserId,
        followingId: user.id,
      })

      setIsFollowing(true)

      // **強制刷新 `followers`，確保 UI 立即更新**
      await fetchFollowers()
    } catch (error) {
      console.error('追蹤失敗:', error?.message || error)
    } finally {
      setFollowLoading(false)
    }
  }

  const handleUnfollow = async (e) => {
    e.preventDefault()

    if (followLoading) return
    setFollowLoading(true)

    try {
      await apiClient.post('/api/followers/unfollow', {
        followerId: currentUserId,
        followingId: user.id,
      })

      setIsFollowing(false)

      // **從 followers 陣列中移除當前用戶**
      setFollowers((prevFollowers) =>
        prevFollowers.filter((follower) => follower.id !== currentUserId)
      )
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
      <div className="profile-info-content">
        <div className="profile-info">
          <div className="profile-avatar">
            <img
              src={user.image || '/assets/images/others/default-avatar.jpg'}
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
                    {followLoading ? '處理中...' : '已追蹤 '}
                    <FontAwesomeIcon className="icon" icon={solidHeart} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="follow-btn"
                    onClick={handleFollow}
                    disabled={followLoading}
                  >
                    {followLoading ? '處理中...' : '追蹤我 '}
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

        {/* follow */}
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
                  <div key={f.id} className="profile-content__follower-item">
                    <Link to={`/users/${f.id}/profile`}>
                      <img
                        src={
                          f.image || '/assets/images/others/default-avatar.jpg'
                        }
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
                        src={
                          f.image || '/assets/images/others/default-avatar.jpg'
                        }
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

      <div className="profile-content">
        <div className="profile-content__comments">
          <h5 className="profile-content-title">
            我的評論牆
            <FontAwesomeIcon icon={faBullhorn} className="icon" />
          </h5>
          <div className="profile-content__comment-box">
            {comments.length === 0 ? (
              <p>目前暫無評論</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="profile-content__comment-item">
                  <p className="profile-content__comment-text">
                    「{comment.content}」
                  </p>
                  <p className="profile-content__comment-author">
                    -針對
                    {comment.activity ? (
                      <Link to={`/activities/${comment.activity.id}`}>
                        {comment.activity.name.length > 10
                          ? comment.activity.name.substring(0, 10) + '...'
                          : comment.activity.name}
                      </Link>
                    ) : (
                      <Link to={`/products/${comment.product.id}`}>
                        {comment.product.name.length > 10
                          ? comment.product.name.substring(0, 10) + '...'
                          : comment.product.name}
                      </Link>
                    )}{' '}
                    ，{comment.createdAt.split('T')[0]}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="profile-content__activities">
          <h5 className="profile-content-title">
            旅行許願池
            <FontAwesomeIcon icon={faMapLocationDot} className="icon" />
          </h5>
          <div className="profile-content__activities-box">
            {favoriteActivities.length === 0 ? (
              <p>目前沒有收藏的活動</p>
            ) : (
              <div className="profile-content__activities-list">
                {favoriteActivities.map((activity) => (
                  <Card key={activity.id}>
                    <Card.Img
                      variant="top"
                      className="card-img-top"
                      src={
                        activity.image.startsWith('http')
                          ? activity.image
                          : `${apiClient.defaults.baseURL.replace(/\/$/, '')}/${activity.image.replace(/^\//, '')}`
                      }
                    />
                    <Card.Body>
                      <Card.Title>
                        {activity.name.length > 15
                          ? activity.name.substring(0, 15) + '...'
                          : activity.name}
                      </Card.Title>
                      <Button
                        as={Link}
                        to={`/activities/${activity.id}`}
                        variant="secondary"
                      >
                        查看更多
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="profile-content__activities">
          <h5 className="profile-content-title">
            心頭好物
            <FontAwesomeIcon icon={faFire} className="icon" />
          </h5>
          <div className="profile-content__activities-box">
            {favoriteProducts.length === 0 ? (
              <p>目前沒有收藏的商品</p>
            ) : (
              <div className="profile-content__activities-list">
                {favoriteProducts.map((product) => (
                  <Card key={product.id}>
                    <Card.Img
                      className="card-img-top"
                      variant="top"
                      
                      src={
                        product.image.startsWith('http')
                          ? product.image
                          : `${apiClient.defaults.baseURL.replace(/\/$/, '')}/${product.image.replace(/^\//, '')}`
                      }
                    />
                    <Card.Body>
                      <Card.Title>
                        {product.name.length > 15
                          ? product.name.substring(0, 15) + '...'
                          : product.name}
                      </Card.Title>
                      <Button
                        as={Link}
                        to={`/products/${product.id}`}
                        variant="secondary"
                      >
                        查看更多
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
