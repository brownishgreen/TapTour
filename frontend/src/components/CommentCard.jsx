import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

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
                <p>寫於  {timestamp}</p>
              </div>

              <div className="comment-card__comment-header-right-delete">
                {isAuthor || isAdmin && (
                  <button onClick={onDelete}>
                    <FontAwesomeIcon icon={faTrashAlt} /> 刪除
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentCard