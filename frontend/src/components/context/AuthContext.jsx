import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import apiClient from '../../api/apiClient'

const AuthContext = createContext()

// 定義 AuthProvider，包裹應用程式以提供身份驗證功能
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(null)
  const [user, setUser] = useState(null) // 保存完整用戶資料
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // 更新身份驗證狀態的函數
  const handleAuthSuccess = useCallback((status, id, adminStatus) => {
    setIsLoggedIn(status)
    setUserId(id)
    setIsAdmin(adminStatus || false)
    setIsLoading(false)
  }, [])
  const isMounted = useRef(false)

  // 應用程式啟動時自動調用 verifyLogin 進行身份驗證
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      verifyLogin() // 頁面加載時檢查登錄狀態
    }
  }, []) 

  // 驗證用戶是否已登入的函數
  const verifyLogin = useCallback(async () => {
    setIsLoading(true) // 開始加載狀態
    try {
      const response = await apiClient.get('users/verify', {
        withCredentials: true,
      }) // 調用後端驗證 API
      const { userId, isAdmin, name, email, token} = response.data

      // 保存用戶完整資料 
      setUser({
        id: userId,
        name: name || '未知用戶',
        email: email || '未知郵箱',
        token: token || null,
      })
      handleAuthSuccess(true, userId, isAdmin) // 更新登錄狀態
    } catch (error) {
      if (error.response.status === 401) {
        handleAuthSuccess(false, null, false) // 更新為未登錄狀態
      }
      console.warn('未授權，清除登入狀態')
      setUser(null) // 清空用戶資料

    } finally {
      setIsLoading(false) // 結束加載狀態
    }
  }, [handleAuthSuccess])

  const logout = async () => {
    try {
      await apiClient.post('users/logout', {}, { withCredentials: true }) // 確保請求後端登出 API
      setUser(null)
      setIsLoggedIn(false)
      setUserId(null)
      setIsAdmin(false)
      navigate('/login')
    } catch (error) {
      console.error('登出失敗:', error)
    }
  }

  

  // 提供 Context 給子組件使用
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userId,
        user, // 提供完整的用戶資料
        isAdmin,
        isLoading,
        handleAuthSuccess,
        verifyLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// 使用自定義 Hook 獲取 AuthContext
export const useAuth = () => useContext(AuthContext)
