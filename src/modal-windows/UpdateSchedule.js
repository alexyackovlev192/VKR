import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ScheduleForm from '../forms/ScheduleForm';

const UpdateSchedule = ({
    showModal,
    handleCloseModal,
    formData,
    handleInputChange,
    handleSaveUpdate,
    handleDeleteSchedule,
    schedules
  }) => {
    
    return (
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Редактирование события</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ScheduleForm formData={formData} handleInputChange={handleInputChange} schedules={schedules} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={() => handleSaveUpdate(formData)}>
            Сохранить изменения
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Отмена
          </Button>
          <Button variant="danger" onClick={() => handleDeleteSchedule(formData)}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

export default UpdateSchedule;