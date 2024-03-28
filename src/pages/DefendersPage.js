import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import defendersData from '../data/defendersData.json';

const DefendersPage = () => {
  const [selectedDefender, setSelectedDefender] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleRowDoubleClick = (defender) => {
    setSelectedDefender(defender);
    setShowModal(true);
    setFormData(defender);
  };

  const handleCloseModal = () => {
    setSelectedDefender(null);
    setShowModal(false);
    setFormData(null);
    setIsEditing(false);
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    console.log('Сохранение изменений:', formData);
    handleCloseModal();
  };

  const handleDeleteDefender = () => {
    console.log('Удаление защищающегося:', selectedDefender);
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>№</th>
            <th>ФИО</th>
            <th>Группа</th>
            <th>Тема</th>
            <th>Научрук</th>
            <th>Средний балл</th>
            <th>Красный диплом</th>
          </tr>
        </thead>
        <tbody>
          {defendersData.map((defender, index) => (
            <tr key={defender.id} onDoubleClick={() => handleRowDoubleClick(defender)}>
              <td>{index + 1}</td>
              <td>{defender.fullName}</td>
              <td>{defender.group}</td>
              <td>{defender.topic}</td>
              <td>{defender.supervisor}</td>
              <td>{defender.averageGrade}</td>
              <td>{defender.hasHonors ? 'Да' : 'Нет'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Редактирование защищающегося</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formData && (
            <Form>
              <Form.Group controlId="formFullName">
                <Form.Label>ФИО</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  readOnly={!isEditing} // Поле только для чтения, если не в режиме редактирования
                />
              </Form.Group>
              <Form.Group controlId="formGroup">
                <Form.Label>Группа</Form.Label>
                <Form.Control
                  type="text"
                  name="group"
                  value={formData.group}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </Form.Group>
              <Form.Group controlId="formTopic">
                <Form.Label>Тема</Form.Label>
                <Form.Control
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </Form.Group>
              <Form.Group controlId="formSupervisor">
                <Form.Label>Научрук</Form.Label>
                <Form.Control
                  type="text"
                  name="supervisor"
                  value={formData.supervisor}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </Form.Group>
              <Form.Group controlId="formAverageGrade">
                <Form.Label>Средний балл</Form.Label>
                <Form.Control
                  type="text"
                  name="averageGrade"
                  value={formData.averageGrade}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </Form.Group>
              <Form.Group controlId="formHasHonors">
                <Form.Check
                  type="checkbox"
                  label="Красный диплом"
                  name="hasHonors"
                  checked={formData.hasHonors} // Устанавливаем состояние чекбокса на основе значения в состоянии формы
                  onChange={(e) => setFormData({ ...formData, hasHonors: e.target.checked })} // Обновляем состояние формы при изменении чекбокса
                  disabled={!isEditing} // Чекбокс недоступен для редактирования, если не в режиме редактирования
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!isEditing && (
            <Button variant="primary" onClick={handleEditButtonClick}>Редактировать</Button>
          )}
          {isEditing && (
            <>
              <Button variant="danger" onClick={handleDeleteDefender}>Удалить</Button>
              <Button variant="primary" onClick={handleSaveChanges}>Сохранить</Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DefendersPage;