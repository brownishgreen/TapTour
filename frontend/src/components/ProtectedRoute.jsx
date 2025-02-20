// 受保護檔案的路由
import { Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

const ProtectedRoute = ({ children, requiredAdmin }) => {
  const { isLoggedIn, isLoading, isAdmin } = useAuth()

  if (isLoading) {
    return <div>檢查登入狀態中...</div>
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  if (requiredAdmin && !isAdmin) {
    console.warn('❌ 無權限訪問此頁面，將導回首頁')
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute
