import React from 'react'
import logo from '../../assets/images/500.png'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faCrosshairs,
  faShoppingCart,
  faComment,
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const { isLoggedIn, userId, handleAuthSuccess } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/users/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      handleAuthSuccess(false, null)
      navigate('/login')
    } catch (err) {
      alert('登出失敗，請稍後再試')
    }
  }

  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="TapTour Logo" />
        <span>TapTour</span>
        <nav className="header__nav">
          <Link to="/explore" className="header__link">
            探索活動 <FontAwesomeIcon icon={faCrosshairs} />
          </Link>
          <Link to="/trips" className="header__link">
            行旅通享 <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
          <Link to="/reviews" className="header__link">
            評論 <FontAwesomeIcon icon={faComment} />
          </Link>
        </nav>
      </div>
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
                <Link className="dropdown-item" to={`/users/${userId}/profile`}>
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
                <button className="dropdown-item" onClick={handleLogout}>
                  登出
                </button>
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
