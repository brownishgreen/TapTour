import React from 'react'

const ImageGallery = ({ images }) => {
  return (
    <div className="image-gallery">
      <div className="image-gallery__container">
        <div className="image-gallery__main">
          <img src={images[0]} alt="Main gallery" />
        </div>
        <div className="image-gallery__grid">
          <div className="image-gallery__grid-top">
            <img src={images[1]} alt="Gallery 1" />
            <img src={images[2]} alt="Gallery 2" />
          </div>
          <div className="image-gallery__grid-bottom">
            <img src={images[3]} alt="Gallery 3" />
            <img src={images[4]} alt="Gallery 4" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageGallery