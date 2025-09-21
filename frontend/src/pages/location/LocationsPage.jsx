import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from '../../components/shared/Header'
import SearchBar from '../../components/shared/SearchBar'
import ImageCarousel from '../../components/shared/ImageCarousel'
import Pagination from '../../components/shared/Pagination'
import LocationsList from '../../components/location/LocationsList'
import Footer from '../../components/shared/Footer'
import apiClient from '../../api/apiClient'
import { getImageUrl } from '../../utils/imageHelper'
const LocationsPage = () => {
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('search') || '' // extract search parameter

  // pagination and data state
  const [locations, setLocations] = useState([]) // current page locations data
  const [currentPage, setCurrentPage] = useState(1) // current page number
  const [totalPages, setTotalPages] = useState(1) // total pages
  const [loading, setLoading] = useState(true) // loading state
  const [error, setError] = useState('') // error message

  useEffect(() => {
    if (searchTerm) {
      fetchSearchedLocations() // if there is a search condition, use the search API
    } else {
      fetchPaginatedLocations() // otherwise, use the pagination API
    }
  }, [searchTerm, currentPage])

  // search API
  const fetchSearchedLocations = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await apiClient.get(
        `/api/locations?search=${encodeURIComponent(searchTerm)}`
      )
      setLocations(response.data.locations) // set the search result
      setTotalPages(1) // the search result does not need pagination, set the total pages to 1
    } catch (error) {
      console.error('無法取得搜索結果:', error)
      setError('無法取得搜索結果，請稍後再試。')
    } finally {
      setLoading(false)
    }
  }

  // pagination API
  const fetchPaginatedLocations = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await apiClient.get(
        `/api/locations/paginated?page=${currentPage}&limit=6`
      )
      const { locations, totalPages } = response.data
      setLocations(locations) // set the pagination data
      setTotalPages(totalPages) // set the total pages
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
      caption: '走進壯麗高山秘境，遠離喧囂，擁抱自然的純淨與自由。',
    },
    {
      src: '/assets/images/backgrounds/streetwindy.jpg',
      alt: 'Second Slide',
      caption: '探索浮動市集，木屋倒映水波，體驗古樸原始的生活韻味。',
    },
    {
      src: '/assets/images/backgrounds/ituaTXxbrPA.jpg',
      alt: 'Third Slide',
      caption: '沿著鐵軌探索未知旅程，小鎮風光與遠山城市交織成畫卷。',
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
              src="/assets/images/S__24428606.jpg"
              alt="搜尋失敗"
              className="error-image"
            />
          </div>
        )}
        {!loading && !error && <LocationsList locations={locations} />}
        {!searchTerm && ( // only show pagination when there is no search
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
