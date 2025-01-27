import { useState, useEffect } from 'react'
import CardItem from '../shared/CardItem'

const LocationsList = () => {
  // 模擬 20 個地點數據
  const mockLocations = Array.from({ length: 20 }, (_, index) => ({
    buttonText: 'Discover',
    image:
      index % 2 === 0
        ? '/assets/images/backgrounds/taipei.jpg'
        : '/assets/images/backgrounds/city-sea.jpg',
    title: `Location ${index + 1}`,
    description: `Description for location ${index + 1}`,
  }))

  const [locations, setLocations] = useState([])

  useEffect(() => {
    // 模擬 API 請求
    const fetchLocations = async () => {
      try {
        // 模擬 API 請求，延遲 1 秒返回數據
        const response = await new Promise((resolve) =>
          setTimeout(() => resolve(mockLocations), 1000)
        )
        setLocations(response)
      } catch (error) {
        console.error('Failed to fetch locations:', error)
        setLocations(mockLocations) // 如果出錯，回退到 mock 數據
      }
    }

    fetchLocations()
  }, [])

  return (
    <div className="locations-list-wrapper">
      <div className="locations-list">
        {locations.map((location, index) => (
          <CardItem
            key={index}
            buttonText={location.buttonText}
            image={location.image}
            title={location.title}
            description={location.description}
            className="card-item"
          />
        ))}
      </div>
    </div>
  )
}

export default LocationsList
