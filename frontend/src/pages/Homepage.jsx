import React from 'react'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true) //假設已登入
  const [user, setUser] = useState({
    username: '測試用戶',
    email: 'test@test.com',
  })

  // 模擬登入狀態
  useEffect(() => {
    const token = document.cookie
      .split(';')
      .find((row) => row.startsWith('auth_token='))
    if (token) {
      setIsLoggedIn(true)
      setUser({ username: '測試用戶', email: 'test@test.com' })
    }
  }, [])

  return (
    <div className="homepage">
      <Header isLoggedIn={isLoggedIn} />
      <main>
        {isLoggedIn ? (
          <p>親愛的{user.username}，歡迎回來!</p>
        ) : (
          <p>請先登入以查看更多內容</p>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Homepage
