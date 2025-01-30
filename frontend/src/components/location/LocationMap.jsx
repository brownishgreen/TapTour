const apiKey = import.meta.env.VITE_GOOGLE_API_KEY

const LocationMap = ({ latitude, longitude }) => {
  if (!latitude || !longitude) {
    return <p>無法顯示地圖，缺少經緯度資訊。</p>
  }
  const embeddedMapURL = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}`

  return (
    <div className="location-map">
      <div className="location-map__container">
        <iframe
          src={embeddedMapURL}
          width="400"
          height="300"
          style={{
            border: 0,
            borderRadius: '12px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  )
}

export default LocationMap
