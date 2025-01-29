import React from 'react'
import { Card, Button } from 'react-bootstrap'

const CardItem = ({ buttonText, image, title, subtitle,activityLink}) => {
  return (
    <Card className="card-item">
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