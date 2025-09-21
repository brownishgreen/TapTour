import { useEffect, useState } from 'react'
import apiClient from '../../api/apiClient'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import ConfirmModal from '../modal/ConfirmModal'
import SuccessModal from '../modal/SuccessModal'
import ErrorModal from '../modal/ErrorModal'
import { Link } from 'react-router-dom'

const ActivitiesTable = () => {
  const [activities, setActivities] = useState([])
  const [selectedActivityId, setSelectedActivityId] = useState(null)

  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    apiClient
      .get('activities')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setActivities(response.data)
        } else {
          console.error('後端返回的 activities 格式不是數組:', response.data)
          setActivities([])
        }
      })
      .catch((error) => {
        console.error('無法加載活動數據:', error)
        setShowError(true)
      })
  }, [])

  const openConfirmModal = (activityId) => {
    setSelectedActivityId(activityId)
    setShowConfirm(true)
  }

  const deleteActivity = () => {
    apiClient
      .delete(`activities/${selectedActivityId}`)
      .then(() => {
        setActivities((prevActivities) =>
          prevActivities.filter(
            (activity) => activity.id !== selectedActivityId
          )
        )
        setShowConfirm(false)
        setShowSuccess(true)
      })
      .catch(() => {
        setShowError(true)
      })
  }

  const closeAllModals = () => {
    setShowConfirm(false)
    setShowSuccess(false)
    setShowError(false)
    setSelectedActivityId(null)
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>活動</th>
            <th>描述</th>
            <th>編輯</th>
            <th>刪除</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td>{activity.id}</td>
              <td className="text-left">{activity.name}</td>
              <td className="text-left">
                {activity.description.length > 30
                  ? `${activity.description.substring(0, 30)}   ...`
                  : activity.description}
              </td>
              <td>
                <Link to={`/activities/${activity.id}/edit`}>
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{
                      fontSize: '20px',
                      color: '#999',
                      cursor: 'pointer',
                    }}
                  />
                </Link>
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => openConfirmModal(activity.id)}
                  style={{
                    fontSize: '20px',
                    color: '#FF6B6B',
                    cursor: 'pointer',
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmModal
        show={showConfirm}
        title="確認刪除活動"
        message="此操作無法撤銷，確定要刪除嗎？"
        onClose={closeAllModals}
        onConfirm={deleteActivity}
      />

      <SuccessModal
        show={showSuccess}
        message="活動已成功刪除！"
        onClose={closeAllModals}
      />

      <ErrorModal
        show={showError}
        message="刪除失敗，請稍後再試。"
        onClose={closeAllModals}
      />
    </div>
  )
}

export default ActivitiesTable
