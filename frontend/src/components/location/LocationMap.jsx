const apiKey = import.meta.env.VITE_GOOGLE_API_KEY

const LocationMap = ({ latitude, longitude }) => {
  if (!latitude || !longitude) {
    return <p>無法顯示地圖，缺少地理位置資訊。</p>
  }

  const mapURL = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}`
  console.log(mapURL)

  return (
    <div className="location-map">
      <div className="location-map__container">
        <iframe
          src={mapURL}
          className="location-map__iframe"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  )
}

export default LocationMap
