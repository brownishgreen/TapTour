import React from 'react';
import { useNavigate } from 'react-router-dom';

const RelatedCard = ({ activityId, image, title, description }) => {
  const navigate = useNavigate();
  return (
    <div className="related-card" key={activityId}>
      <div className="related-card__image-wrapper">
        <img src={image} alt="Related Card" />
      </div>
      <div className="related-card__content">
        <h3>{title}</h3>
        <p className="related-card__description">{description}</p>
        <button className="small-button" onClick={() => navigate(`/activities/${activityId}`)}>了解更多</button>
      </div>
    </div>
  );
};

export default RelatedCard;