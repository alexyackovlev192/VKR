import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ScheduleForm from '../forms/ScheduleForm'; // Импортируем компонент ScheduleForm

const UpdateSchedule = ({
    showModal,
    handleCloseModal,
    formData,
    handleInputChange,
    handleSaveChanges
  }) => {
    return (
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Редактирование события</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ScheduleForm formData={formData} handleInputChange={handleInputChange} />
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

export default UpdateSchedule;