import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'

function AuthLayout() {
  const { verifyLogin } = useAuth()
  useEffect(() => {
    verifyLogin()
    console.log('verifyLogin')
  }, [])
  return (
    <>
      <Outlet />
    </>
  )
}

export default AuthLayout