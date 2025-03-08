import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './scss/style.scss'
import RegisterPage from './pages/users/RegisterPage'
import LoginPage from './pages/users/LoginPage'
import ProfilePage from './pages/users/ProfilePage'
import AdminPage from './pages/users/AdminPage'
import Homepage from './pages/Homepage'
import NotFound from './pages/NotFound'
import AboutPage from './pages/users/AboutPage'
import ActivitiesPage from './pages/activity/ActivitiesPage'
import ManageActivityPage from './pages/activity/ManageActivityPage'
import ActivityDetailPage from './pages/activity/ActivityDetailPage'
import ProductsPage from './pages/product/ProductsPage'
import ProductDetailPage from './pages/product/ProductDetailPage'
import ManageProductPage from './pages/product/ManageProductPage'
import LocationDetailPage from './pages/location/LocationDetailPage'
import LocationsPage from './pages/location/LocationsPage'
import CreateLocation from './pages/location/CreateLocation'
import EditLocation from './pages/location/EditLocation'
import ProfileEditPage from './pages/users/ProfileEditPage'
import PaymentPage from './pages/order/PaymentPage'
import HistoryOrdersPage from './pages/order/HistoryOrdersPage'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './components/context/AuthContext'
import AuthLayout from './components/layout/AuthLayout'

import axios from 'axios'
axios.defaults.withCredentials = true //設定 Axios 預設攜帶 Cookie

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<AuthLayout />}>
            <Route path="/activities" element={<ActivitiesPage />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredAdmin={true}>
                  <AdminPage />
                </ProtectedRoute>
              }
            />

            <Route path="/activities/:id" element={<ActivityDetailPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/locations/:id" element={<LocationDetailPage />} />
            <Route path="/locations" element={<LocationsPage />} />

            <Route
              path="/payment/:orderId"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders/:userId"
              element={
                <ProtectedRoute>
                  <HistoryOrdersPage />
                </ProtectedRoute>
              }
            />

            {/* Product 傳入 mode='create' */}
            <Route
              path="/products/create"
              element={
                <ProtectedRoute requiredAdmin={true}>
                  <ManageProductPage mode="create" />
                </ProtectedRoute>
              }
            />
            {/* Product 傳入 mode='edit' */}
            <Route
              path="/products/:id/edit"
              element={
                <ProtectedRoute requiredAdmin={true}>
                  <ManageProductPage mode="edit" />
                </ProtectedRoute>
              }
            />

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
            {/* 傳入 mode='create' */}
            <Route
              path="/activities/create"
              element={
                <ProtectedRoute requiredAdmin={true}>
                  <ManageActivityPage mode="create" />
                </ProtectedRoute>
              }
            />
            {/* 傳入 mode='edit' */}
            <Route
              path="/activities/:id/edit"
              element={
                <ProtectedRoute requiredAdmin={true}>
                  <ManageActivityPage mode="edit" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/locations/create"
              element={
                <ProtectedRoute requiredAdmin={true}>
                  <CreateLocation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/locations/:id/edit"
              element={
                <ProtectedRoute requiredAdmin={true}>
                  <EditLocation />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Homepage />} />
          </Route>
          <Route path="/about" element={<AboutPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
