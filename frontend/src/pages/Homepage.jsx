import { useEffect } from 'react'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'
import { useAuth } from '../components/context/AuthContext'

const Homepage = () => {
  const { verifyLogin } = useAuth()
  useEffect(() => {
    verifyLogin() // 在頁面加載時檢查登入狀態
  }, [verifyLogin])
  return (
    <div className="homepage">
      <Header />
      <main></main>
      <Footer />
    </div>
  )
}

export default Homepage
