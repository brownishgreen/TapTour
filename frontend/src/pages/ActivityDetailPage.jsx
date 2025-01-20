import React from 'react'
import Header from '../components/Header'
import ImageGallery from '../components/ImageGallery'
import DetailPageTitle from '../components/DetailPageTitle'
import DetailPageIntroduction from '../components/DetailPageIntroduction'
import ActivityDetailIntroduction from '../components/ActivityDetailIntroduction.jsx'
import PriceInformation from '../components/PriceInformation'
import Footer from '../components/Footer'
import '../scss/pages/_activity-detail-page.scss'

const ActivityDetailPage = ({ isLoggedIn, setIsLoggedIn }) => {

  const images = [
    'https://plus.unsplash.com/premium_photo-1680721310335-b3518986f488?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1520986840182-5b15f734c85c?q=80&w=2078&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1533287134359-95899321af06?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1523650092835-8ff285f4fc04?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1661247375447-633f5994f0fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ]

  return (
    <div className="activity-detail-page">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="activity-detail-page__container">
        <ImageGallery images={images} />
        <div className="activity-detail-page-title-wrapper">
          <DetailPageTitle name="品味匈牙利布達佩斯：多瑙河沿岸文化巡禮" />
        </div>
        <div className="activity-detail-page__wrapper">
          <main className="activity-detail-page__main">
            <DetailPageIntroduction introduction={[
              '匈牙利布達佩斯，一個充滿歷史與文化魅力的城市，以其多瑙河沿岸的古蹟而聞名。',
              <br key="1" />,
              '這次旅行，我們將帶您深入探索這些令人驚嘆的古蹟，',
              <br key="2" />,
              '從古老的城堡到壯觀的教堂，每一處都蘊含著豐富的歷史故事。',
            ]} />
            <ActivityDetailIntroduction />
          </main>
          <aside className="activity-detail-page__aside">
            <PriceInformation price="6000" />
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ActivityDetailPage
