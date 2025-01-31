import React from 'react'
import CommentCard from './CommentCard'
const CommentsBlock = ({ comments }) => {



  return (
    <div className="comments-section">
      <h3 className="comments-section__title">相關評論</h3>
      {comments.length === 0
        ? (<p>目前沒有評論</p>)
        : (
          <div className="comments-section__comments">
            {comments.map((comment) => (
              <CommentCard
                key={comment.id}
                name={comment.user.name}
                comment={comment.content}
                image={comment.user.image}
                timestamp={comment.createdAt}
              />
            ))}
          </div>
        )
      }
    </div>
  )
}

export default CommentsBlock