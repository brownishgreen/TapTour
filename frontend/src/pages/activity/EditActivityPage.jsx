import { useEffect } from 'react'
import Header from '../../components/shared/Header'
import Footer from '../../components/shared/Footer'
import CreateActivityForm from '../../components/activity/CreateActivityForm'
import { useAuth } from '../../components/context/AuthContext'

const EditActivityPage = () => {
  const { verifyLogin } = useAuth()
  useEffect(() => {
    verifyLogin() // 在頁面加載時檢查登入狀態
  }, [verifyLogin])
  
  return (
    <div className="create-activity-form-page">
      <Header />
      <div className="create-activity-form-page__container create-activity-background">
        <h1>編輯活動</h1>
        <div className="create-activity-form-page__form">
          <CreateActivityForm />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default EditActivityPage
