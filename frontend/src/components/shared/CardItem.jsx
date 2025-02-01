import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

const CardItem = ({ buttonText, image, title, subtitle, activityLink }) => {
  const location = useLocation()
  const isHomepage = location.pathname === '/'
  return (
    <Card className={`card-item ${isHomepage ? 'homepage-card-item' : ''}`}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted card-item__button-subtitle">{subtitle}</Card.Subtitle>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
      <div className="card-item__button">
        <Button variant="secondary" href={activityLink}>{buttonText}</Button>
      </div>
    </Card>
  )
}

export default CardItem