import React from 'react'




const CampaignCardItem = ({ campaign }) => {
  return (
      <div className="campaign-card">
        <img src={campaign.image} alt={campaign.name} />
      </div>
  )
}

export default CampaignCardItem
