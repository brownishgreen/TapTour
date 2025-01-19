import React from 'react'
// import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Homepage = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className="homepage">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main></main>
      <Footer />
    </div>
  )
}

export default Homepage
