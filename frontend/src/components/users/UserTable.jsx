// 負責渲染使用者列表
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const UserTable = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  const toggleRole = (userId, role) => {
    const isAdmin = role === 'admin' // 根據選擇的值設置是否為管理員
    axios
      .put(
        `http://localhost:3000/api/admin/users/${userId}`, // 替換為你的 API 路徑
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
        alert('角色更新成功')
      })
      .catch((error) => {
        console.error('Failed to update role:', error)
        alert('角色更新失敗')
      })
  }

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/admin/users', {
        withCredentials: true,
      }) // 改為你的 API 路徑
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
      <table
        border="1"
        style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>信箱</th>
            <th>註冊時間</th>
            <th>是否為管理員</th>
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
                  style={{
                    padding: '5px',
                    fontSize: '14px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                  }}
                >
                  <option value="user">一般用戶</option>
                  <option value="admin">管理員</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
