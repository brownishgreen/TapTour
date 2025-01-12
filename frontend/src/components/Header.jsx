import React from 'react'
import '../scss/components/_header.scss'
import logo from '../assets/images/500.png'

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="TapTour Logo" />
        <span>TapTour</span>
      </div>
      <nav className="header__nav">
        <a href="/explore" className="header__link">探索</a>
        <a href="/trips" className="header__link">旅程</a>
        <a href="/reviews" className="header__link">評論</a>
      </nav>
      <div className="header__actions">
        <a href="/about" className="header__button">關於我們</a>
        <a href="/register" className="header__button">註冊</a>
        <a href="/login" className="header__button">登入</a>
      </div>
    </header>
  )
}

export default Header 