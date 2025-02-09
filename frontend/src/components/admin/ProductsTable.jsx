import { useEffect, useState } from 'react'
import apiClient from '../../api/apiClient'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import ConfirmModal from '../modal/ConfirmModal'
import SuccessModal from '../modal/SuccessModal'
import ErrorModal from '../modal/ErrorModal'
import { Link } from 'react-router-dom'

const ProductsTable = () => {
  const [products, setProducts] = useState([])
  const [selectedProductId, setSelectedProductId] = useState(null)

  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    apiClient
      .get('api/products')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProducts(response.data)
        } else {
          console.error('後端返回的 product 格式不是數組:', response.data)
          setActivities([])
        }
      })
      .catch((error) => {
        console.error('無法加載活動產品數據:', error)
        setShowError(true)
      })
  }, [])

  const openConfirmModal = (productId) => {
    setSelectedProductId(productId)
    setShowConfirm(true)
  }

  const deleteProduct = () => {
    apiClient
      .delete(`api/products/${selectedProductId}`)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== selectedProductId)
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
    setSelectedProductId(null)
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>產品</th>
            <th>描述</th>
            <th>編輯</th>
            <th>刪除</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td className="text-left">{product.name}</td>
              <td className="text-left">
                {product.description.length > 30
                  ? `${product.description.substring(0, 30)}   ...`
                  : product.description.length}
              </td>
              <td>
                <Link to={`/products/${product.id}/edit`}>
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
                  onClick={() => openConfirmModal(product.id)}
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
        onConfirm={deleteProduct}
      />

      <SuccessModal
        show={showSuccess}
        message="已成功刪除產品！"
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

export default ProductsTable
