import { useState } from 'react'
import apiClient from '../api/apiClient'
import { useAuth } from './context/AuthContext'
import ErrorModal from './modal/ErrorModal'

const CreateCommentForm = ({ entityId, entityType, onCommentAdded }) => {
  const [commentContent, setCommentContent] = useState('')
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!commentContent.trim()) {
      setErrorMessage('請輸入評論內容')
      setShowError(true)
      return
    }

    setLoading(true)

    try {
      // 發送請求到後端
      const response = await apiClient.post('comments', {
        content: commentContent,
        [`${entityType}_id`]: entityId, // 動態選擇實體 ID，例如 activity_id, product_id
      })

      // 從後端返回的最新留言資料
      const createdComment = response.data

      // 樂觀更新：先更新畫面，立即顯示新評論
      onCommentAdded({
        ...createdComment,
        user_id: { id: user.id, name: user.name },
        user: { image: user.image },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      setCommentContent('')
      setErrorMessage('')
    } catch (err) {
      console.error('新增評論失敗', err)
      setErrorMessage('無法新增評論，請稍後再試')
      setShowError(true)
    }
  }

  const closeAllModals = () => {
    setShowError(false)
  }

  return (
    <form onSubmit={handleSubmit} className="create-comment-form">
      <h3 className="create-comment-form__title">新增評論</h3>
      <textarea
        className="create-comment-form__textarea"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder="分享您的想法..."
      />
      <button type="submit" className="create-comment-form__button">
        提交評論
      </button>

      <ErrorModal
        show={showError}
        message={errorMessage}
        onClose={closeAllModals}
      />
    </form>
  )
}

export default CreateCommentForm
