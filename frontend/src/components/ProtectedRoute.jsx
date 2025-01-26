// 受保護檔案的路由
import { Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth()

  if (isLoading) {
    return <div>檢查登入狀態中...</div>
  }

  return isLoggedIn ? children : <Navigate to="/login" />
}

export default ProtectedRoute
