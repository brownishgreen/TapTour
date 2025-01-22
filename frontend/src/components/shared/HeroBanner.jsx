import React from 'react'

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
