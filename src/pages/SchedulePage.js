import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import schedulesData from '../data/schedulesData.json';
import directionData from '../data/directionData.json';
import UpdateSchedule from '../modal-windows/UpdateSchedule';

import './style-pages/SchedulePage.css';

const SchedulePage = () => {
  const [editingData, setEditingData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeCell, setActiveCell] = useState(null);
  const tableRef = useRef(null); 

  // Обработчик клика в любое место кроме таблицы
  const handleClickOutsideTable = (event) => {
    // Проверяем, был ли клик сделан вне таблицы
    if (tableRef.current && !tableRef.current.contains(event.target)) {
      setActiveCell(null); // Сбрасываем активную строку
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

  const openEditModal = (rowData) => {
    if (rowData.event != null) {
      setEditingData(rowData);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingData(null);
    setActiveCell(null);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    const updatedData = { ...editingData, [name]: value };
    setEditingData(updatedData);
  };

  const handleUpdateClick = (item) => {
    if (item.event != null) {
      setActiveCell(item);
    }
  };

  const handleAddMember = () => {
    
  }

  return (
    <div className="schedule-container my-5 px-5">
      <div className="row">
        <div className="">
          <Button variant="primary" className="mx-3" onClick={() => openEditModal(activeCell)} disabled={!activeCell || activeCell.event == null}>Редактировать</Button>
          <Button variant="primary" className="mx-3" onClick={handleAddMember}>Добавить</Button>
        </div>
        <div className="col-1 px-0 my-3">
          <table className="table table-light table-hover text-center">
            <thead>
              <tr>
                <th className="px-5">Дата</th>
              </tr>
            </thead>
            <tbody className='table-group-divider'>
              {schedulesData.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-11 px-0 my-3" style={{ overflowX: 'auto' }}>
          <table className="table table-light table-hover text-center" ref={tableRef}>
            <thead>
              <tr> 
                {directionData.map((item, index) => (
                  <th className="px-5" key={index}>{item.name}</th>
                ))}
              </tr>
            </thead>
              <tbody className='table-group-divider'>
                {schedulesData.map((item, index) => (
                  <tr key={index}>
                    {directionData.map((direction, idx) => (
                      <td
                        className={activeCell && item[direction.id] != null && activeCell.date === item.date && activeCell.direction === direction.id ? 'table-info' : 'table-light'}
                        key={idx}
                        onClick={() => handleUpdateClick({ date: item.date, direction: direction.id, event: item[direction.id] })}
                        onDoubleClick={() => {
                          if (item[direction.id] != null) {
                            openEditModal({ date: item.date, direction: direction.id, event: item[direction.id] });
                          }
                        }}
                      >
                        {item[direction.id]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
          </table>
        </div>  
      </div>
      <UpdateSchedule
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        formData={editingData || {}}
        handleInputChange={handleInputChange}
        handleSaveChanges={() => {}} 
      />
    </div>
  );
};

export default SchedulePage;