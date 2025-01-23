// 受保護檔案的路由
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from './context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const { isLoggedIn, handleAuthSuccess } = useAuth()

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/users/verify',
          {
            withCredentials: true,
          }
        )
        handleAuthSuccess(true, response.data.userId)
      } catch (error) {
      } finally {
        setIsLoading(false)
      }
    }

    verifyAuth()
  }, [handleAuthSuccess])

  if (isLoading) {
    return <div>檢查登入狀態中...</div>
  }

  return isLoggedIn ? children : <Navigate to="/login" />
}

export default ProtectedRoute
