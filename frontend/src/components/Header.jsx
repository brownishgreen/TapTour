import React from 'react'
import '../scss/components/_header.scss'
import logo from '../assets/images/500.png'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Header = ({ isLoggedIn, user }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="TapTour Logo" />
        <span>TapTour</span>
      </div>
      <nav className="header__nav">
        <Link to="/explore" className="header__link">
          探索
        </Link>
        <Link to="/trips" className="header__link">
          旅程
        </Link>
        <Link to="/reviews" className="header__link">
          評論
        </Link>
      </nav>
      <div className="header__actions">
        {isLoggedIn ? (
          <div className="dropdown">
            <button
              className="btn dropdown-toggle account-icon-btn"
              type="button"
              id="userMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faUser} className="user-icon" />
            </button>
            <ul className="dropdown-menu" aria-labelledby="userMenuButton">
              <li>
                <Link className="dropdown-item" to="/profile">
                  個人資料
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/orders">
                  歷史訂單
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/about">
                  關於我們
                </Link>
              </li>
              <li>
                <button className="dropdown-item">登出</button>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <Link to="/about" className="header__button">
              關於我們
            </Link>
            <Link to="/register" className="header__button">
              註冊
            </Link>
            <Link to="/login" className="header__button">
              登入
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
