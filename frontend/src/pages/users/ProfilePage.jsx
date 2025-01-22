// import React from 'react'
import Header from '../../components/shared/Header'
import ProfileInfo from '../../components/users/ProfileInfo'
import Footer from '../../components/shared/Footer'

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
