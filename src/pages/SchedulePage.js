import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import schedulesData from '../data/schedulesData.json';
import UpdateSchedule from '../modal-windows/UpdateSchedule';

import './style-pages/SchedulePage.css';

const SchedulePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeCell, setActiveCell] = useState(null);
  const [isTableView, setIsTableView] = useState(true);
  const tableRef = useRef(null); 

  const uniqueDates = Array.from(new Set(schedulesData.map(item => item.date)));
  const uniqueDirections = Array.from(new Set(schedulesData.map(item => item.direction)));

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

  const openEditModal = (data) => {
    setShowModal(true);
    setActiveCell(data);
    console.log(data);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setActiveCell(null);
  };

  const handleUpdateClick = (item) => {
    if (item.event != null) {
      setActiveCell(item);
    }
  };

  const handleAddMember = () => {
    
  };

  const toggleView = () => {
    setIsTableView(prevState => !prevState);
    setActiveCell(null);
  };

  const groupedSchedules = schedulesData.reduce((acc, curr) => {
    if (acc[curr.date]) {
      acc[curr.date].push(curr);
    } else {
      acc[curr.date] = [curr];
    }
    return acc;
  }, {});

  return (
    <div className="schedule-container my-5 px-5">
      <div className="row">
        <div className="">
          { isTableView ? (
            <Button variant="primary" className="mx-3" onClick={() => openEditModal(activeCell)} disabled={!activeCell || activeCell.event == null}>Редактировать</Button>
          ) : ("")}
          <Button variant="primary" className="mx-3" onClick={handleAddMember}>Добавить</Button>
          <Button variant="primary" className="mx-3" onClick={toggleView}>{isTableView ? 'Карточки' : 'Таблица'}</Button>
        </div>
        {isTableView ? (
        <>
          <div className="col-1 px-0 my-4">
            <table className="table table-light table-hover text-center">
              <thead>
                <tr>
                  <th className="px-5">Дата</th>
                </tr>
              </thead>
              <tbody className=''>
                {uniqueDates.map((date, index) => (
                  <tr key={index}>
                    <td>
                      {date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-11 px-0 my-4" style={{ overflowX: 'auto' }}>
            <table className="table table-light table-hover text-center" ref={tableRef}>
              <thead>
                <tr>
                  {uniqueDirections.map((direction, index) => (
                    <th className="px-5" key={index}>{direction}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
              {Object.values(groupedSchedules).map((schedules, dateIndex) => (
                <tr key={dateIndex}>
                  {uniqueDirections.map((direction, directionIndex) => (
                    <td 
                      key={directionIndex}
                      className={activeCell && 
                        activeCell.event != null && 
                        activeCell.event.date === schedules[0].date && 
                        activeCell.event.direction === direction 
                        ? 'table-info' : 'table-light'}
                      onClick={() => handleUpdateClick({ date: schedules[0].date, 
                                                    direction: direction,
                                                         time: schedules[0].time,
                                                         room: schedules[0].room,
                                                        event: schedules.find(schedule => schedule.direction === direction)})}
                    >
                      {schedules.find(schedule => schedule.direction === direction)?.id || ''}
                    </td>
                  ))}
                </tr>
              ))}
              </tbody>
            </table>
          </div>  
        </>
        ) : (
          <div className="container-fluid text-center my-3">
            {/* <div className="row justify-content-evenly">
              {schedulesData.map((item, index) => (
                <Card key={index} className="col-2 mx-2 my-4 text-center bg-light">
                  <Card.Body>
                    <Card.Title>{item.date}</Card.Title>
                    <Card.Text>
                      { schedulesData.map((direction, idx) => (
                        item.id ? <p key={idx}>{item.id}</p> : ""
                      ))}
                    </Card.Text>
                    <Button variant="primary" onClick={() => openEditModal({ date: item.date, direction: directionData.direction, event: item })}>Редактировать</Button>
                  </Card.Body>
                </Card>
              ))}
            </div> */}
          </div>
        )}
      </div>
      <UpdateSchedule
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        formData={activeCell || {}}
        handleInputChange={() => {}}
        handleSaveChanges={() => {}}
      />
    </div>
  );
};

export default SchedulePage;