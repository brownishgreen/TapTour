import { useState, useEffect } from 'react'
import CardItem from '../../components/shared/CardItem'
import apiClient from '../../api/apiClient'

const LocationsList = ({ search }) => {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await apiClient.get('api/locations')
        setLocations(response.data.locations)
        setLoading(false)
        console.log(response.data.locations)
      } catch (error) {
        console.error('Failed to fetch locations:', error)
        setError('無法獲取地點')
        setLoading(false)
      }
    }
    fetchLocations()
  }, [])

  useEffect(() => {
    setLoading(true)

    // 根據 search 查詢參數發送 API 請求
    apiClient
      .get(`/api/locations?search=${encodeURIComponent(search)}`)
      .then((response) => {
        setLocations(response.data.locations)
        setLoading(false)
      })
      .catch((err) => {
        console.error('無法取得景點數據:', err)
        setError('無法取得景點數據，請稍後再試。')
        setLoading(false)
      })
  }, [search]) // 每當 search 改變時重新執行請求

  if (loading) {
    return <p>加載中...</p>
  }

  if (error) {
    return <p>{error}</p> // 顯示錯誤信息
  }

  return (
    <div className="locations-list-wrapper">
      <div className="locations-list">
        {locations.map((location) => (
          <CardItem
            key={location.id}
            buttonText="查看更多"
            image={
              location.images?.length
                ? `${apiClient.defaults.baseURL.replace(/\/$/, '')}${
                    location.images.find(
                      (img) => img.id === location.main_image_id
                    )?.image_url || location.images[0].image_url
                  }`
                : '/default-image.jpg'
            }
            title={location.name}
            description={location.description}
            className="card-item"
            id={location.id}
            activityLink={`/locations/${location.id}`}
          />
        ))}
      </div>
    </div>
  )
}

export default LocationsList
