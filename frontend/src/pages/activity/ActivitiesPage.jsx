import { useEffect, useState } from 'react'
import apiClient from '../../api/apiClient'
import { useSearchParams } from 'react-router-dom'
import Header from '../../components/shared/Header'
import Footer from '../../components/shared/Footer'
import SearchBar from '../../components/shared/SearchBar'
import CardItem from '../../components/shared/CardItem'
import HeroBanner from '../../components/shared/HeroBanner'
import Pagination from '../../components/shared/Pagination'
import { useAuth } from '../../components/context/AuthContext'


const ActivitiesPage = () => {

  const { user } = useAuth()
  const userId = user?.id

  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('search') || '' // 提取搜尋參數

  const [activities, setActivities] = useState([]) // 取得活動資料
  const [error, setError] = useState(false) // 搜尋失敗狀態

  const [currentPage, setCurrentPage] = useState(1) // 當前頁碼
  const [totalPages, setTotalPages] = useState(1) // 總頁數
  const [totalItems, setTotalItems] = useState(0) // 總數據數量

  useEffect(() => {
    fetchActivities() // 請求活動資料
  }, [searchTerm, currentPage])

  // 請求活動資料
  const fetchActivities = async () => {
    try {
      setError(false) // 重置錯誤狀態
      let response
      if (searchTerm) {
        // 如果有搜尋條件，執行搜尋 API
        response = await apiClient.get(
          `api/activities?search=${encodeURIComponent(searchTerm)}`
        )

        if (response.data.length === 0) {
          // 如果搜尋結果為空，顯示錯誤圖片
          setError(true)
          setActivities([]) // 清空活動列表
          return
        }
        setActivities(response.data) // 設定搜尋結果
        setTotalPages(1) // 搜尋結果不需要分頁，頁數設為 1
        setTotalItems(response.data.length) // 設定搜尋結果的總數
      } else {
        // 如果沒有搜尋條件，執行分頁 API
        const response = await apiClient.get(
          `api/activities/paginated?page=${currentPage}&limit=6`
        )


        const { activities, totalPages, totalItems } = response.data
        setActivities(activities) // 設定分頁的活動資料
        setTotalPages(totalPages) // 設定分頁的總頁數
        setTotalItems(totalItems) // 設定分頁的總數據數量
      }
    } catch (error) {
      setError(true)
      console.error('取得活動資料失敗', error)
    }
  }

  return (
    <div className="activities-page">
      <Header />
      <div className="activities-page__hero-banner">
        <HeroBanner
          imageURL="https://images.unsplash.com/photo-1739993655680-4b7050ed2896?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="TapTour 提供各式行程"
          description="豐富你的生活體驗，發現各地的精彩活動。"
        />
      </div>
      <main className="activities-page__main">
        <SearchBar />
        {error ? (
          <div className="error-container">
            <img
              src="https://storage.googleapis.com/taptour/assets/images/S__24428606.jpg"
              alt="搜尋失敗"
              className="error-image"
            />
          </div>
        ) : (
          <div className="activities-page__card-container">
            {activities.map((activity) => (
              <CardItem
                buttonText="深入瞭解"
                image={
                  activity.images?.length > 0
                    ? activity.images?.[0]?.image_url
                    : '/default-image.jpg'
                }
                title={activity?.name || '無標題'}
                subtitle={activity?.category?.name || '未分類'}
                description={activity?.description || '無詳細描述'}
                itemId={activity?.id}
                cardLink={`/activities/${activity?.id}`}
                userId={userId}
                itemType="activity"
              />
            ))}
          </div>
        )}
        {!searchTerm && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default ActivitiesPage
