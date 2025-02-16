import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import apiClient from '../../api/apiClient'
const CardItem = ({ buttonText, image, title, subtitle, cardLink, itemId, userId, itemType }) => {
  const location = useLocation()
  const isHomepage = location.pathname === '/'
  const [isFavorited, setIsFavorited] = useState(false)
  const [favoriteId, setFavoriteId] = useState(null)

  useEffect(() => {
    apiClient.get(`/api/favorites/check`, {
      params: { user_id: userId, item_id: itemId, item_type: itemType }
    })
      .then(res => res.data)
      .then(data => {
        if(data.isFavorited) {
          setIsFavorited(true)
          setFavoriteId(data.favoriteId)
        }
      })
      .catch(err => {
        console.error('Error fetching favorites:', err)
      })
  }, [itemId, itemType, userId])
  
  const handleFavoriteClick = () => {
    if(!userId) {
      alert('請先登入')
      return
    }
    if(isFavorited) {
      apiClient.delete(`/api/favorites/${favoriteId}`)
        .then(res => res.data)
        .then(data => {
          setIsFavorited(false)
          setFavoriteId(null)
        })
        .catch(err => {
          console.error('Error deleting favorite:', err)
        })
    } else {
      const favoriteData = {
        item_id: itemId,
        item_type: itemType,
        user_id: userId
      }
      apiClient.post('/api/favorites', favoriteData)
        .then(res => res.data)
        .then(data => {
          setIsFavorited(true)
          setFavoriteId(data.favorite.id || null)
        })
        .catch(err => {
          console.error('Error adding favorite:', err)
        })
    }
  }

  return (
    <Card className={`card-item ${isHomepage ? 'homepage-card-item' : ''}`}>
      <Card.Img variant="top" src={image} alt={title} className="card-item__top" />
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted card-item__button-subtitle">{subtitle}</Card.Subtitle>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
      <div className="card-item__button">
        <button className="favorite-button" onClick={handleFavoriteClick}>
          <FontAwesomeIcon icon={isFavorited ? faHeartSolid : faHeartRegular} />
        </button>
        <Link to={cardLink}>
          <Button variant="secondary">{buttonText}</Button>
        </Link>
      </div>
    </Card>
  )
} 

export default CardItem