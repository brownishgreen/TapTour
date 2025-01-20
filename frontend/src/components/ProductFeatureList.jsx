import React from 'react'

const ProductFeatureList = ({ features }) => {
  return (
    <div className="product-feature-list">
      <ul className="feature-list">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  )
}

export default ProductFeatureList