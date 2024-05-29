import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const WarningWindow = ({ show, handleClose, errorMessage }) => {
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
        {errorMessage}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WarningWindow;