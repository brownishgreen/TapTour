import React from 'react'

const LocationPageIntroduction = ({ introduction }) => {
  return (
    <div className="location-page-introduction">
      <div className="location-page-introduction__container">
        <h3 className="location-page-introduction__about">關於</h3>
        <p className="location-page-introduction__content">{introduction}</p>
      </div>
    </div>

  )
}

export default LocationPageIntroduction