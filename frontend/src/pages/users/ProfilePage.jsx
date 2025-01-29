import {useEffect} from 'react'
import Header from '../../components/shared/Header'
import ProfileInfo from '../../components/users/ProfileInfo'
import Footer from '../../components/shared/Footer'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../components/context/AuthContext'

const ProfilePage = () => {
  const { userId: contextUserId, verifyLogin } = useAuth() // 從 AuthContext 獲取 userId
  const { userId: paramUserId } = useParams() // 從 URL 參數中獲取 userId

  // 確保使用正確的 userId
  const userId = paramUserId || contextUserId
  console.log('🔍 ProfilePage - userId:', userId) // **偵錯用**

  useEffect(() => {
    if (!userId) {
      console.log('⚠️ userId 不存在，嘗試驗證登入...')
      verifyLogin() // 如果 userId 不存在，嘗試驗證登入
    }
  }, [userId, verifyLogin])

  if (!userId) {
    return <div>載入中...</div> // 在未確定 userId 前顯示載入狀態
  }

  return (
    <div className="profile-page">
      <Header />
      <main>
        <ProfileInfo userId={userId} />
      </main>
      <Footer />
    </div>
  )
}

export default ProfilePage
