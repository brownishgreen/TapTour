import { Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const ConfirmModal = ({ show, onClose, onConfirm, title, message }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="modal-title-container">
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="warning-icon"
            />
            <span>{title || '確認操作'}</span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{message || '此操作無法還原，請謹慎執行。'}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onConfirm}>
          確定
        </Button>
        <Button variant="secondary" onClick={onClose}>
          取消
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmModal

// {
//   ;<Modal
//     show={showModal}
//     onHide={closeModal}
//     centered
//     dialogClassName="custom-modal"
//   >
//     <Modal.Header closeButton>
//       <Modal.Title>
//         <div className="modal-title-container">
//           {successMessage ? (
//             <>
//               <FontAwesomeIcon icon={faCheck} className="success-icon" />
//               <span>操作成功</span>
//             </>
//           ) : errorMessage ? (
//             <>
//               <FontAwesomeIcon icon={faXmark} className="error-icon" />
//               <span>操作失敗</span>
//             </>
//           ) : (
//             <span>確認刪除此用戶？</span>
//           )}
//         </div>
//       </Modal.Title>
//     </Modal.Header>
//     <Modal.Body
//       className={successMessage ? 'modal-body-success' : 'modal-body-error'}
//     >
//       {successMessage || errorMessage || '此操作無法還原，請謹慎執行。'}
//     </Modal.Body>
//     <Modal.Footer>
//       {!(successMessage || errorMessage) && (
//         <Button variant="danger" onClick={deleteUser}>
//           確定
//         </Button>
//       )}
//       <Button variant="secondary" onClick={closeModal}>
//         {successMessage || errorMessage ? '關閉' : '取消'}
//       </Button>
//     </Modal.Footer>
//   </Modal>
// }
