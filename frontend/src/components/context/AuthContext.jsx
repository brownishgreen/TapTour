import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react'
import apiClient from '../../api/apiClient'


const AuthContext = createContext()

// 定義 AuthProvider，包裹應用程式以提供身份驗證功能
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // 更新身份驗證狀態的函數
  const handleAuthSuccess = useCallback((status, id, adminStatus) => {
    setIsLoggedIn(status)
    setUserId(id)
    setIsAdmin(adminStatus || false)
    setIsLoading(false)
  }, [])

  // 應用程式啟動時自動調用 verifyLogin 進行身份驗證
  useEffect(() => {
    verifyLogin()
  }, [userId])

  // 驗證用戶是否已登入的函數
  const verifyLogin = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await apiClient.get('api/users/verify')
      const { userId, isAdmin } = response.data
      handleAuthSuccess(true, userId, isAdmin)
    } catch (error) {
      console.log(error)
      handleAuthSuccess(false, null, false)
    }
  }, [handleAuthSuccess])

  // 提供 Context 給子組件使用
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userId,
        isAdmin,
        isLoading,
        handleAuthSuccess,
        verifyLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
