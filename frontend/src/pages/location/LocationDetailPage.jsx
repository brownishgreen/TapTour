import { useEffect } from 'react'
import Header from '../../components/shared/Header'
import SearchBar from '../../components/shared/SearchBar'
import ImageGallery from '../../components/shared/ImageGallery'
import DetailPageTitle from '../../components/DetailPageTitle'
import LocationPageIntroduction from '../../components/location/LocationPageIntroduction'
import LocationMap from '../../components/location/LocationMap'
import RelatedCard from '../../components/RelatedCard'
import CommentsBlock from '../../components/CommentCard'
import Footer from '../../components/shared/Footer'
import { useAuth } from '../../components/context/AuthContext'


const LocationDetailPage = () => {
  const { verifyLogin } = useAuth()
    useEffect(() => {
      verifyLogin() // 在頁面加載時檢查登入狀態
    }, [verifyLogin])

  const images = [
    'https://images.unsplash.com/photo-1603638710460-f20107e4ed47?q=80&w=3732&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1691334029177-906626eba8e7?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1621212909363-5575f6ebc12e?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1588446498047-3e056de77955?q=80&w=2765&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1439846583999-b988afee1b0a?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ]

  return (
    <div className="location-detail-page">
      <Header />
      <SearchBar />
      <div className="location-detail-page__container">
        <ImageGallery images={images} />
        <div className="product-detail-page__title-wrapper">
          <DetailPageTitle name="大阪" />
        </div>
        <div className="location-detail-page__wrapper">
          <main className="location-detail-page__main">
            <LocationPageIntroduction introduction={[
              '大阪是日本第三大城市，融合了傳統與現代文化，擁有豐富的美食、購物及觀光資源。',
              <br key="1" />,
              '著名景點包括大阪城、道頓堀、心齋橋商圈等，為旅遊必訪之地。',
              <br key="2" />,
              '這座城市因其「天下廚房」的美譽，提供如章魚燒、大阪燒等道地美食。',
              <br key="3" />,
              '大阪的公共交通便利，旅客可輕鬆前往周邊如京都、奈良等地，享受多元文化之旅。',
              <br key="4" />,
              '想了解更多大阪旅遊秘訣，請見我們的大阪攻略。',
            ]} />
          </main>
          <aside className="location-detail-page__aside">
            <LocationMap mapURL="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104995.0162458802!2d135.403637197352!3d34.67757047643025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e6553406e2e1%3A0xc55bc16ee46a2fe7!2z5pel5pys5aSn6Ziq5bqc5aSn6Ziq5biC!5e0!3m2!1szh-TW!2stw!4v1737363702463!5m2!1szh-TW!2stw" />
          </aside>
        </div>
        <div className="location-detail-page__related-wrapper">
          < h3 className="location-detail-page__related-cards-title" > 相關景點</h3 >
          <div className="location-detail-page__related-cards">
            <RelatedCard title="道頓崛" description="道頓崛位於日本大阪，是美食與娛樂聚集地，以霓虹燈、道頓堀川、格力高廣告牌及美味小吃聞名。" image="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTX5gLkNtSdtwpAqCcympCPUkO0-FLUcxiiiM3PgbPE00iGjBh1X01HyLltLbeEaRSpRNcv-J9Pj1YZOYNECvA4fKzPQ2fn-vv_HS-Mug" />
          </div>
          <div className="location-detail-page__related-cards">
            <RelatedCard title="環球影城" description="環球影城位於大阪，是以電影主題為特色的主題樂園，擁有哈利波特園區、刺激遊樂設施及表演活動。" image="https://i0.wp.com/sosowetalk.com/wp-content/uploads/2023/10/01-1.jpg?resize=732%2C380&ssl=1" />
          </div>
          <div className="location-detail-page__related-cards">
            <RelatedCard title="Osaka Aquarium KAIYUKAN" description="大阪海遊館是日本著名水族館，以巨大中央水槽展示海洋生態，包含鯨鯊、企鵝及多樣水生生物。" image="https://ak-d.tripcdn.com/images/0101212000f6qvubbA8BA.jpg" />
          </div>
        </div>
        <div className="location-detail-page__comments-wrapper">
          <h3 className="location-detail-page__comments-title">評論</h3>
          <CommentsBlock name="Julia" comment="Osaka is a great city! I love the food and the people are friendly." avatar="https://i.pravatar.cc/150?img=27" timestamp="2024-01-01" />
          <CommentsBlock name="John" comment="Amazing city with great transportation!" avatar="https://i.pravatar.cc/150?img=14" timestamp="2024-01-02" />
          <CommentsBlock name="Jackal" comment="How to get to the aquarium?" avatar="https://i.pravatar.cc/150?img=12" timestamp="2024-01-03" />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default LocationDetailPage

