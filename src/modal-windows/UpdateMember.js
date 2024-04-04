import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import MemberForm from '../forms/MemberForm';

const UpdateMember = ({
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
          <MemberForm formData={formData} handleInputChange={handleInputChange}/>
        )}
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

export default UpdateMember;