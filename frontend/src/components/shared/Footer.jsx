import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faInstagram,
  faFacebook,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <footer className="footer">
      {/*左邊的連結區塊*/}
      <nav className="footer__links">
        <a href="#">
          聯繫我們 <FontAwesomeIcon icon={faEnvelope} />
        </a>
      </nav>

      <small className="footer__copyright">
        COPYRIGHT © TAPTOUR ALL RIGHTS RESERVED.
      </small>
      {/*右邊的SNS LINKS*/}
      <div className="footer__socials">
        <a href="#">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faXTwitter} size="2x" />
        </a>
      </div>
    </footer>
  )
}

export default Footer
