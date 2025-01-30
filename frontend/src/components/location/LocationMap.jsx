import React from 'react'

const LocationMap = ({ mapURL }) => {
  return (
    <div className="location-map">
      <div className="location-map__container">
        <iframe src={mapURL} width="400" height="300" style={{ border: 0, borderRadius: '12px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  )
}

export default LocationMap