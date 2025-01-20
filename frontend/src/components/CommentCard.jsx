import React from 'react'
import '../scss/components/_comment-card.scss'

const CommentsBlock = ({ name, comment, avatar, timestamp }) => {
  return (
    <div className="comment-card">
      <div className="comment-card__container">
        <div className="comment-card__comment">
          <div className="comment-card__comment-header">
            <div className="comment-card__comment-header-left">
              <div className="comment-card__comment-header-left-avatar">
                <img src={avatar} alt="Avatar" />
              </div>
              <div className="comment-card__comment-header-left-name">
                <h4>{ name }</h4>
                <p>{ comment }</p>
              </div>
            </div>
            <div className="comment-card__comment-header-right">
              <div className="comment-card__comment-header-right-date">
                <p>{ timestamp }</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentsBlock