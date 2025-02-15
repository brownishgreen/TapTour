import { useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('') // 捕捉搜尋輸入
  const { isLoggedIn, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation() // 取得目前路徑
  // 顯示按鈕的條件：必須是已登入且是管理員
  const showCreateButton = isLoggedIn && isAdmin

  const getCreatePagePath = () => {
    const path = location.pathname.split('/')[1] // 取得第一層路由 (例如 'locations')
    const routes = {
      activities: '/activities/create',
      products: '/products/create',
      locations: '/locations/create',
    }

    return routes[path] || '/' // 如果找不到對應的路徑，回傳 `/`
  }

  const handleSearch = (e) => {
    e.preventDefault()

    // 根據當前路徑動態判斷
    let searchPath
    if (location.pathname.startsWith('/activities')) {
      searchPath = `/activities?search=${searchTerm}`
    } else if (location.pathname.startsWith('/locations')) {
      searchPath = `/locations?search=${searchTerm}`
    } else if (location.pathname.startsWith('/products')) {
      searchPath = `/products?search=${searchTerm}`
    } else {
      // 默認的搜尋路徑
      searchPath = `/activities?search=${searchTerm}`
    }

    // 導航到相應的搜尋結果頁
    navigate(searchPath)
  }

  return (
    <div className="search-bar-wrapper">
      <Form className="search-bar-container" onSubmit={handleSearch}>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="搜尋..."
            className="search-input"
            onChange={(e) => setSearchTerm(e.target.value)} // 更新搜尋輸入值
          />
          <Button
            variant="outline-secondary"
            className="search-button"
            type="submit"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" />
          </Button>
          {showCreateButton && (
            <Button
              variant="outline-secondary"
              className="create-button"
              onClick={() => navigate(getCreatePagePath())}
            >
              <FontAwesomeIcon
                icon={faPlus}
                size="xl"
                className="create-button-icon"
              />
              新增
              {location.pathname === '/activities' && '活動'}
              {location.pathname === '/products' && '商品'}
              {location.pathname === '/locations' && '景點'}
            </Button>
          )}
        </InputGroup>
      </Form>
    </div>
  )
}

export default SearchBar
