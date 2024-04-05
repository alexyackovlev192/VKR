import React, { useState, useRef, useEffect }from 'react';
import Button from 'react-bootstrap/Button';
import UpdateMember from '../modal-windows/UpdateMember';
import AddMember from '../modal-windows/AddMember';

import membersData from '../data/membersData.json';
import './style-pages/MembersPage.css';

// Основной компонент страницы участников
const MembersPage = () => {
  // Состояния компонента
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false); // Показать модальное окно
  const [isEditing, setIsEditing] = useState(false); // Редактирование
  const [formData, setFormData] = useState(null); // Данные участника
  const [activeRow, setActiveRow] = useState(null); // Состояние для активной строки
  const tableRef = useRef(null); // Создаем ссылку на элемент таблицы

  // Обработчик клика в любое место кроме таблицы
  const handleClickOutsideTable = (event) => {
    // Проверяем, был ли клик сделан вне таблицы
    if (tableRef.current && !tableRef.current.contains(event.target)) {
      setActiveRow(null); // Сбрасываем активную строку
    }
    setIsEditing(false)
  };

  useEffect(() => {
    // Добавляем обработчик события клика при монтировании компонента
    document.addEventListener('click', handleClickOutsideTable);
    // Удаляем обработчик события клика при размонтировании компонента
    return () => {
      document.removeEventListener('click', handleClickOutsideTable);
    };
  }, []); // Пустой массив зависимостей означает, что эффект сработает только при монтировании и размонтировании компонента


  // Обработчик клика по строке таблицы
  const handleRowClick = (member) => {
    setActiveRow(member);
    console.log('Выбран ГЭК:', member.id);
  };

  // Закрытие модального окна
  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setShowAddModal(false);
    setFormData(null);
    setIsEditing(false);
  };
  
  // Обработчик клика по кнопке редактировать
  const handleEditMember = () => {
    setIsEditing(true);
    setFormData(activeRow); // Передаем данные активной строки в форму редактирования
    setShowUpdateModal(true);
  };

  // Обработчик клика по кнопке добавить
  const handleAddMember = () => {
    setShowAddModal(true);
    setIsEditing(false);
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
  const handleDeleteMember = () => {
    console.log('Удаление члена ГЭК:', activeRow);
    setActiveRow(null);
  };

  // Обработчик изменения ввода формы
  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  // Возвращаем JSX компонента
  return (
    <div className="my-5 px-5" ref={tableRef}>
      <div>
        <Button variant="primary" className="mx-3" onClick={handleEditMember} disabled={!activeRow}>Редактировать</Button>
        <Button variant="primary" className="mx-3" onClick={handleAddMember}>Добавить</Button>
        <Button variant="danger" className="mx-3" onClick={handleDeleteMember} disabled={!activeRow}>Удалить</Button>
      </div>
      <div className="my-4" style={{ height: '70vh', overflowY: 'auto' }}>
        <table className="table table-light table-hover">
          <thead>
            <tr>
              <th>№</th>
              <th>ФИО</th>
              <th>Должность</th>
              <th>Почта</th>
            </tr>
          </thead>
          <tbody>
            {membersData.map((member, index) => (
              <tr 
                key={member.id}
                className={activeRow === member ? 'table-info' : 'table-light'}
                onClick={() => handleRowClick(member)}>
                <td>{index + 1}</td>
                <td>{member.fullName}</td>
                <td>{member.position}</td>
                <td>{member.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UpdateMember
        showModal={showUpdateModal}
        handleCloseModal={handleCloseModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSaveChanges={handleSaveChangesUpdate}
      />
      <AddMember
        showModal={showAddModal}
        handleCloseModal={handleCloseModal}
        handleInputChange={handleInputChange}
        handleSaveChanges={handleSaveChangesAdd}
        formData={formData}
      />
    </div>
  );
};

export default MembersPage;