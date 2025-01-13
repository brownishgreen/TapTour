import React from 'react'
import '../scss/components/_header.scss'
import logo from '../assets/images/500.png'
import { Link } from 'react-router-dom'

const Header = () => {
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
    </header>
  )
}

export default Header
