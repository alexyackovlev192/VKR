import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ScheduleForm from '../forms/ScheduleForm';

const UpdateSchedule = ({
  showModal,
  handleCloseModal,
  handleInputChange,
  handleSaveChanges,
  formData,
  geks,
  handleDeleteSchedule
}) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Редактировать защиту</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ScheduleForm 
          formData={formData} 
          handleInputChange={handleInputChange} 
          geks={geks} 
          isEditMode={true} // режим редактирования
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