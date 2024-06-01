import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import SecretarieForm from '../forms/SecretarieForm';

const UpdateSecretarie = ({
  secretaries,
  showModal,
  handleCloseModal,
  formData,
  handleInputChange,
  handleSaveChanges,
  //handleDeleteMember
}) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Редактирование информации</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {formData && (
          <SecretarieForm formData={formData} handleInputChange={handleInputChange} secretaries={secretaries} />
        )}
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

export default UpdateSecretarie;