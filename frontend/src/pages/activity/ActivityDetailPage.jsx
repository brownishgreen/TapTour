import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Header from '../../components/shared/Header'
import SearchBar from '../../components/shared/SearchBar'
import ImageGallery from '../../components/shared/ImageGallery'
import DetailPageTitle from '../../components/DetailPageTitle'
import DetailPageIntroduction from '../../components/DetailPageIntroduction'
import ActivityDetailIntroduction from '../../components/activity/ActivityDetailIntroduction.jsx'
import PriceInformation from '../../components/PriceInformation'
import Footer from '../../components/shared/Footer'
import { useAuth } from '../../components/context/AuthContext'


const ActivityDetailPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const { verifyLogin } = useAuth()
  const { id } = useParams()
  const [activity, setActivity] = useState(null)

  useEffect(() => {
    verifyLogin() // 在頁面加載時檢查登入狀態
    const fetchActivity = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/activities/${id}`)
        setActivity(response.data)
      } catch (error) {
        console.error('取得活動資料失敗', error)
      }
    }
    fetchActivity()
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
            <DetailPageIntroduction
              introduction={activity.description}
            />
            <ActivityDetailIntroduction />
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
