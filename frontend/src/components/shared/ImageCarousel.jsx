import React from 'react'
import { Carousel } from 'react-bootstrap'

const ImageCarousel = ({ items }) => {
  return (
    <Carousel className="custom-carousel">
      {items.map((item, index) => (
        <Carousel.Item key={index} className="custom-carousel-item">
          <img
            className="custom-carousel-image d-block w-100"
            src={item.src}
            alt={item.alt}
          />
          <Carousel.Caption className="custom-carousel-caption">
            <h3>{item.caption}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ImageCarousel
