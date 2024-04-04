import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import MemberForm from '../forms/MemberForm';

const AddMember = ({
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
        <MemberForm formData={formData} handleInputChange={handleInputChange} />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleSaveChanges}>
          Сохранить изменения
        </Button>
        <Button variant="secondary" onClick={handleCloseModal}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddMember;