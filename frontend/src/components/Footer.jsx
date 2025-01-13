import React from 'react'
import '../scss/components/_footer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faInstagram,
  faFacebook,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer className="footer">
      {/*左邊的連結區塊*/}
      <div className="footer__links">
        <ul>
          <li>
            <a href="#">聯繫我們</a>
          </li>
        </ul>
        <p>COPYRIGHT © TAPTOUR ALL RIGHT RESERVED.</p>
      </div>
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
