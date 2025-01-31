import { useEffect, useState } from 'react'
import Header from '../../components/shared/Header'
import SearchBar from '../../components/shared/SearchBar'
import ImageGallery from '../../components/shared/ImageGallery'
import DetailPageTitle from '../../components/DetailPageTitle'
import LocationPageIntroduction from '../../components/location/LocationPageIntroduction'
import LocationMap from '../../components/location/LocationMap'
import RelatedCard from '../../components/RelatedCard'
import CommentsBlock from '../../components/CommentCard'
import Footer from '../../components/shared/Footer'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const LocationDetailPage = () => {
  const { id } = useParams()
  const [location, setLocation] = useState(null)

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/locations/${id}`
        )
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
              相關景點
            </h3>
            <div className="location-detail-page__related-cards">
              <RelatedCard
                title="道頓崛"
                description="道頓崛位於日本大阪，是美食與娛樂聚集地，以霓虹燈、道頓堀川、格力高廣告牌及美味小吃聞名。"
                image="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTX5gLkNtSdtwpAqCcympCPUkO0-FLUcxiiiM3PgbPE00iGjBh1X01HyLltLbeEaRSpRNcv-J9Pj1YZOYNECvA4fKzPQ2fn-vv_HS-Mug"
              />
            </div>
            <div className="location-detail-page__related-cards">
              <RelatedCard
                title="環球影城"
                description="環球影城位於大阪，是以電影主題為特色的主題樂園，擁有哈利波特園區、刺激遊樂設施及表演活動。"
                image="https://i0.wp.com/sosowetalk.com/wp-content/uploads/2023/10/01-1.jpg?resize=732%2C380&ssl=1"
              />
            </div>
            <div className="location-detail-page__related-cards">
              <RelatedCard
                title="Osaka Aquarium KAIYUKAN"
                description="大阪海遊館是日本著名水族館，以巨大中央水槽展示海洋生態，包含鯨鯊、企鵝及多樣水生生物。"
                image="https://ak-d.tripcdn.com/images/0101212000f6qvubbA8BA.jpg"
              />
            </div>
          </div>
          <div className="location-detail-page__comments-wrapper">
            <h3 className="location-detail-page__comments-title">評論</h3>
            <CommentsBlock
              name="Julia"
              comment="Osaka is a great city! I love the food and the people are friendly."
              avatar="https://i.pravatar.cc/150?img=27"
              timestamp="2024-01-01"
            />
            <CommentsBlock
              name="John"
              comment="Amazing city with great transportation!"
              avatar="https://i.pravatar.cc/150?img=14"
              timestamp="2024-01-02"
            />
            <CommentsBlock
              name="Jackal"
              comment="How to get to the aquarium?"
              avatar="https://i.pravatar.cc/150?img=12"
              timestamp="2024-01-03"
            />
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default LocationDetailPage
