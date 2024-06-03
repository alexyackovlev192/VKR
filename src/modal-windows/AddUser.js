import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import UserForm from '../forms/UserForm';

const AddUser = ({
  showModal,
  handleCloseModal,
  handleInputChange,
  handleSaveChanges,
  formData
}) => {
  const onSave = () => {
    handleSaveChanges(formData);
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Создание нового пользователя</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <UserForm formData={formData} handleInputChange={handleInputChange} />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={onSave}>
          Сохранить
        </Button>
        <Button variant="secondary" onClick={handleCloseModal}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUser;