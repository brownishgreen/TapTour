import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { getImageUrl } from '../utils/imageHelper'
const CommentCard = ({ name, comment, image, timestamp, isAuthor, isAdmin, onDelete, userId }) => {
  return (
    <div className="comment-card">
      <div className="comment-card__container">
        <div className="comment-card__comment">
          <div className="comment-card__comment-header">
            <div className="comment-card__comment-header-left">
              <div className="comment-card__comment-header-left-avatar">
                <Link to={`/users/${userId}/profile`}>
                  <img src={getImageUrl(image, 'default-avatar.jpg')} alt="Avatar" />
                </Link>
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
                {(isAuthor || isAdmin) && (
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