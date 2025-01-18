import React from 'react'
import '../scss/components/_hero-banner.scss'

const HeroBanner = ({ imageURL, title, description }) => {
  return (
    <div className="hero-banner">
      <div className="hero-banner__image">
        <img src={imageURL} alt="hero banner" />
        <div className="hero-banner__content">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
