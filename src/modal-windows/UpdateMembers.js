import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UpdateMember = ({
  showModal,
  handleCloseModal,
  isEditing,
  formData,
  handleInputChange,
  handleEditButtonClick,
  handleDeleteMember,
  handleSaveChanges
}) => {
  const { fullName, position, email } = formData || {};

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Редактирование информации</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {formData && (
          <Form>
            <Form.Group controlId="formFullName">
              <Form.Label>ФИО</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={fullName}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </Form.Group>
            <Form.Group controlId="formPosition">
              <Form.Label>Должность</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={position}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Почта</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={email}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!isEditing && (
          <Button  variant="primary" size="sm" onClick={handleEditButtonClick}>Редактировать</Button>
        )}
        {isEditing && (
          <>
            <Button variant="primary" size="sm" onClick={handleDeleteMember}>Удалить</Button>
            <Button variant="primary" size="sm" onClick={handleSaveChanges}>Сохранить</Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateMember;