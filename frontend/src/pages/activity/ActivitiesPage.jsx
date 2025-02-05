import { useEffect, useState } from 'react'
import apiClient from '../../api/apiClient'
import { useSearchParams } from 'react-router-dom'
import Header from '../../components/shared/Header'
import Footer from '../../components/shared/Footer'
import SearchBar from '../../components/shared/SearchBar'
import CardItem from '../../components/shared/CardItem'
import HeroBanner from '../../components/shared/HeroBanner'
import Pagination from '../../components/shared/Pagination'

const ActivitiesPage = () => {
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('search') || '' // 提取搜尋參數

  const [activities, setActivities] = useState([]) // 取得活動資料
  const [currentPage, setCurrentPage] = useState(1) // 當前頁碼
  const [totalPages, setTotalPages] = useState(1) // 總頁數
  const [totalItems, setTotalItems] = useState(0) // 總數據數量

  useEffect(() => {
    fetchActivities() // 請求活動資料
  }, [searchTerm, currentPage])

  // 請求活動資料
  const fetchActivities = async () => {
    try {
      if (searchTerm) {
        // 如果有搜尋條件，執行搜尋 API
        const response = await apiClient.get(
          `api/activities?search=${encodeURIComponent(searchTerm)}`
        )
        setActivities(response.data) // 設定搜尋結果
        setTotalPages(1) // 搜尋結果不需要分頁，頁數設為 1
        setTotalItems(response.data.length) // 設定搜尋結果的總數
      } else {
        // 如果沒有搜尋條件，執行分頁 API
        const response = await apiClient.get(
          `api/activities/paginated?page=${currentPage}&limit=9`
        )
        const { activities, totalPages, totalItems } = response.data
        setActivities(activities) // 設定分頁的活動資料
        setTotalPages(totalPages) // 設定分頁的總頁數
        setTotalItems(totalItems) // 設定分頁的總數據數量
      }
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
              key={activity?.id}
              buttonText="深入瞭解"
              image={
                `${apiClient.defaults.baseURL.replace(/\/$/, '')}${activity?.images?.[1]?.image_url}` ||
                '/default-image.jpg'
              }
              title={activity?.name}
              subtitle={activity.category?.name}
              description={activity?.description}
              id={activity?.id}
              cardLink={`/activities/${activity?.id}`}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>
      <Footer />
    </div>
  )
}

export default ActivitiesPage
