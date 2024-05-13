import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import MemberForm from '../forms/MemberForm';

const UpdateMember = ({
  members,
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
          <MemberForm formData={formData} handleInputChange={handleInputChange} members={members} />
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={() => handleSaveChanges(formData)}>
          Сохранить изменения
        </Button>
        <Button variant="secondary" onClick={handleCloseModal}>
          Отмена
        </Button>
        {/* <Button variant="danger" onClick={() => handleDeleteMember(formData)}>
          Удалить
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateMember;