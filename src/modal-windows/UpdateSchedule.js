import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ScheduleForm from '../forms/ScheduleForm';

const UpdateSchedule = ({
  showModal,
  handleCloseModal,
  handleInputChange,
  handleSaveChanges,
  formData,
  geks
}) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Редактирование защиты</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ScheduleForm 
          formData={formData} 
          handleInputChange={handleInputChange} 
          geks={geks} 
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
        {/* <Button variant="danger" onClick={() => handleDeleteSchedule(formData)}>
          Удалить
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateSchedule;