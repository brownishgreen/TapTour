// import React from 'react'
import Header from '../components/Header'
import ProfileInfo from '../components/ProfileInfo'
import Footer from '../components/Footer'

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <Header />
      <main>
        <ProfileInfo />
      </main>
      <Footer />
    </div>
  )
}

export default ProfilePage
