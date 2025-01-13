import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
// import Header from './components/Header'
// import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>首頁</h1>} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}

export default App
