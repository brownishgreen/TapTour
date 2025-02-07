import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const LocationCardItem = ({ buttonText, image, title, subtitle, cardLink }) => {
  const location = useLocation()
  const isHomepage = location.pathname === '/'
  return (
    <Card className={`card-item ${isHomepage ? 'homepage-card-item' : ''}`}>
      <Card.Img variant="top" src={image} alt={title} className="card-item__top" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="
        mb-2 text-muted card-item__button-subtitle">{subtitle}</Card.Subtitle>
      </Card.Body>
      <div className="card-item__button">
        <Link to={cardLink}>
          <Button variant="secondary">{buttonText}</Button>
        </Link>
      </div>
    </Card>
  )
}

export default LocationCardItem