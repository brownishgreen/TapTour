import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ImageGallery from '../components/ImageGallery'
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
      <main className="activity-detail-page__main">
        <ImageGallery images={images} />
      </main>
      <Footer />
    </div>
  )
}

export default ActivityDetailPage
