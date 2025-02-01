import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/shared/Header'
import SearchBar from '../components/shared/SearchBar'
import ImageCarousel from '../components/shared/ImageCarousel'
import CardItem from '../components/shared/CardItem'
import Footer from '../components/shared/Footer'

const Homepage = () => {

  // 取得活動資料
  const [activities, setActivities] = useState([])

  useEffect(() => {
    fetchActivities() // 請求活動資料
  }, [])

  // 請求活動資料
  const fetchActivities = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/activities')
      setActivities(response.data)
    } catch (error) {
      console.error('取得活動資料失敗', error)
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

  return (
    <div className="home-page-container">
      <Header />
      <main>
        <div className="homepage-search-bar">
          <SearchBar />
        </div>
        <div className="homepage-image-carousel">
          {<ImageCarousel items={Locationscarousel} />}
        </div>
        <div className="homepage-activities-information">
          <h2>熱門活動</h2>
          <div className="activities-page__card-container">
            {activities.map((activity) => (
              <CardItem
                key={activity.id}
                buttonText="深入瞭解"
                image={`http://localhost:3000${activity.images?.[1]?.image_url}` || "/default-image.jpg"}
                title={activity.name}
                subtitle={activity.category.name}
                description={activity.description}
                id={activity.id}
                activityLink={`/activities/${activity.id}`}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Homepage
