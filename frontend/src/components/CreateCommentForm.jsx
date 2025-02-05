import { useState } from 'react'
import apiClient from '../api/apiClient'

const CreateCommentForm = ({ entityId, entityType, onCommentAdded, verifyLogin }) => {

  const [content, setContent] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setErrorMessage('請輸入評論內容')
      return;
    }

    setLoading(true)

    try {
      await apiClient.post('api/comments', {
        content,
        [`${entityType}_id`]: entityId,  // 動態選擇實體 ID，例如 activity_id, product_id
      }
      );

      console.log('評論已成功提交')

      setContent('')
      setErrorMessage('')
      onCommentAdded() // 新增成功後，觸發父元件畫面更新
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
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="分享您的想法..."
      />
      {errorMessage && <p className="create-comment-form__error-message">{errorMessage}</p>}
      <button type="submit" className="create-comment-form__button">提交評論</button>
    </form>
  );
};

export default CreateCommentForm;
