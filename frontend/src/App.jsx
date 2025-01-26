import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import RegisterPage from './pages/users/RegisterPage'
import LoginPage from './pages/users/LoginPage'
import ProfilePage from './pages/users/ProfilePage'
import AdminPage from './pages/users/AdminPage'
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
import { AuthProvider } from './components/context/AuthContext'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route
            path="/activity-page" //之後要改成動態 /activities/:id
            element={<ActivityDetailPage />}
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product-page" element={<ProductDetailPage />} />
          <Route path="/location-page" element={<LocationDetailPage />} />
          <Route
            path="/users/:userId/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:userId/profile/edit"
            element={
              <ProtectedRoute>
                <ProfileEditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-activity"
            element={
              <ProtectedRoute>
                <CreateActivityFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-activity"
            element={
              <ProtectedRoute>
                <EditActivityPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
