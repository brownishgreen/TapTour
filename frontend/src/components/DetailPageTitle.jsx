import React from 'react'
import '../scss/components/_detail-page-title.scss'

const DetailPageTitle = ({ name }) => {
  return (
    <div className="detail-page-title">
      <h1>{name}</h1>
    </div>
  )
}

export default DetailPageTitle