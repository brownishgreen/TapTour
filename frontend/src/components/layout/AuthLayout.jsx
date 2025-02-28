import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'

function AuthLayout() {
  const { verifyLogin, isLoggedIn } = useAuth()
  useEffect(() => {
    if (isLoggedIn) {
      verifyLogin()
    }
  }, [])
  return (
    <>
      <Outlet />
    </>
  )
}

export default AuthLayout