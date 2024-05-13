import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import DefenderForm from '../forms/DefenderForm';

const AddDefender = ({
  showModal,
  handleCloseModal,
  formData,
  handleInputChange,
  handleSaveChanges
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
        <Button variant="primary" onClick={() => handleSaveChanges(formData)}>
          Сохранить изменения
        </Button>
        <Button variant="secondary" onClick={handleCloseModal}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDefender;