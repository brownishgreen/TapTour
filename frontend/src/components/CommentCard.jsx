import React from 'react'

const CommentCard = ({ name, comment, image, timestamp, isAuthor, isAdmin, onDelete }) => {
  return (
    <div className="comment-card">
      <div className="comment-card__container">
        <div className="comment-card__comment">
          <div className="comment-card__comment-header">
            <div className="comment-card__comment-header-left">
              <div className="comment-card__comment-header-left-avatar">
                <img src={image} alt="Avatar" />
              </div>
              <div className="comment-card__comment-header-left-name">
                <h6>{name}</h6>
                <p>{comment}</p>
              </div>
            </div>
            <div className="comment-card__comment-header-right">
              <div className="comment-card__comment-header-right-date">
                <p>{new Date(timestamp).toLocaleString()}</p>
              </div>

              {/* 刪除按鈕，只有作者或管理員才顯示 */}
              {(isAuthor || isAdmin) && (
                <button
                  onClick={onDelete}
                  className="delete-button"
                  aria-label="Delete comment"
                >
                  ❌
                </button>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentCard