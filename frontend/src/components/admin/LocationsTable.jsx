import { useEffect, useState } from 'react'
import apiClient from '../../api/apiClient'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import ConfirmModal from '../modal/ConfirmModal'
import SuccessModal from '../modal/SuccessModal'
import ErrorModal from '../modal/ErrorModal'
import { Link } from 'react-router-dom'

const LocationsTable = () => {
  const [locations, setLocations] = useState([])
  const [selectedLocationId, setSelectedLocationId] = useState(null)

  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    apiClient
      .get('locations')
      .then((response) => {
        if (Array.isArray(response.data.locations)) {
          setLocations(response.data.locations)
        } else {
          console.error(
            '後端返回的 locations 格式不是數組:',
            response.data.locations
          )
          setLocations([])
        }
      })
      .catch((error) => {
        console.error('無法加載景點數據:', error)
        setShowError(true)
      })
  }, [])

  const openConfirmModal = (locationId) => {
    setSelectedLocationId(locationId)
    setShowConfirm(true)
  }

  const deleteLocation = () => {
    apiClient
      .delete(`locations/${selectedLocationId}`, {
        withCredentials: true,
      })
      .then(() => {
        setLocations((prevLocations) =>
          prevLocations.filter((location) => location.id !== selectedLocationId)
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
    setSelectedLocationId(null)
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>景點</th>
            <th>描述</th>
            <th>編輯</th>
            <th>刪除</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.id}>
              <td>{location.id}</td>
              <td className="text-left">{location.name}</td>
              <td className="text-left">
                {location.description.length > 30
                  ? `${location.description.substring(0, 30)}   ...`
                  : location.description}
              </td>
              <td>
                <Link to={`/locations/${location.id}/edit`}>
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
                  onClick={() => openConfirmModal(location.id)}
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
        title="確認刪除景點"
        message="此操作無法撤銷，確定要刪除嗎？"
        onClose={closeAllModals}
        onConfirm={deleteLocation}
      />

      <SuccessModal
        show={showSuccess}
        message="景點已成功刪除！"
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

export default LocationsTable
