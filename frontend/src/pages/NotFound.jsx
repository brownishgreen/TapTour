import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'

const NotFound = () => {
  return (
    <div className="page">
      <Header />
      <main>
        <div className="error-page__image">
          <img
            className="blur-border"
            src="/assets/images/backgrounds/error-page.png"
            alt=""
          />
        </div>
      </main>
      <Link to="/" className="primary-button error-page-btn">
        <span>Back To Home</span>
        <FontAwesomeIcon icon={faHouse} />
      </Link>

      <Footer />
    </div>
  )
}

export default NotFound
