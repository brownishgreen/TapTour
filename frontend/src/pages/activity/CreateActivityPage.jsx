import { useEffect } from 'react'
import Header from '../../components/shared/Header.jsx'
import Footer from '../../components/shared/Footer.jsx'
import CreateActivityForm from '../../components/activity/CreateActivityForm.jsx'
import { useAuth } from '../../components/context/AuthContext'

const CreateActivityPage = ({mode}) => {
  const { verifyLogin } = useAuth()

  useEffect(() => {
    verifyLogin() // 在頁面加載時檢查登入狀態
  }, [verifyLogin])

  return (
    <div className="create-activity-form-page">
      <Header />
      <div className="create-activity-form-page__container create-activity-background">
        <h1>{mode === 'edit' ? '編輯活動' : '新增活動'}</h1>
        <div className="create-activity-form-page__form">
          <CreateActivityForm mode={ mode } />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CreateActivityPage
