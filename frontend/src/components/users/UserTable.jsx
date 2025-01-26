import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faCheck,
  faXmark,
  faBan,
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const UserTable = () => {
  const [users, setUsers] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null) // 保存要刪除的用戶 ID
  const { userId: currentUserId } = useAuth() // 使用 useAuth 中的 userId
  const navigate = useNavigate()

  // 打開彈窗
  const openModal = (userId) => {
    setSelectedUserId(userId) // 設置要刪除的用戶 ID
    setShowModal(true) // 顯示彈窗
  }

  const toggleRole = (userId, role) => {
    const isAdmin = role === 'admin' // 根據選擇的值設置是否為管理員
    axios
      .put(
        `http://localhost:3000/api/admin/users/${userId}`,
        { is_admin: isAdmin }, // 傳遞更新的角色
        { withCredentials: true } // 攜帶 Cookie
      )
      .then(() => {
        // 更新前端狀態
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, is_admin: isAdmin } : user
          )
        )
        setSuccessMessage(`已成功更改權限`)
        setShowModal(true)
      })
      .catch(() => {
        setErrorMessage('更新失敗，請稍後再試。')
        setShowModal(true)
      })
  }

  const deleteUser = () => {
    axios
      .delete(`http://localhost:3000/api/admin/users/${selectedUserId}`, {
        withCredentials: true,
      })
      .then(() => {
        // 刪除成功後，更新前端狀態，prevUsers是用戶列表的數據
        setUsers((prevUsers) =>
          // user代表每一個用戶的物件
          // 若後端的user.id !== 被點擊刪除的selectedUserId，則保留在prevUsers
          prevUsers.filter((user) => user.id !== selectedUserId)
        )
        setSuccessMessage('用戶已成功刪除！')
        setErrorMessage('')
        setShowModal(true)
      })
      .catch(() => {
        setErrorMessage('刪除用戶失敗，請稍後再試。')
        setSuccessMessage('')
        setShowModal(true)
      })
  }

  // 關閉彈窗
  const closeModal = () => {
    setShowModal(false)
    setSuccessMessage('')
    setErrorMessage('')
    setSelectedUserId(null) // 清空選中用戶 ID
  }

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/admin/users', {
        withCredentials: true,
      })
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        navigate('/')
        console.log(error)
      })
  }, [])

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>信箱</th>
            <th>註冊時間</th>
            <th>是否為管理員</th>
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
                  value={user.is_admin ? 'admin' : 'user'} // 根據當前角色設置默認值
                  onChange={(e) => toggleRole(user.id, e.target.value)} // 當選擇改變時觸發事件
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
                    style={{
                      fontSize: '20px',
                      color: 'gray',
                    }}
                  /> // 禁用刪除按鈕
                ) : (
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => openModal(user.id)}
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

      {/* 彈跳視窗 */}
      <Modal
        show={showModal}
        onHide={closeModal}
        centered
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="modal-title-container">
              {successMessage ? (
                <>
                  <FontAwesomeIcon icon={faCheck} className="success-icon" />
                  <span>操作成功</span>
                </>
              ) : errorMessage ? (
                <>
                  <FontAwesomeIcon icon={faXmark} className="error-icon" />
                  <span>操作失敗</span>
                </>
              ) : (
                <span>確認刪除此用戶？</span>
              )}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {successMessage || errorMessage || '此操作無法還原，請謹慎執行。'}
        </Modal.Body>
        <Modal.Footer>
          {!(successMessage || errorMessage) && (
            <Button variant="danger" onClick={deleteUser}>
              確定
            </Button>
          )}
          <Button variant="secondary" onClick={closeModal}>
            {successMessage || errorMessage ? '關閉' : '取消'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UserTable
