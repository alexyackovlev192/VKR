import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UpdateDefender = ({
  showModal,
  handleCloseModal,
  isEditing,
  formData,
  handleInputChange,
  handleEditButtonClick,
  handleDeleteDefender,
  handleSaveChanges
}) => {
  const { fullName, group, topic, supervisor, averageGrade, hasHonors } = formData || {};

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
            <Form.Group controlId="formGroup">
              <Form.Label>Группа</Form.Label>
              <Form.Control
                type="text"
                name="group"
                value={group}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </Form.Group>
            <Form.Group controlId="formTopic">
              <Form.Label>Тема</Form.Label>
              <Form.Control
                type="text"
                name="topic"
                value={topic}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </Form.Group>
            <Form.Group controlId="formSupervisor">
              <Form.Label>Научрук</Form.Label>
              <Form.Control
                type="text"
                name="supervisor"
                value={supervisor}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </Form.Group>
            <Form.Group controlId="formAverageGrade">
              <Form.Label>Средний балл</Form.Label>
              <Form.Control
                type="text"
                name="averageGrade"
                value={averageGrade}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </Form.Group>
            <Form.Group controlId="formHasHonors">
              <Form.Check
                type="checkbox"
                label="Красный диплом"
                name="hasHonors"
                checked={hasHonors}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        {isEditing && (
          <>
            <Button variant="secondary" size="sm" onClick={handleDeleteDefender}>Удалить</Button>
            <Button variant="primary" size="sm" onClick={handleSaveChanges}>Сохранить</Button>
          </>
        )}
        {!isEditing && (
          <Button  variant="primary" size="sm" onClick={handleEditButtonClick}>Редактировать</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateDefender;