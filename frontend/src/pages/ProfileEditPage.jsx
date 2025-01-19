// import React from 'react'
import Header from '../components/Header'
import ProfileEdit from '../components/ProfileEdit'
import Footer from '../components/Footer'

const ProfileEditPage = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className="profile-page">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main>
        <ProfileEdit />
      </main>
      <Footer />
    </div>
  )
}

export default ProfileEditPage
