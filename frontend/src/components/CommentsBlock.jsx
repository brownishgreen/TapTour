import { useState } from 'react'
import CommentCard from './CommentCard'
import { useAuth } from './context/AuthContext'
import apiClient from '../api/apiClient'
import ConfirmModal from './modal/ConfirmModal'
import SuccessModal from './modal/SuccessModal'
import ErrorModal from './modal/ErrorModal'

const CommentsBlock = ({ comments = [], onCommentDeleted }) => {
  const { user, isAdmin } = useAuth()
  const [selectedCommentId, setSelectedCommentId] = useState(null) // 記錄要刪除的留言 ID

  // Modal 狀態
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // 當使用者點擊刪除時，顯示確認 Modal
  const confirmDelete = (commentId) => {
    setSelectedCommentId(commentId) // 記錄要刪除的留言
    setShowConfirm(true) // 打開確認 Modal
  }

  const handleDelete = async () => {
    if (!selectedCommentId) return // 防止錯誤執行
    console.log(user.token)
    console.log(user)
    try {
      await apiClient.delete(`/api/comments/${selectedCommentId}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      onCommentDeleted(selectedCommentId)
      setSuccessMessage('您已成功刪除評論')
      setShowSuccess(true)
    } catch (error) {
      setErrorMessage('刪除評論失敗')
      setShowError(true)
      console.error('刪除評論失敗:', error)
    } finally {
      setShowConfirm(false) // 關閉確認 Modal
    }
  }

  const closeAllModals = () => {
    setShowConfirm(false)
    setShowSuccess(false)
    setShowError(false)
  }

  return (
    <div className="comments-section">
      <h3 className="comments-section__title">相關評論</h3>
      {comments.length === 0 ? (
        <p>目前沒有評論</p>
      ) : (
        <div className="comments-section__comments">
            {comments
              ?.filter(comment => comment && comment.user_id && comment.user)
              .map((comment) => {
                if (!comment?.id) {
                  console.error('無效的評論資料:', comment);
                  return null; // 確保不會渲染錯誤資料
                }
                return (
                  <CommentCard
                    key={comment.id}
                    name={comment.user.name}
                    comment={comment.content}
                    image={comment.user.image}
                    timestamp={comment.createdAt ? new Date(comment.createdAt).toLocaleString().split('T')[0] : '未知時間'}
                    isAuthor={comment.user_id === user?.id}
                    isAdmin={isAdmin}
                    onDelete={() => confirmDelete(comment.id)}
                    userId={comment.user_id}
                  />
                );
              })}
          <ConfirmModal
            show={showConfirm}
            title="確認刪除活動"
            message="此操作無法撤銷，確定要刪除嗎？"
            onClose={closeAllModals}
            onConfirm={handleDelete} // 當使用者點擊確認時，執行刪除
          />

          <SuccessModal
            show={showSuccess}
            message={successMessage}
            onClose={closeAllModals}
          />

          <ErrorModal
            show={showError}
            message={errorMessage}
            onClose={closeAllModals}
          />
        </div>
      )}
    </div>
  )
}

export default CommentsBlock