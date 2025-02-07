import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { useEffect, useState } from 'react'
import apiClient from '../api/apiClient'
import Header from '../components/shared/Header'
import CampaignCardItem from '../components/shared/CampaignCardItem'
import ImageCarousel from '../components/shared/ImageCarousel'
import CardItem from '../components/shared/CardItem'
import LocationCardItem from '../pages/location/LocationCardIterm'
import Footer from '../components/shared/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faShoppingCart, faCrosshairs } from '@fortawesome/free-solid-svg-icons'

const Homepage = () => {

  // 取得活動資料
  const [activities, setActivities] = useState([])
  const [products, setProducts] = useState([])
  const [locations, setLocations] = useState([])

  useEffect(() => {
    fetchActivities() // 請求活動資料
    fetchProducts() // 請求商品資料
    fetchLocations() // 請求目的地資料
  }, [])

  // 請求活動資料
  const fetchActivities = async () => {
    try {
      const response = await apiClient.get('api/activities')
      setActivities(response.data)
    } catch (error) {
      console.error('取得活動資料失敗', error)
    }
  }

  // 請求商品資料
  const fetchProducts = async () => {
    try {
      const response = await apiClient.get('api/products')
      setProducts(response.data)  
    } catch (error) {
      console.error('取得商品資料失敗', error)
    }
  }

  // 請求目的地資料
  const fetchLocations = async () => {
    try {
      const response = await apiClient.get('api/locations')
      setLocations(response.data.locations)
    } catch (error) {
      console.error('取得目的地資料失敗', error)
    }
  }
  const Locationscarousel = [
    {
      src: 'https://images.unsplash.com/photo-1520503922584-590e8f7a90d7?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'First Slide',
      caption: '奧地利湖畔小鎮哈爾施塔特，風景如畫，鹽礦歷史悠久，夢幻天堂。',
    },
    {
      src: 'https://images.unsplash.com/photo-1503993656770-0479a287559e?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Second Slide',
      caption: '冰島峽谷Fjaðrárgljúfur，壯麗絕美，峽谷溪流蜿蜒，宛如仙境。',
    },
    {
      src: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=3571&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Third Slide',
      caption: '大本鐘，倫敦地標，宏偉鐘樓象徵英國歷史，日夜傳遞時光。',
    },
    {
      src: 'https://images.unsplash.com/photo-1575843456098-25dc4244e9f2?q=80&w=3732&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Third Slide',
      caption: '新港，哥本哈根迷人運河，色彩繽紛建築與咖啡廳詩意交融。',
    },
    {
      src: 'https://images.unsplash.com/photo-1590301729964-23833732ee04?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Third Slide',
      caption: '紫禁城故宮，中國古代皇宮，建築宏偉，歷史文化遺產瑰寶。',
    },
    
  ]

  const campaigns = [
    {
      id: 1,
      image: '/assets/images/campaign/campaign-1.jpg',
      name: 'First Slide',    
    },
    {
      id: 2,
      image: '/assets/images/campaign/campaign-2.png',
      name: 'Second Slide',    
    },
    {
      id: 3,
      image: '/assets/images/campaign/campaign-3.png',
      name: 'Third Slide',    
    },
    {
      id: 4,
      image: '/assets/images/campaign/campaign-5.png',
      name: 'Fourth Slide',    
    },
    {
      id: 5,
      image: '/assets/images/campaign/campaign-4.png',
      name: 'Fifth Slide',    
    },
    {
      id: 6,
      image: '/assets/images/campaign/campaign-6.png',
      name: 'Sixth Slide',    
    },
    
  ]
    
  

  return (
    <div className="home-page-container">
      <Header />
      <main>
        <div className="homepage-image-carousel">
          {<ImageCarousel items={Locationscarousel} />}
        </div>
        <div className="campaign-card-container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={-30}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {campaigns.map((campaign) => (
              <SwiperSlide key={campaign.id}>
                <CampaignCardItem campaign={campaign} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="homepage-activities-information">
          <h2>
            <FontAwesomeIcon icon={faCrosshairs} /> 全球人氣旅遊體驗
          </h2>
          <p>踏旅嚴選全球熱門旅遊體驗，讓你輕鬆探索世界，享受精彩旅程。</p>
          <div className="activities-page__card-container">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={-40}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {activities.map((activity) => (
                <SwiperSlide key={activity.id}>
                  <CardItem
                    buttonText="深入瞭解"
                    image={
                      `${apiClient.defaults.baseURL.replace(/\/$/, '')}${activity.images?.[2]?.image_url}` ||
                      '/default-image.jpg'
                    }
                    title={activity.name}
                    subtitle={activity.category.name}
                    description={activity.description}
                    id={activity.id}
                    cardLink={`/activities/${activity.id}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="homepage-products-information">
          <h2>
            <FontAwesomeIcon icon={faShoppingCart} /> 踏旅熱門推薦商品
          </h2>
          <p>藝文票券、都市探索，各種熱門票券滿足你的渴望，迎接難忘旅程。</p>
          <div className="products-page__card-container">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={-40}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <CardItem
                    buttonText="深入瞭解"
                    image={
                      `${apiClient.defaults.baseURL.replace(/\/$/, '')}${product.images?.[0]?.image_url}` ||
                      '/default-image.jpg'
                    }
                    title={product.name}
                    subtitle={product.category.name}
                    description={product.description}
                    id={product.id}
                    cardLink={`/products/${product.id}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="homepage-locations-information">
          <h2>
            <FontAwesomeIcon icon={faLocationDot} /> 下次旅程必選目的地
          </h2>
          <p>
            山海相伴、靜謐村莊或充滿歷史氣息的古城，提供休閒與探險的完美平衡，迎接難忘旅程。
          </p>
          <div className="locations-page__card-container">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={-40}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {locations.map((location) => (
                <SwiperSlide key={location.id}>
                  <LocationCardItem
                    buttonText="探索景點"
                    image={
                      `${apiClient.defaults.baseURL.replace(/\/$/, '')}${location.images?.[1]?.image_url}` ||
                      '/default-image.jpg'
                    }
                    title={location.name}
                    subtitle={
                      location.description
                    ?`${location.description.slice(0, 55)}...`
                    :'無描述'
                    }
                    id={location.id}
                    cardLink={`/locations/${location.id}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Homepage
