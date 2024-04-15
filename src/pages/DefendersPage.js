import React, { useState, useRef, useEffect }from 'react';
import Button from 'react-bootstrap/Button';
import UpdateDefender from '../modal-windows/UpdateDefender';
import AddDefender from '../modal-windows/AddDefender';

import defendersData from '../data/defendersData.json';
import './style-pages/DefendersPage.css';

// Основной компонент страницы участников
const DefendersPage = () => {
  // Состояния компонента
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false); // Показать модальное окно
  const [formData, setFormData] = useState(null); // Данные участника
  const [activeRow, setActiveRow] = useState(null); // Состояние для активной строки
  
  const tableRef = useRef(null); // Создаем ссылку на элемент таблицы

  // Обработчик клика в любое место кроме таблицы
  const handleClickOutsideTable = (event) => {
    // Проверяем, был ли клик сделан вне таблицы
    if (tableRef.current && !tableRef.current.contains(event.target)) {
      setActiveRow(null); // Сбрасываем активную строку
    }
  };

  useEffect(() => {
    // Добавляем обработчик события клика при монтировании компонента
    document.addEventListener('click', handleClickOutsideTable);
    // Удаляем обработчик события клика при размонтировании компонента
    return () => {
      document.removeEventListener('click', handleClickOutsideTable);
    };
  }, []); // Пустой массив зависимостей означает, что эффект сработает только при монтировании и размонтировании компонента

  const sortedDefenders = defendersData.slice().sort((a, b) => a.name.localeCompare(b.name));

  // Обработчик клика по строке таблицы
  const handleRowClick = (defender) => {
    setActiveRow(defender);
    console.log('Выбран студент:', defender.id);
  };

  // Закрытие модального окна
  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setShowAddModal(false);
    setFormData(null);
  };
  
  // Обработчик клика по кнопке редактировать
  const handleEditDefender = () => {
    setActiveRow(activeRow);
    setFormData(activeRow); // Передаем данные активной строки в форму редактирования
    setShowUpdateModal(true);
  };

  // Обработчик клика по кнопке добавить
  const handleAddDefender = () => {
    setShowAddModal(true);
    setFormData(null); // Очищаем форму
  };

  // Сохранение изменений
  const handleSaveChangesUpdate = () => {
    console.log('Сохранение изменений:', formData);
    setShowUpdateModal(false);
    setFormData(null);
  };

  const handleSaveChangesAdd = () => {
    console.log('Добавление нового участника:', formData);
    setShowAddModal(false);
    setFormData(null);
  };

  // Удаление участника
  const handleDeleteDefender = (item) => {
    console.log('Удаление участника:', item);
    setActiveRow(null);
    handleCloseModal();
  };

  // Обработчик изменения ввода формы
  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };


  // Возвращаем JSX компонента
  return (
    <div className="my-5 px-5">
      <>
        <Button variant="primary" className="mx-3" onClick={handleEditDefender} disabled={!activeRow}>Редактировать</Button>
        <Button variant="primary" className="mx-3" onClick={handleAddDefender}>Добавить</Button>
      </>
      <div className="my-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <table className="table table-striped table-bordered table-light table-hover text-center" ref={tableRef}>
          <thead className="table-dark">
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
            {sortedDefenders.map((defender, index) => (
              <tr 
                key={defender.id} 
                className={activeRow === defender ? 'table-info' : 'table-light'}
                onClick={() => handleRowClick(defender)}>
                <td>{index + 1}</td>
                <td>{defender.name}</td>
                <td>{defender.group}</td>
                <td>{defender.topic}</td>
                <td>{defender.supervisor}</td>
                <td>{defender.averageGrade}</td>
                <td>{defender.hasHonors ? 'Да' : 'Нет'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UpdateDefender
        showModal={showUpdateModal}
        handleCloseModal={handleCloseModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSaveChanges={handleSaveChangesUpdate}
        handleDeleteDefender={handleDeleteDefender}
      />
      <AddDefender
        showModal={showAddModal}
        handleCloseModal={handleCloseModal}
        handleInputChange={handleInputChange}
        handleSaveChanges={handleSaveChangesAdd}
        formData={formData}
      />
    </div>
  );
};

export default DefendersPage;