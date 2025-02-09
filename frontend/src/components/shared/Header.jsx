import logo from '../../assets/images/500.png'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCrosshairs, faShoppingCart, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import apiClient from '../../api/apiClient'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const { isLoggedIn, isLoading, isAdmin, userId, handleAuthSuccess } =
    useAuth()

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await apiClient.post(
        `api/users/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      handleAuthSuccess(false, null, false)
      navigate('/login')
    } catch (err) {
      alert('登出失敗，請稍後再試')
    }
  }

  return (
    <div>
      {isLoading ? (
        <div>載入中...</div>
      ) : (
        <header className="header">
          <div className="header__logo">
            <Link to="/">
              <img src={logo} alt="TapTour Logo" />
              <span>TapTour</span>
            </Link>
            <nav className="header__nav">
              <Link to="/activities" className="header__link">
                探索活動 <FontAwesomeIcon icon={faCrosshairs} />
              </Link>
              <Link to="/products" className="header__link">
                行旅通享 <FontAwesomeIcon icon={faShoppingCart} />
              </Link>
              <Link to="/locations" className="header__link">
                特色景點 <FontAwesomeIcon icon={faLocationDot} />
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
                    <Link
                      className="dropdown-item"
                      to={`/users/${userId}/profile`}
                    >
                      個人資料
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/orders/${userId}`}>
                    歷史訂單
                    </Link>
                  </li>
                  {isAdmin && (
                    <li>
                      <Link className="dropdown-item" to="/admin">
                        後台管理
                      </Link>
                    </li>
                  )}
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
      )}
    </div>
  )
}

export default Header
