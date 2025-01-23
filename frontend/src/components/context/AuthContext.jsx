import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(null)

  const handleAuthSuccess = useCallback((status, id) => {
    setIsLoggedIn(status)
    setUserId(id)
  }, [])

  const verifyLogin = useCallback(async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/users/verify',
        { withCredentials: true }
      )
      handleAuthSuccess(true, response.data.userId)
    } catch (error) {
      handleAuthSuccess(false, null)
    }
  }, [handleAuthSuccess])

  useEffect(() => {
    verifyLogin() // 在應用啟動時檢查登入狀態
  }, [verifyLogin])

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userId, handleAuthSuccess, verifyLogin }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
