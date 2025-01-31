import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
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
  const { isLoggedIn, setIsLoggedIn, verifyLogin } = useAuth()

  useEffect(() => {
    verifyLogin()
    const fetchActivityAndComments = async () => {
      try {
        const [activityResponse, commentsResponse] = await Promise.all([
          axios.get(`http://localhost:3000/api/activities/${id}`),
          axios.get(`http://localhost:3000/api/comments/activities/${id}`)
        ])
        setActivity(activityResponse.data)
        setComments(commentsResponse.data)
      } catch (err) {
        console.error('取得活動和評論資料失敗', err)
      }
    }
    fetchActivityAndComments()
  }, [id, verifyLogin])

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
              <ActivityDetailIntroduction />
              {isLoggedIn ? (
                <CreateCommentForm
                  entityId={activity.id}
                  entityType="activity"
                  onCommentAdded={() => {
                    axios
                      .get(`http://localhost:3000/api/comments/activities/${id}`)
                      .then((res) => setComments(res.data))
                      .catch((err) => console.error('取得更新後的評論失敗', err))
                  }}
                />
              ) : (
                <p>請先登入以新增評論。</p>
              )}
              <CommentsBlock comments={comments} />
            </main>
            <aside className="activity-detail-page__aside">
              <PriceInformation price={activity.price} />
            </aside>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default ActivityDetailPage
