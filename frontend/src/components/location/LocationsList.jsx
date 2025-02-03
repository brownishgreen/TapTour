import { useState, useEffect } from 'react'
import CardItem from '../../components/shared/CardItem'
import apiClient from '../../api/apiClient'

const LocationsList = () => {
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
