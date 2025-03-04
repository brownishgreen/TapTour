import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiClient from '../../api/apiClient'
import Header from '../../components/shared/Header'
import SearchBar from '../../components/shared/SearchBar'
import ImageGallery from '../../components/shared/ImageGallery'
import DetailPageTitle from '../../components/DetailPageTitle'
import DetailPageIntroduction from '../../components/DetailPageIntroduction'
import ActivityDetailIntroduction from '../../components/activity/ActivityDetailIntroduction.jsx'
import CreateCommentForm from '../../components/CreateCommentForm'
import CommentsBlock from '../../components/CommentsBlock'
import PriceInformation from '../../components/PriceInformation'
import Footer from '../../components/shared/Footer'
import { useAuth } from '../../components/context/AuthContext'

const ActivityDetailPage = () => {
  const { id } = useParams()
  const [activity, setActivity] = useState(null)
  const [comments, setComments] = useState([])
  const { isLoggedIn, setIsLoggedIn, verifyLogin, user } = useAuth()

  useEffect(() => {
    // verifyLogin()
    const fetchActivityAndComments = async () => {
      try {
        const [activityResponse, commentsResponse] = await Promise.all([
          apiClient.get(`api/activities/${id}`),
          apiClient.get(`api/comments/activities/${id}`)
        ])
        setActivity(activityResponse.data)
        setComments(commentsResponse.data)
      } catch (err) {
        console.error('取得活動和評論資料失敗', err)
      }
    }
    fetchActivityAndComments()
  }, [id, verifyLogin])

  const handleNewComment = async (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments])

    apiClient
      .get(`api/comments/activities/${id}`)
      .then((response) => setComments(response.data))
      .catch((err) => console.error('取得更新後的評論失敗', err))
  }

  const handleCommentDeleted = (commentId) => {
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId))
  }

  return (
    <div className="activity-detail-page">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="activity-detail-page__search-bar-wrapper">
        <SearchBar />
      </div>
      {activity && (
        <div className="activity-detail-page__container">
          <ImageGallery images={activity.images} />
          <div className="activity-detail-page-title-wrapper">
            <DetailPageTitle name={activity.name} />
          </div>
          <div className="activity-detail-page__wrapper">
            <main className="activity-detail-page__main">
              <DetailPageIntroduction introduction={activity.description} />
              <ActivityDetailIntroduction
                timeDuration={activity.time_duration}
              />
            </main>
            <aside className="activity-detail-page__aside">
              <PriceInformation
                price={activity.price}
                activityId={activity.id}
                user={user}
              />
            </aside>
          </div>
          <div className="activity-detail-page__comments-wrapper">
            {isLoggedIn ? (
              <CreateCommentForm
                entityId={activity.id}
                entityType="activity"
                onCommentAdded={handleNewComment}
              />
            ) : (
              <p style={{ marginLeft: '10px' }}>⚠️ 請先登入以新增評論。</p>
            )}
            <CommentsBlock comments={comments} onCommentDeleted={handleCommentDeleted} />
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default ActivityDetailPage
