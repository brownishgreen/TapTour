import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const SuccessModal = ({ show, onClose, message }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="modal-title-container">
            <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
            <span>操作成功</span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-success">
        {message || '操作已成功！'}
        <FontAwesomeIcon
          icon={faThumbsUp}
          style={{
            fontSize: '20px',
            color: '#54A2C0',
            cursor: 'pointer',
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onClose}>
          關閉
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SuccessModal
