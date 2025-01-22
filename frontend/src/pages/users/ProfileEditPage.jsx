// import React from 'react'
import Header from '../../components/shared/Header'
import ProfileEdit from '../../components/users/ProfileEdit'
import Footer from '../../components/shared/Footer'

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
