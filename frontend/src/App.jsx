import { React, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import RegisterPage from './pages/users/RegisterPage'
import LoginPage from './pages/users/LoginPage'
import ProfilePage from './pages/users/ProfilePage'
import CreateActivityFormPage from './pages/activity/CreateActivityPage'
import EditActivityPage from './pages/activity/EditActivityPage'
import Homepage from './pages/Homepage'
import ActivitiesPage from './pages/activity/ActivitiesPage'
import ActivityDetailPage from './pages/activity/ActivityDetailPage'
import ProductsPage from './pages/product/ProductsPage'
import ProductDetailPage from './pages/product/ProductDetailPage'
import LocationDetailPage from './pages/location/LocationDetailPage'
import ProfileEditPage from './pages/users/ProfileEditPage'
import ProtectedRoute from './components/ProtectedRoute'
import axios from 'axios'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        await axios.get('http://localhost:3000/api/user/verify', {
          withCredentials: true,
        })
        setIsLoggedIn(true)
      } catch (err) {
        setIsLoggedIn(false)
      }
    }
    verifyLogin()
  }, [])
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Homepage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/activities"
          element={
            <ActivitiesPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/activity-page" //之後要改成動態 /activities/:id
          element={
            <ActivityDetailPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/products"
          element={
            <ProductsPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/product-page"
          element={
            <ProductDetailPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/location-page"
          element={
            <LocationDetailPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ProfilePage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ProfileEditPage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-activity"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CreateActivityFormPage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-activity"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <EditActivityPage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
