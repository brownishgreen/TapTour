import React from 'react'
import { Card, Button } from 'react-bootstrap'

const CardItem = ({ buttonText, image, title, subtitle, description }) => {
  return (
    <Card className="card-item">
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Button variant="secondary">{buttonText}</Button>
      </Card.Body>
    </Card>
  )
}

export default CardItem