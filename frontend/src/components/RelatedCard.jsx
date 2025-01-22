import React from 'react';

const RelatedCard = ({ image, title, description }) => {
  return (
    <div className="related-card">
      <div className="related-card__image-wrapper">
        <img src={image} alt="Related Card" />
      </div>
      <div className="related-card__content">
        <h3>{title}</h3>
        <p>{description}</p>
        <button className="small-button">了解更多</button>
      </div>
    </div>
  );
};

export default RelatedCard;