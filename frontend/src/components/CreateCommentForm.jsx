import { useState } from 'react'
import apiClient from '../api/apiClient'
import { useAuth } from './context/AuthContext'

const CreateCommentForm = ({ entityId, entityType, onCommentAdded}) => {

  const [commentContent, setCommentContent] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentContent.trim()) {
      setErrorMessage('請輸入評論內容')
      return;
    }

    // 模擬新留言資料
    const newComment = {
      id: Date.now(), //temporary id
      content: commentContent,
      user_id: user.id,
      userImage: user.image,
      userName: user.name,
      createdAt: new Date().toISOString(),
    }

    setLoading(true)

    try {

      // 發送請求到後端
      const response = await apiClient.post('api/comments', {
        content: commentContent,
        [`${entityType}_id`]: entityId, // 動態選擇實體 ID，例如 activity_id, product_id
      })

      // 從後端返回的最新留言資料
      const createdComment = response.data

      // 更新到本地狀態並即時顯示
      onCommentAdded({
        ...createdComment,
        user_id: { id: user.id, name: user.name },  // 加入用戶資訊
        user: { image: user.image },
      })
      
      console.log('評論已成功提交')

      setCommentContent('')
      setErrorMessage('')
    } catch (err) {
      console.error('新增評論失敗', err)
      setErrorMessage('無法新增評論，請稍後再試')
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-comment-form">
      <h3 className="create-comment-form__title">新增評論</h3>
      <textarea
        className="create-comment-form__textarea"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder="分享您的想法..."
      />
      {errorMessage && <p className="create-comment-form__error-message">{errorMessage}</p>}
      <button type="submit" className="create-comment-form__button">提交評論</button>
    </form>
  );
};

export default CreateCommentForm;
