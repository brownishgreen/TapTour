import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from '../../components/shared/Header'
import SearchBar from '../../components/shared/SearchBar'
import ImageCarousel from '../../components/shared/ImageCarousel'
import Pagination from '../../components/shared/Pagination'
import LocationsList from '../../components/location/LocationsList'
import Footer from '../../components/shared/Footer'
import apiClient from '../../api/apiClient'

const LocationsPage = () => {
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('search') || '' // 提取搜尋參數

  // 分頁和數據狀態
  const [locations, setLocations] = useState([]) // 當前頁的地點數據
  const [currentPage, setCurrentPage] = useState(1) // 當前頁碼
  const [totalPages, setTotalPages] = useState(1) // 總頁數
  const [loading, setLoading] = useState(true) // 加載狀態
  const [error, setError] = useState('') // 錯誤訊息

  useEffect(() => {
    if (searchTerm) {
      fetchSearchedLocations() // 若有搜尋條件，使用搜索 API
    } else {
      fetchPaginatedLocations() // 否則使用分頁 API
    }
  }, [searchTerm, currentPage])

  // 搜索 API
  const fetchSearchedLocations = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await apiClient.get(
        `/api/locations?search=${encodeURIComponent(searchTerm)}`
      )
      setLocations(response.data.locations) // 設置搜索結果
      setTotalPages(1) // 搜索結果不需要分頁，總頁數設為 1
    } catch (error) {
      console.error('無法取得搜索結果:', error)
      setError('無法取得搜索結果，請稍後再試。')
    } finally {
      setLoading(false)
    }
  }

  // 分頁 API
  const fetchPaginatedLocations = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await apiClient.get(
        `/api/locations/paginated?page=${currentPage}&limit=9`
      )
      const { locations, totalPages } = response.data
      setLocations(locations) // 設置分頁數據
      setTotalPages(totalPages) // 設置總頁數
    } catch (error) {
      console.error('無法取得地點數據:', error)
      setError('無法取得地點數據，請稍後再試。')
    } finally {
      setLoading(false)
    }
  }

  const Locationscarousel = [
    {
      src: '/assets/images/backgrounds/5mezpWin6T8.jpg',
      alt: 'First Slide',
      caption: '走進壯麗高山秘境，遠離喧囂，擁抱自然的純淨與自由',
    },
    {
      src: '/assets/images/backgrounds/streetwindy.jpg',
      alt: 'Second Slide',
      caption: '探索浮動市集，木屋倒映水波，體驗古樸原始的生活韻味',
    },
    {
      src: '/assets/images/backgrounds/ituaTXxbrPA.jpg',
      alt: 'Third Slide',
      caption: '沿著鐵軌探索未知旅程，小鎮風光與遠山城市交織成畫卷',
    },
  ]

  return (
    <div>
      <Header />
      <main>
        <ImageCarousel items={Locationscarousel} />
        <SearchBar />
        {loading && <p>加載中...</p>}
        {error && (
          <div className="error-container">
            <img
              src="../src/assets/images/error-search.jpg"
              alt="搜尋失敗"
              className="error-image"
            />

          </div>
        )}
        {!loading && !error && <LocationsList locations={locations} />}
        {!searchTerm && ( // 只有在沒有搜索時顯示分頁
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

export default LocationsPage
