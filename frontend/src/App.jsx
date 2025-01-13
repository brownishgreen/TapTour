import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegisterForm from './components/RegisterForm'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Header /> 
      <RegisterForm /> 
      <Footer /> 
    </div>
  )
}

export default App
