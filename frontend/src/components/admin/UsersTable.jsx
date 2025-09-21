import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import apiClient from '../../api/apiClient'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faBan } from '@fortawesome/free-solid-svg-icons'
import ConfirmModal from '../modal/ConfirmModal'
import SuccessModal from '../modal/SuccessModal'
import ErrorModal from '../modal/ErrorModal'

const UsersTable = () => {
  const [users, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState(null)
  const { userId: currentUserId } = useAuth() // 獲取當前登入用戶的 ID
  // Modal 狀態
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    apiClient
      .get('admin/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error))
  }, []) // 管理員可以看到所有使用者

  const toggleRole = (userId, role) => {
    const isAdmin = role === 'admin'
    apiClient
      .put(`admin/users/${userId}`, { is_admin: isAdmin })
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, is_admin: isAdmin } : user
          )
        )
        setShowSuccess(true)
      })
      .catch(() => setShowError(true))
  } // 管理員將使用者切換角色

  // 確認刪除用戶
  const openConfirmModal = (userId) => {
    setSelectedUserId(userId)
    setShowConfirm(true)
  }

  const deleteUser = () => {
    apiClient
      .delete(`admin/users/${selectedUserId}`)
      .then(() => {
        // 刪除成功後，更新前端狀態，prevUsers是用戶列表的數據
        setUsers((prevUsers) =>
          // user代表每一個用戶的物件
          // 若後端的user.id !== 被點擊刪除的selectedUserId，則保留在prevUsers
          prevUsers.filter((user) => user.id !== selectedUserId)
        )
        setShowConfirm(false)
        setShowSuccess(true)
      })
      .catch(() => {
        setShowError(true)
      })
  }

  // 關閉所有 Modal
  const closeAllModals = () => {
    setShowConfirm(false)
    setShowSuccess(false)
    setShowError(false)
    setSelectedUserId(null)
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>信箱</th>
            <th>註冊時間</th>
            <th>角色</th>
            <th>刪除用戶</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.createdAt.split('T')[0]}</td>
              <td>
                <select
                  value={user.is_admin ? 'admin' : 'user'}
                  onChange={(e) => toggleRole(user.id, e.target.value)}
                  disabled={user.id === currentUserId}
                >
                  <option value="user">一般用戶</option>
                  <option value="admin">管理員</option>
                </select>
              </td>
              <td>
                {user.id === currentUserId ? (
                  <FontAwesomeIcon
                    icon={faBan}
                    style={{ fontSize: '20px', color: 'gray' }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => openConfirmModal(user.id)}
                    style={{
                      fontSize: '20px',
                      color: '#FF6B6B',
                      cursor: 'pointer',
                    }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 確認刪除用戶的 Modal */}
      <ConfirmModal
        show={showConfirm}
        title="確認刪除用戶"
        message="此操作無法撤銷，確定要刪除嗎？"
        onClose={closeAllModals}
        onConfirm={deleteUser}
      />

      {/* 成功訊息的 Modal */}
      <SuccessModal
        show={showSuccess}
        message="恭喜！您已成功更新使用者權限 "
        onClose={closeAllModals}
      />

      {/* 錯誤訊息的 Modal */}
      <ErrorModal
        show={showError}
        message="更新失敗，請稍後再試。"
        onClose={closeAllModals}
      />
    </div>
  )
}

export default UsersTable
