import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DefenderForm from '../forms/DefenderForm';

const AddDefender = ({
  showModal,
  handleCloseModal,
  handleInputChange,
  handleSaveChanges,
  formData
}) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить нового участника</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <DefenderForm formData={formData} handleInputChange={handleInputChange} />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleSaveChanges}>Сохранить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDefender;