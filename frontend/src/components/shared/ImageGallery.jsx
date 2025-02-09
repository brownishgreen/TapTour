import apiClient from '../../api/apiClient'

const ImageGallery = ({ images }) => {
  if (!images || images.length === 0) {
    return null
  }

  const underBuildImage = '/assets/images/others/under-build.png'
  return (
    <div className="image-gallery">
      <div className="image-gallery__container">
        <div className="image-gallery__main">
          <img
            src={
              images[0]?.image_url
                ? `http://localhost:3000${images[0].image_url}`
                : underBuildImage
            }
            alt="Main gallery"
          />
        </div>
        <div className="image-gallery__grid">
          <div className="image-gallery__grid-top">
            <img
              src={
                images[1]?.image_url
                  ? `http://localhost:3000${images[1].image_url}`
                  : underBuildImage
              }
              alt="Gallery 1"
            />
            <img
              src={
                images[2]?.image_url
                  ? `http://localhost:3000${images[2].image_url}`
                  : underBuildImage
              }
              alt="Gallery 2"
            />
          </div>
          <div className="image-gallery__grid-bottom">
            <img
              src={
                images[3]?.image_url
                  ? `http://localhost:3000${images[3].image_url}`
                  : underBuildImage
              }
              alt="Gallery 3"
            />
            <img
              src={
                images[4]?.image_url
                  ? `http://localhost:3000${images[4].image_url}`
                  : underBuildImage
              }
              alt="Gallery 4"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageGallery
