import { useEffect } from 'react'
import Header from '../../components/shared/Header.jsx'
import Footer from '../../components/shared/Footer.jsx'
import ActivityForm from '../../components/activity/ActivityForm.jsx'
import { useAuth } from '../../components/context/AuthContext.jsx'

const ManageActivityPage = ({ mode }) => {
  const { verifyLogin } = useAuth()

  useEffect(() => {
    verifyLogin() // 在頁面加載時檢查登入狀態
  }, [verifyLogin])

  return (
    <div className="manage-activity-page">
      <Header />
      <div className="manage-activity-page__container create-activity-background">
        <h1>{mode === 'edit' ? '編輯活動' : '新增活動'}</h1>
        <div className="manage-activity-page__form">
          <ActivityForm mode={mode} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ManageActivityPage