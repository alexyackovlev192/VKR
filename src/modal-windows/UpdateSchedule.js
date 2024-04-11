import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ScheduleForm from '../forms/ScheduleForm';

const UpdateSchedule = ({
    showModal,
    handleCloseModal,
    formData,
    handleInputChange,
    handleSaveSchedule
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
          <Button variant="primary" onClick={() => handleSaveSchedule(formData)}>
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