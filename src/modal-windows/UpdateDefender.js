import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import DefenderForm from '../forms/DefenderForm';

const UpdateDefender = ({
  showModal,
  handleCloseModal,
  formData,
  handleInputChange,
  handleSaveChanges,
  handleDeleteDefender
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
        <Button variant="primary" onClick={() => handleSaveChanges(formData)}>
          Сохранить изменения
        </Button>
        <Button variant="secondary" onClick={handleCloseModal}>
          Отмена
        </Button>
        <Button variant="danger" onClick={() => handleDeleteDefender(formData)}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateDefender;