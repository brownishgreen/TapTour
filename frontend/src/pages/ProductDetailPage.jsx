import React from 'react'
import '../scss/pages/_product-detail-page.scss'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import Footer from '../components/Footer'
import ImageGallery from '../components/ImageGallery'
import DetailPageTitle from '../components/DetailPageTitle'
import DetailPageIntroduction from '../components/DetailPageIntroduction'
import ProductFeatureList from '../components/ProductFeatureList'
import PriceInformation from '../components/PriceInformation'

const ProductDetailPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const images = [
    'https://images.unsplash.com/photo-1569789010436-421d71a9fc38?q=80&w=3685&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1596762779387-9c681b5e2818?q=80&w=5722&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1618541062548-c51c1a2d9879?q=80&w=6000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1612404730960-5c71577fca11?q=80&w=6000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1625643263245-c6d54c071ebc?q=80&w=3008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ]

  return (
    <div className="product-detail-page">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <SearchBar />
      <div className="product-detail-page__container">
        <ImageGallery images={images} />
        <div className="product-detail-page__title-wrapper">
          <DetailPageTitle name="環球影城門票 Universal Studios Japan｜日本大阪 （官方授權）" />
        </div>
        <div className="product-detail-page__wrapper">
          <main className="product-detail-page__main">
            <DetailPageIntroduction introduction={[
              '日本環球影城官方授權門票，中文介面讓您輕鬆訂購，',
              <br key="1" />,
              '在 TapTour 訂購後立即取得電子門票，現場掃 QR code 即可入園遊玩。',
              <br key="2" />,
              '有效期限內，可依照日本環球影城月曆中相同票種之日期入園，保有行程絕佳彈性！',
              <br key="3" />,
              '日本環球影城門票＋超級任天堂世界™ 園區保證入場套票，輕鬆玩轉瑪利歐世界。',
              <br key="4" />,
              '更多細節請見日本環球影城攻略',
            ]} />
            <ProductFeatureList features={[
              '日本環球影城官方授權門票，中文介面讓您輕鬆訂購',
              '訂購日本環球影城門票後可立即拿到電子門票，掃 QR code 即可入園遊玩',
              '有效期限內，可依照日本環球影城月曆中相同票種之日期入園，保有行程絕佳彈性',
              '日本環球影城門票＋超級任天堂世界™ 園區保證入場套票，輕鬆玩轉瑪利歐世界',
            ]} />
          </main>
          <aside className="product-detail-page__aside">
            <PriceInformation price="1790" />
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  )

}

export default ProductDetailPage
