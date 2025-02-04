import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import Header from '../../components/shared/Header'
import Footer from '../../components/shared/Footer'
import SearchBar from '../../components/shared/SearchBar'
import CardItem from '../../components/shared/CardItem'
import HeroBanner from '../../components/shared/HeroBanner'
import Pagination from '../../components/shared/Pagination'
import { useAuth } from '../../components/context/AuthContext'

const ActivitiesPage = () => {
  const { verifyLogin } = useAuth()
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('search') || '' // 提取搜尋參數
  // 取得活動資料
  const [activities, setActivities] = useState([])

  useEffect(() => {
    verifyLogin() // 在頁面加載時檢查登入狀態
    fetchActivities() // 請求活動資料
  }, [searchTerm])

  // 請求活動資料
  const fetchActivities = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/activities?search=${encodeURIComponent(searchTerm)}`
      )
      setActivities(response.data)
    } catch (error) {
      console.error('取得活動資料失敗', error)
    }
  }

  return (
    <div className="activities-page">
      <Header />
      <div className="activities-page__hero-banner">
        <HeroBanner
          imageURL="../src/assets/images/hero-banner-image.jpg"
          title="TapTour 提供各式行程"
          description="豐富你的生活體驗，發現各地的精彩活動。"
        />
      </div>
      <main className="activities-page__main">
        <SearchBar />
        <div className="activities-page__card-container">
          {activities.map((activity) => (
            <CardItem
              key={activity.id}
              buttonText="深入瞭解"
              image={
                `http://localhost:3000${activity.images?.[1]?.image_url}` ||
                '/default-image.jpg'
              }
              title={activity.name}
              subtitle={activity.category.name}
              description={activity.description}
              id={activity.id}
              activityLink={`/activities/${activity.id}`}
            />
          ))}
        </div>
        <Pagination />
      </main>
      <Footer />
    </div>
  )
}

export default ActivitiesPage
