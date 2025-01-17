import React from 'react'
import '../scss/components/_card-item.scss'
import { Card, Button } from 'react-bootstrap'
import '../scss/pages/_activities.scss'

const CardItem = () => {
  return (
    <Card className="card-item">
      <Card.Img variant="top" src="https://images.unsplash.com/photo-1735506266367-d6941df3efdc?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <Card.Body>
        <Card.Title>Activity Title</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Subtitle</Card.Subtitle>
        <Card.Text>Description</Card.Text>
        <Button variant="secondary">深入瞭解</Button>
      </Card.Body>
    </Card>
  )
}

export default CardItem