import { useEffect, useState } from 'react'
import Header from '../../components/shared/Header'
import ImageGallery from '../../components/shared/ImageGallery'
import DetailPageTitle from '../../components/DetailPageTitle'
import LocationPageIntroduction from '../../components/location/LocationPageIntroduction'
import LocationMap from '../../components/location/LocationMap'
import RelatedCard from '../../components/RelatedCard'
import CommentsBlock from '../../components/CommentsBlock'
import SearchBar from '../../components/shared/SearchBar'

import Footer from '../../components/shared/Footer'
import { useParams } from 'react-router-dom'
import apiClient from '../../api/apiClient'

const LocationDetailPage = () => {
  const { id } = useParams()
  const [location, setLocation] = useState(null)

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await apiClient.get(`api/locations/${id}`)
        setLocation(response.data.location)
      } catch (error) {
        console.error('取得活動資料失敗', error)
      }
    }
    fetchLocation()
  }, [id])

  return (
    <div className="location-detail-page">
      <Header />

      <div className="location-search-bar-wrapper">
        <SearchBar />
      </div>
      {location && (
        <div className="location-detail-page__container">
          {/* 顯示圖片 */}
          {location.images && location.images.length > 0 ? (
            <ImageGallery images={location.images} />
          ) : (
            <p>此景點無圖片</p>
          )}

          <div className="location-detail-page__title-wrapper">
            <DetailPageTitle name={location.name} />
          </div>

          <div className="location-detail-page__wrapper">
            <main className="location-detail-page__main">
              <LocationPageIntroduction introduction={location.description} />
            </main>
            <aside className="location-detail-page__aside">
              <LocationMap
                latitude={location.latitude}
                longitude={location.longitude}
              />
            </aside>
          </div>

          <div className="location-detail-page__info">
            <p>
              <strong>地址:</strong>
              {location?.address?.includes('+')
                ? '此地點無完整地址'
                : location.address || '無完整地址'}
            </p>
            <div>
              {location.opening_hours ? (
                <div>
                  <p>
                    <strong>營業時間:</strong>
                  </p>
                  <ul>
                    {location.opening_hours.split(', ').map((time, index) => (
                      <li key={index}>{time}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>無營業時間資訊</p>
              )}
            </div>
          </div>

          {/* 以下未處理 */}
          <div className="location-detail-page__related-wrapper">
            <h3 className="location-detail-page__related-cards-title">
              {' '}
              相關活動
            </h3>
            <div className="location-detail-page__related-cards">
              {location.activities.length === 0 ? (
                <p style={{marginTop:'1rem'}}>目前暫無相關活動</p>
              ) : (
                location.activities.map((activity) => (
                  <RelatedCard
                    activityId={activity.id}
                    title={activity.name}
                    description={activity.description.slice(0, 35) + '...'}
                    image={
                      activity.images && activity.images.length > 0
                        ? activity.images[0].image_url
                        : '/default-image.jpg'
                    }
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default LocationDetailPage
