import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

import UpdateSchedule from '../../modal-windows/UpdateSchedule';
import AddSchedule from '../../modal-windows/AddSchedule';

import '../style-pages/SchedulePage.css';

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [geks, setGeks] = useState([]);
  const [uniqueDates, setUniqueDates] = useState([]);
  const [uniqueDirections, setUniqueDirections] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [activeCell, setActiveCell] = useState(null);

  const [isTableView, setIsTableView] = useState(true);

  const tableRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/defenseSchedule/thisYear', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setSchedules(response.data);
      updateUniqueValues(response.data);
    })
    .catch(error => console.error('Ошибка при загрузке данных:', error));


    axios.get('http://localhost:5000/gecs', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setGeks(response.data);
    })
    .catch(error => console.error('Ошибка при загрузке данных:', error));
  }, []);

  useEffect(() => {
    const handleClickOutsideTable = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setActiveCell(null);
      }
    };
    document.addEventListener('click', handleClickOutsideTable);
    return () => {
      document.removeEventListener('click', handleClickOutsideTable);
    };
  }, []);

  const updateUniqueValues = (data) => {
    const dates = Array.from(new Set(data.map(item => item.date))).sort((a, b) => new Date(a) - new Date(b));
    const directions = Array.from(new Set(data.map(item => item.Name_direction))).sort();
    setUniqueDates(dates);
    setUniqueDirections(directions);
  };

  const handleSelectedClick = (item) => {
    if (item.event != null) {
      setActiveCell(item.event);
    } else {
      setActiveCell(null);
    }
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setShowAddModal(false);
    setFormData(null);
  };

  const handleEditSchedule = (selectedItem) => {
    setActiveCell(selectedItem);
    setFormData(selectedItem);
    setShowUpdateModal(true);
  };

  const handleAddSchedule = () => {
    setShowAddModal(true);
    setFormData(null);
  };

  const handleSaveUpdate = (formData) => {
    const token = localStorage.getItem('token');
    const data = {
      id_G: formData.id_G,
      Name_direction: formData.Name_direction,
      Date: formatDate(formData.date),
      Time: formData.time,
      Classroom: formData.classroom
    };
  
    console.log(formData.id_DS);
    axios.put(`http://localhost:5000/defenseSchedule/${formData.id_DS}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Изменения информации о защите успешно:', response.data);
      setSchedules(prevSchedules => {
        const updatedSchedules = prevSchedules.map(schedule =>
          schedule.id_DS === formData.id_DS ? { ...schedule, ...formData } : schedule
        );
        updateUniqueValues(updatedSchedules);
        setFormData(null);
        return updatedSchedules;
      });
      setShowUpdateModal(false);
    })
    .catch(error => {
      console.error('Ошибка при сохранении изменении информации о защите:', error);
    });
  };

  const handleSaveAdd = (formData) => {
    const token = localStorage.getItem('token');
    const data = {
      GecId: formData.id_G,
      NameDirection: formData.Name_direction,
      Date: formatDate(formData.date),
      Time: formData.time,
      Classroom: formData.classroom
    };
  
    axios.post(`http://localhost:5000/defenseSchedule/create`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Ответ от сервера после создания новой защиты:', response.data);

      axios.get('http://localhost:5000/defenseSchedule/thisYear', {
      headers: {
        'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setSchedules(response.data);
        updateUniqueValues(response.data);
      })
      .catch(error => console.error('Ошибка при загрузке данных:', error));
        setShowAddModal(false);
        setFormData(null);
      })
    .catch(error => {
      console.error('Ошибка при сохранении новой защиты:', error)
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = value instanceof Date ? formatDate(value) : value;
  
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: newValue
    }));
  };

  const formatDate = (date) => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date;
    }
    const d = new Date(date);
    if (isNaN(d)) {
      throw new Error("Некорректный формат даты");
    }
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleDeleteSchedule = (item) => {
    console.log('Удаление защиты:', item);
    setActiveCell(null);
    handleCloseModal();
  };

  const toggleView = () => {
    setIsTableView(prevState => !prevState);
    setActiveCell(null);
  };

  return (
    <div className="schedule-container my-5 px-5">
      <div className="row">
        <div className="">
          { isTableView ? (
            <Button variant="primary" className="mx-3" onClick={() => handleEditSchedule(activeCell)} disabled={!activeCell || activeCell == null}>Редактировать</Button>
          ) : ("")}
          <Button variant="primary" className="mx-3" onClick={handleAddSchedule}>Добавить</Button>
          <Button variant="primary" className="mx-3" onClick={toggleView}>{isTableView ? 'Карточки' : 'Таблица'}</Button>
        </div>
        {isTableView ? (
        <>
          <div className="col-1 px-0 my-4">
            <table className="table table-primary table-bordered table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th className="px-5 py-3">Дата</th>
                </tr>
              </thead>
              <tbody className=''>
              {uniqueDates.map((date, index) => (
                <tr key={index}>
                  <td
                    className=""
                    style={{ height: '180px', verticalAlign: 'middle' }}
                  >
                    {new Date(date).toLocaleDateString('ru-GB', { day: '2-digit', month: '2-digit' })}
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          <div className="col-11 px-0 my-4" style={{overflowX: 'auto' }}>
            <table className="table table-bordered table-light table-hover text-center" ref={tableRef}>
              <thead className="table-dark">
                <tr>
                  {uniqueDirections.map((direction, index) => (
                    <th className="px-5 py-3" key={index}>{direction}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {uniqueDates.map((date, dateIndex) => (
                  <tr key={dateIndex}>
                    {uniqueDirections.map((direction, directionIndex) => {
                      const sched = schedules.find(s => s.date === date && s.Name_direction === direction);
                      const isActive = activeCell && sched && activeCell.date === sched.date && activeCell.Name_direction === sched.Name_direction;

                      return (
                        <td 
                          key={directionIndex}
                          className={`px-5 ${isActive ? 'table-info' : 'table-light'}`}
                          onClick={() => handleSelectedClick({ 
                            event: sched
                          })}
                          style={{ height: '180px', verticalAlign: 'middle' }}
                        >
                          {sched ? (
                            <div>
                              <p>ГЭК №{sched.id_G}</p>
                              <p>Время: {sched.time}</p>
                              <p>Направление: {sched.Name_direction}</p>
                              <p>Аудитория: {sched.classroom}</p>
                            </div>
                          ) : ("")}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>  
        </>
        ) : (
          <div className="container-fluid text-center my-3">
            <div className="row justify-content-evenly">
              {schedules.map((item, index) => (
                <Card key={index} className="col-2 mx-2 my-4 text-center bg-light">
                  <Card.Body>
                    <Card.Title>{new Date(item.date).toLocaleDateString('ru', { day: '2-digit', month: '2-digit' })}</Card.Title>
                    <Card.Text>
                      <div>
                        <p>ГЭК №{item.id_G}</p>
                        <p>Время: {item.time}</p>
                        <p>Направление: {item.Name_direction}</p>
                        <p>Аудитория: {item.classroom}</p>
                      </div>
                    </Card.Text>
                    <Button variant="primary" onClick={() => handleEditSchedule(item)}>Редактировать</Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      <UpdateSchedule
        showModal={showUpdateModal}
        handleCloseModal={handleCloseModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSaveChanges={handleSaveUpdate}
        handleDeleteSchedule={handleDeleteSchedule}
        geks={geks}
      />
      <AddSchedule
        showModal={showAddModal}
        handleCloseModal={handleCloseModal}
        handleInputChange={handleInputChange}
        handleSaveChanges={handleSaveAdd}
        formData={formData}
        geks={geks}
      />
    </div>
  );
};

export default SchedulePage;