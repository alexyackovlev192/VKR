import React, { useState, useRef, useEffect } from 'react';
import './style-pages/DefendersPage.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import UpdateDefender from '../modal-windows/UpdateDefender'; // Импортируем наш новый компонент

import defendersData from '../data/defendersData.json';

const DefendersPage = () => {
  const [selectedDef, setSelectedDef] = useState(null);
  const [selectedDefender, setSelectedDefender] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const tableRef = useRef(null);

  const handleRowDoubleClick = (defender) => {
    setSelectedDefender(defender);
    setShowModal(true);
    setFormData(defender);
  };

  const handleRowClick = (defender) => {
    setSelectedDef(defender);
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
    const updatedDefendersData = defendersData.map(defender =>
      defender.id === formData.id ? { ...defender, ...formData } : defender
    );
  
    console.log('Сохранение изменений:', formData);
    console.log('Обновленные данные защищающихся:', updatedDefendersData);
    handleCloseModal();
  };

  const handleDeleteDefender = () => {
    const updatedDefendersData = defendersData.filter(defender => defender.id !== selectedDefender.id);
    console.log('Удаление защищающегося:', selectedDefender);
    console.log('Обновленные данные защищающихся:', updatedDefendersData);
    handleCloseModal();
  };

  const handleAddButtonClick = () => {
    setIsEditing(false);
    setFormData(null);
    setSelectedDef(null); // Change to null instead of true
  };

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleClickOutside = (event) => {
    if (tableRef.current && !tableRef.current.contains(event.target)) {
      setSelectedDef(null);
    }
  };

  // Attach click outside listener when the component mounts
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="my-5 px-5" ref={tableRef}>
      <Button variant="primary" className="mx-3" onClick={handleEditButtonClick} disabled={!selectedDef}>Редактировать</Button>
      <Button variant="primary" className="mx-3" onClick={handleAddButtonClick}>Добавить</Button>
      <Button variant="danger" className="mx-3" onClick={handleDeleteDefender} disabled={!selectedDef}>Удалить</Button>
      <div className="d-flex justify-content-between mb-3"></div>
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
            <tr key={defender.id} onDoubleClick={() => handleRowDoubleClick(defender)} onClick={() => handleRowClick(defender)} className={selectedDef === defender ? 'active' : ''}>
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
    </div>
  );
};

export default DefendersPage;