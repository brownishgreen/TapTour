import React from 'react'
import '../scss/pages/_create-activity-page.scss'
import '../scss/components/_backgrounds.scss'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import CreateActivityForm from '../components/CreateActivityForm.jsx'
const CreateActivityFormPage = () => {
  return (
    <div className="create-activity-form-page">
      <Header />
      <div className="create-activity-form-page__container create-activity-background">
        <h1>新增活動</h1>
        <div className="create-activity-form-page__form">
          <CreateActivityForm />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CreateActivityFormPage