/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { utils, writeFile } from 'xlsx';

import UpdateSchedule from '../../modal-windows/UpdateSchedule';
import AddSchedule from '../../modal-windows/AddSchedule';
import GekCompositionModal from '../../modal-windows/GekCompositionModal';
import WarningWindow from '../../components/WarningWindow'; 
import NoDataMessage from '../../components/NoDataMessage'; 

import '../style-pages/SchedulePage.css';

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [geks, setGeks] = useState([]);
  const [directions, setDirections] = useState([]);

  const [uniqueDates, setUniqueDates] = useState([]);
  const [uniqueDirections, setUniqueDirections] = useState([]);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showWarningWindow, setShowWarningWindow] = useState(false); 
  const [showOpenModal, setShowOpenModal] = useState(false); 

  const [formData, setFormData] = useState(null);
  const [activeCell, setActiveCell] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const [isTableView, setIsTableView] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [changes, setChanges] = useState(false);

  const tableRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/defenseSchedule/thisYear', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      const fetchDirectionsPromises = response.data.map(sched => {
        return axios.get(`http://localhost:5000/directions/${sched.id_D}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => response.data)
        .catch(error => {
          console.error('Ошибка при получении направления:', error);
          return null;
        });
      });

      Promise.all(fetchDirectionsPromises)
      .then(directionsData => {
        const updatedSchedules = response.data.map((schedule, index) => ({
          ...schedule,
          direction: directionsData[index]
        }));
        setSchedules(updatedSchedules);
        updateUniqueValues(updatedSchedules);
        setDirections(directionsData);
      });
    })
    .catch(error => console.error('Ошибка при загрузке данных:', error));

    axios.get('http://localhost:5000/gecs', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => { 
      setGeks(response.data)})
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
    const directionMap = new Map();
    data.forEach(item => {
      if (!directionMap.has(item.id_D)) {
        directionMap.set(item.id_D, item.direction.Name_direction);
      }
    });

    const directions = Array.from(directionMap.entries()).sort((a, b) => a[1].localeCompare(b[1]));

    setUniqueDates(dates);
    setUniqueDirections(directions);
  };

  const handleSelectedClick = useCallback((item) => {
    setActiveCell(item.event ?? null);
  }, []);

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setShowAddModal(false);
    setShowOpenModal(false);
    setSelectedSchedule(null);
    setFormData(null);
    setChanges(false);
  };

  const handleCloseWarningWindow = () => {
    setShowWarningWindow(false);
    setChanges(false);
  };

  const handleEditSchedule = (selectedItem) => {
    setActiveCell(selectedItem);
    setFormData(selectedItem);
    setShowUpdateModal(true);
    setChanges(false);
  };

  const handleOpenSchedule = (selectedItem) => {
    setSelectedSchedule(selectedItem);
    setShowOpenModal(true);
  };

  const handleAddSchedule = () => {
    setShowAddModal(true);
    setFormData(null);
    setChanges(false);
  };

  const handleSaveUpdate = useCallback((formData) => {
    const token = localStorage.getItem('token');

    if (!changes) {
      setErrorMessage('Нет изменений для сохранения');
      setShowWarningWindow(true);
      return;
    }

    const data = {
      id_G: formData.id_G,
      Name_direction: formData.Name_direction,
      Date: formatDate(formData.date),
      Time: formData.time,
      Classroom: formData.classroom
    };

    axios.put(`http://localhost:5000/defenseSchedule/${formData.id_DS}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(() => {
      setSchedules(prevSchedules => {
        const updatedSchedules = prevSchedules.map(schedule =>
          schedule.id_DS === formData.id_DS ? { ...schedule, ...formData } : schedule
        );
        updateUniqueValues(updatedSchedules);
        return updatedSchedules;
      });
      handleCloseModal();
    })
    .catch(error => {
      console.error('Ошибка при сохранении изменении информации о защите:', error);
      setErrorMessage('Ошибка при сохранении изменении информации о защите');
      setShowWarningWindow(true);
    });

    setChanges(false);
  }, [changes, updateUniqueValues, handleCloseModal]);

  const handleSaveAdd = useCallback((formData) => {
    const token = localStorage.getItem('token');
  
    if (!formData.id_G || !formData.Name_direction || !formData.date || !formData.time || !formData.classroom) {
      setErrorMessage('Не все поля заполнены');
      setShowWarningWindow(true);
      return;
    }
  
    const data = {
      GecId: formData.id_G,
      NameDirection: formData.Name_direction,
      Date: formatDate(formData.date),
      Time: formData.time,
      Classroom: formData.classroom
    };

    axios.post('http://localhost:5000/defenseSchedule/create', data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(() => {
      axios.get('http://localhost:5000/defenseSchedule/thisYear', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        const fetchDirectionsPromises = response.data.map(sched => {
          return axios.get(`http://localhost:5000/directions/${sched.id_D}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then(response => response.data)
          .catch(error => {
            console.error('Ошибка при получении направления:', error);
            return null;
          });
        });

        Promise.all(fetchDirectionsPromises)
        .then(directionsData => {
          const updatedSchedules = response.data.map((schedule, index) => ({
            ...schedule,
            direction: directionsData[index]
          }));
          setSchedules(updatedSchedules);
          updateUniqueValues(updatedSchedules);
          setDirections(directionsData);
        });
      })
      .catch(error => console.error('Ошибка при загрузке данных:', error));
      handleCloseModal();
    })
    .catch(error => {
      console.error('Ошибка при сохранении новой защиты:', error);
      setErrorMessage('Ошибка при сохранении новой защиты');
      setShowWarningWindow(true);
    });

    setChanges(false);
  }, [updateUniqueValues, handleCloseModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = value instanceof Date ? formatDate(value) : value;
  
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: newValue
    }));
    setChanges(true);
  };

  const formatDate = useCallback((date) => {
    const d = new Date(date);
    if (isNaN(d)) {
      throw new Error('Некорректный формат даты');
    }
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }, []);

  const handleDeleteSchedule = (item) => {
    console.log('Удаление защиты:', item);
    setActiveCell(null);
    handleCloseModal();
  };

  const toggleView = useCallback(() => {
    setIsTableView(prevState => !prevState);
    setActiveCell(null);
  }, []);

  const filteredSchedules = useMemo(() => {
    const schedulesByDate = uniqueDates.map(date => ({
      date,
      schedules: uniqueDirections.map(direction => {
        const directionObject = directions.find(dir => dir.id_D === direction[0]);

        const schedule = directionObject
          ? schedules.find(s => s.date === date && s.id_D === directionObject.id_D)
          : null;

        return schedule ? { ...schedule, Name_direction: directionObject.Name_direction } : null;
      })
    }));
    return schedulesByDate;
  }, [uniqueDates, uniqueDirections, directions, schedules]);

  const handleExportToExcel = useCallback(() => {
    const directionNames = uniqueDirections.map(direction => direction[1]);
  
    const headers = [
      { label: 'Дата', key: 'Дата' },
      ...directionNames.map(name => ({ label: name, key: name })),
    ];
  
    const dataToExport = uniqueDates.map(date => {
      const rowData = { Дата: date }; 
  
      directionNames.forEach(name => {
        const schedule = schedules.find(schedule => schedule.date === date && schedule.direction.Name_direction === name);
        rowData[name] = schedule ? `Время: ${schedule.time} | Аудитория: ${schedule.classroom} | ГЭК: ${schedule.id_G}` : '';
      });
  
      return rowData;
    });
  
    const worksheet = utils.json_to_sheet(dataToExport, {
      header: headers.map(h => h.label)
    });
  
    worksheet['!cols'] = [
      { wch: 15 },
      ...directionNames.map(() => ({ wch: 50 }))
    ];
    worksheet['!rows'] = [{ hpt: 20 }];
  
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Расписание');
  
    writeFile(workbook, 'schedule.xlsx');
  }, [uniqueDates, uniqueDirections, schedules, geks]);

  return (
    <div className="schedule-container px-5">
      <div className="text-center my-4">
        <h3>Список защит</h3>
      </div>
      <div>
        {schedules.length > 0 && isTableView && (
          <>
            <Button variant="primary" className="mx-3" onClick={() => handleEditSchedule(activeCell)} disabled={!activeCell}>Редактировать</Button>
          </>
        )}
        <Button variant="primary" className="mx-3" onClick={handleAddSchedule}>Добавить</Button>
        <Button variant="primary" className="mx-3" onClick={toggleView}>{isTableView ? 'Карточки' : 'Таблица'}</Button>
        {schedules.length > 0 && (
          <Button variant="secondary" className="mx-3" onClick={handleExportToExcel}>Экспорт в Excel</Button>
        )}
      </div>
      <div className="row mx-5">
      {schedules.length > 0 ? (
        isTableView ? (
          <TableView
            uniqueDates={uniqueDates}
            uniqueDirections={uniqueDirections}
            filteredSchedules={filteredSchedules}
            handleSelectedClick={handleSelectedClick}
            handleOpenSchedule={handleOpenSchedule}
            activeCell={activeCell}
            tableRef={tableRef}
          />
        ) : (
          <CardView
            schedules={schedules}
            handleEditSchedule={handleEditSchedule}
          />
        )
      ) : (
        <NoDataMessage />
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
      <WarningWindow 
        show={showWarningWindow} 
        handleClose={handleCloseWarningWindow} 
        errorMessage={errorMessage} 
      />
      <GekCompositionModal
        showModal={showOpenModal}
        handleCloseModal={handleCloseModal}
        schedules={selectedSchedule ? [selectedSchedule] : []}
      />
    </div>
  );
};

const TableView = ({ uniqueDates, uniqueDirections, filteredSchedules, handleSelectedClick, activeCell, tableRef, handleOpenSchedule }) => {
  return (
    <>
      <div className="col-1 px-0 my-4">
        <table className="table table-primary table-bordered table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th className="px-5 py-3">Дата</th>
            </tr>
          </thead>
          <tbody>
            {uniqueDates.map((date, index) => (
              <tr key={index}>
                <td className="" style={{ height: '180px', verticalAlign: 'middle' }}>
                  {new Date(date).toLocaleDateString('ru-GB', { day: '2-digit', month: '2-digit' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-11 px-0 my-4" style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: '800px' }}> {/* Установите минимальную ширину, которая ограничивает ширину таблицы */}
          <table className="table table-bordered table-light table-hover text-center" ref={tableRef}>
            <thead className="table-dark">
              <tr>
                {uniqueDirections.map((direction, index) => (
                  <th className="px-5 py-3" key={index}>{direction[1]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredSchedules.map(({ schedules }, dateIndex) => (
                <tr key={dateIndex}>
                  {schedules.map((sched, directionIndex) => {
                    const isActive = activeCell && sched && activeCell.date === sched.date && activeCell.Name_direction === sched.Name_direction;
                    return (
                      <td 
                        onDoubleClick={() => handleOpenSchedule(activeCell)}
                        key={directionIndex}
                        className={`px-1 ${isActive ? 'table-info' : 'table-light'}`}
                        onClick={() => handleSelectedClick({ event: sched })}
                        style={{ height: '180px', verticalAlign: 'middle' }}
                      >
                        {sched ? (
                          <span>
                            <h5>Защита №{sched.id_DS}</h5>
                            <p>ГЭК №{sched.id_G}</p>
                            <p>Время: {sched.time}</p>
                            <p>Аудитория: {sched.classroom}</p>
                          </span>
                        ) : ""}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const CardView = ({ schedules, handleEditSchedule }) => {
  return (
    <div className="container-fluid text-center my-3">
      <div className="row justify-content-evenly">
        {schedules.map((item, index) => (
          <Card key={index} className="col-2 mx-2 my-4 text-center bg-light">
            <Card.Body>
              <Card.Title>Защита №{item.id_DS} <br></br> {new Date(item.date).toLocaleDateString('ru', { day: '2-digit', month: '2-digit' })}</Card.Title>
              <Card.Text>
                <div>
                  <p>ГЭК №{item.id_G}</p>
                  <p>Время: {item.time}</p>
                  <p>Направление: {item.direction.Name_direction}</p>
                  <p>Аудитория: {item.classroom}</p>
                </div>
              </Card.Text>
              <Button variant="primary" className="my-2" onClick={() => handleEditSchedule(item)}>Редактировать</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SchedulePage;