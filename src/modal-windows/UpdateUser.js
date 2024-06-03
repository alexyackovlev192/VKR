import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import UserForm from '../forms/UserForm';

const UpdateUser = ({
  showModal,
  handleCloseModal,
  handleInputChange,
  handleSaveChanges,
  formData
}) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Изменение списка ролей для {formData.Login}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <UserForm 
          formData={formData} 
          handleInputChange={handleInputChange}
          isEditMode={true} 
        />
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

export default UpdateUser;