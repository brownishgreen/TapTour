import LocationCardItem from './LocationCardItem'

const LocationsList = ({ locations }) => {
  return (
    <div className="locations-list-wrapper">
      <div className="locations-list">
        {locations.map((location) => (
          <LocationCardItem
            key={location.id}
            buttonText="查看更多"
            image={
              location.images?.length
                ? location.images.find(
                  (img) => Number(img.id) === Number(location.main_image_id) // 確保 ID 類型匹配
                )?.image_url || location.images[0].image_url                
                : '/default-image.jpg'
            }
            title={location.name}
            subtitle={
              location.description
                ? `${location.description.slice(0, 70)}...`
                : '無描述'
            }
            className="card-item"
            id={location.id}
            cardLink={`/locations/${location.id}`}
          />
        ))}
      </div>
    </div>
  )
}

export default LocationsList
