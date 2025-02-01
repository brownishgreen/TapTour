import { Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const ErrorModal = ({ show, onClose, message }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="modal-title-container">
            <FontAwesomeIcon icon={faTimesCircle} className="error-icon" />
            <span>操作失敗</span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-error">
        {message || '發生錯誤，請稍後再試。'}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          關閉
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ErrorModal
