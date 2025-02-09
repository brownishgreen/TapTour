import React, { useState, useEffect } from 'react'
import CommentCard from './CommentCard'
import { useAuth } from './context/AuthContext'
import apiClient from '../api/apiClient'


const CommentsBlock = ({ comments }) => {
  const { user, isAdmin } = useAuth()
  const [localComments, setLocalComments] = useState(comments)

  const handleDelete = async (commentId) => {
    try {
      await apiClient.delete(`/api/comments/${commentId}`)
      setLocalComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId))
    } catch (error) {
      console.error('刪除評論失敗:', error)
    }
  }

  const handleNewComment = (newComment) => {
    setLocalComments((prevComments) => [newComment, ...prevComments])
  }

  return (
    <div className="comments-section">
      <h3 className="comments-section__title">相關評論</h3>
      {localComments.length === 0
        ? (<p>目前沒有評論</p>)
        : (
          <div className="comments-section__comments">
            {localComments.map((comment) => {
              if (!comment || !comment.user_id || !comment.user) {
                console.error('發現不完整的評論資料：', comment)
                return null
              }
              return (
                <CommentCard
                  key={comment.id}
                  name={comment.user_id.name}
                  comment={comment.content}
                  image={comment.user.image}
                  timestamp={comment.createdAt}
                  isAuthor={comment.user_id.id === user.id}
                  isAdmin={isAdmin}
                  onDelete={() => handleDelete(comment.id)}
                />
              )
            })}
          </div>
        )
      }
    </div>
  )
}

export default CommentsBlock