import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DefenderForm from '../forms/DefenderForm';

const UpdateDefender = ({
  showModal,
  handleCloseModal,
  formData,
  handleInputChange,
  handleSaveChanges
}) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Редактирование информации</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {formData && (
          <DefenderForm formData={formData} handleInputChange={handleInputChange}/>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleSaveChanges}>Сохранить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateDefender;