import React, { useState } from 'react';
import './style-pages/DefendersPage.css';
import Table from 'react-bootstrap/Table';
import UpdateDefender from '../modal-windows/UpdateDefender'; // Импортируем наш новый компонент

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
    const { name, value, checked, type } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
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
      <UpdateDefender
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        isEditing={isEditing}
        formData={formData}
        handleInputChange={handleInputChange}
        handleEditButtonClick={handleEditButtonClick}
        handleDeleteDefender={handleDeleteDefender}
        handleSaveChanges={handleSaveChanges}
      />
    </>
  );
};

export default DefendersPage;