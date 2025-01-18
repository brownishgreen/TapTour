// import React from 'react'
import Header from '../components/Header'
import ProfileInfo from '../components/ProfileInfo'
import Footer from '../components/Footer'

const ProfilePage = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className="profile-page">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main>
        <ProfileInfo />
      </main>
      <Footer />
    </div>
  )
}

export default ProfilePage
