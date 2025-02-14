import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const   CardItem = ({ buttonText, image, title, subtitle, cardLink }) => {
  const location = useLocation()
  const isHomepage = location.pathname === '/'

  return (
    <Card className={`card-item ${isHomepage ? 'homepage-card-item' : ''}`}>
      <Card.Img variant="top" src={image} alt={title} className="card-item__top" />
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted card-item__button-subtitle">{subtitle}</Card.Subtitle>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
      <div className="card-item__button">
        <button className="favorite-button">
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <Link to={cardLink}>
          <Button variant="secondary">{buttonText}</Button>
        </Link>
      </div>
    </Card>
  )
}

export default CardItem