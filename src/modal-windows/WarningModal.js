import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const WarningModal = ({ show, handleClose }) => {
  return (
    <Modal 
        show={show} 
        onHide={handleClose} 
        className=""
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
      <Modal.Header closeButton>
        <Modal.Title>Предупреждение</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Нет изменений для сохранения.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WarningModal;