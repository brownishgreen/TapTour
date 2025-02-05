import apiClient from '../../api/apiClient'

const ImageGallery = ({ images }) => {
  if (!images || images.length === 0) {
    return null
  }
  return (
    <div className="image-gallery">
      <div className="image-gallery__container">
        <div className="image-gallery__main">
          <img
            src={`${apiClient.defaults.baseURL.replace(/\/$/, '')}${images[0].image_url}`}
            alt="Main gallery"
          />
        </div>
        <div className="image-gallery__grid">
          <div className="image-gallery__grid-top">
            <img
              src={`${apiClient.defaults.baseURL.replace(/\/$/, '')}${images[1].image_url}`}
              alt="Gallery 1"
            />
            <img
              src={`${apiClient.defaults.baseURL.replace(/\/$/, '')}${images[2].image_url}`}
              alt="Gallery 2"
            />
          </div>
          <div className="image-gallery__grid-bottom">
            <img
              src={`${apiClient.defaults.baseURL.replace(/\/$/, '')}${images[3].image_url}`}
              alt="Gallery 3"
            />
            <img
              src={`${apiClient.defaults.baseURL.replace(/\/$/, '')}${images[4].image_url}`}
              alt="Gallery 4"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageGallery
