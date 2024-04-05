import React, { useState } from 'react';
import './style-pages/SchedulePage.css';
import scheludesData from '../data/scheludesData.json';
import directionData from '../data/directionData.json';
import UpdateSchelude from '../modal-windows/UpdateSchedule';

const SchedulePage = () => {
  // В SchedulePage добавим состояние editingData для хранения данных о редактируемом событии
  const [editingData, setEditingData] = useState(null);
  // Также добавим состояние showModal для управления отображением модального окна
  const [showModal, setShowModal] = useState(false);

  // Функция для открытия модального окна для редактирования
  const openEditModal = (rowData) => {
    setEditingData(rowData);
    setShowModal(true); // Открываем модальное окно
  };

  // Функция для закрытия модального окна
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingData(null);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    // Создаем копию объекта editingData, чтобы не изменять состояние напрямую
    const updatedData = { ...editingData, [name]: value };
    setEditingData(updatedData);
  };

  // Возвращаемый JSX компонента
  return (
    <div className="schedule my-5 px-5">
      <table className="table table-light table-hover text-center">
        <thead>
          <tr>
            <th>Дата</th>
            {directionData.map((item, index) => (
              <th  key={index}>{item.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scheludesData.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              {directionData.map((direction, idx) => (
                <td key={idx} onDoubleClick={() => openEditModal({ date: item.date, direction: direction.id, event: item[direction.id] })}>
                  {item[direction.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateSchelude
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        formData={editingData || {}}
        handleInputChange={handleInputChange} // Передаем функцию handleInputChange
        handleSaveChanges={() => {}} // Эту функцию нужно реализовать для сохранения изменений
      />
    </div>
  );
};

export default SchedulePage;