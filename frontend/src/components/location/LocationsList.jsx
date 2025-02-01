import { useState, useEffect } from 'react'
import axios from 'axios'
import CardItem from '../../components/shared/CardItem'

const LocationsList = () => {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/locations')
        setLocations(response.data.locations)
        setLoading(false)
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

  return (
    <div className="locations-list-wrapper">
      <div className="locations-list">
        {locations.map((location) => (
          <CardItem
            key={location.id}
            buttonText="查看更多"
            image={
              `http://localhost:3000${location.images?.[1]?.image_url}` ||
              '/default-image.jpg'
            }
            title={location.name}
            description={location.description}
            className="card-item"
            id={location.id}
            Link={`/locations/${location.id}`}
          />
        ))}
      </div>
    </div>
  )
}

export default LocationsList
