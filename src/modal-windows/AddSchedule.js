import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ScheduleForm from '../forms/ScheduleForm';

const AddSchedule = ({
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
        <Modal.Title>Добавить новую защиту</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ScheduleForm 
          formData={formData} 
          handleInputChange={handleInputChange} 
          geks={geks} 
          isEditMode={false} // режим создания
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

export default AddSchedule;