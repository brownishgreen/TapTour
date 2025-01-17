// 受保護檔案的路由
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('http://localhost:3000/api/user/verify', {
          withCredentials: true,
        })
        setIsAuthenticated(true)
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return <div>檢查登入狀態中...</div>
  }

  return isAuthenticated ? children : <Navigate to="/login" />
}

export default ProtectedRoute
