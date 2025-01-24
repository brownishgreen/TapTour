import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const UserTable = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/admin/users', {
        withCredentials: true,
      }) // 改為你的 API 路徑
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.error('Failed to fetch users:', error)
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
                {' '}
                {user.is_admin ? (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{ color: '#28a745', fontSize: '20px' }} // 綠色是管理員
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    style={{ color: '#dc3545', fontSize: '20px' }} // 紅色不是管理員
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
