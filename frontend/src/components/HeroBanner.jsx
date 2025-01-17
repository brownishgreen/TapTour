import React from 'react'
import '../scss/components/_hero-banner.scss'

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <div className="hero-banner__image">
        <img src="../src/assets/images/hero-banner-image.jpg" alt="hero banner" />
        <div className="hero-banner__content">
          <h1>TapTour 提供各式行程</h1>
          <p>豐富你的生活體驗，發現各地的精彩活動。</p>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
