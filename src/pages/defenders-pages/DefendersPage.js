/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { writeFile, utils } from 'xlsx';
import UpdateDefender from '../../modal-windows/UpdateDefender';
import WarningWindow from '../../components/WarningWindow';
import AddDefender from '../../modal-windows/AddDefender';
import SearchStud from '../../components/SearchDefender';
import NoDataMessage from '../../components/NoDataMessage'; 
import ImportDefendersModal from '../../modal-windows/ImportDefenders';

import '../style-pages/DefendersPage.css';

const DefendersPage = () => {
  const [defenders, setDefenders] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showWarningWindow, setShowWarningWindow] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [activeRow, setActiveRow] = useState(null);
  const [changes, setChanges] = useState(false);

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedDefenders, setSortedDefenders] = useState([]);
  
  const [filters, setFilters] = useState({
    fullname: '',
    group: '',
    topic: '',
    scientificAdviser: '',
    avgMark: '',
    redDiplom: '',
    name_direction: ''
  });
  
  const [errorMessage, setErrorMessage] = useState('');
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchStudentsAndDirections = async () => {
      const token = localStorage.getItem('token');
      try {
        const studentsResponse = await axios.get('http://localhost:5000/students/thisYear', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        const studentsWithDirections = await Promise.all(
          studentsResponse.data.map(async student => {
            const directionsResponse = await axios.get(`http://localhost:5000/directions/${student.id_D}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            return { ...student, Name_direction: directionsResponse.data.Name_direction };
          })
        );
  
        setDefenders(studentsWithDirections);
        setSortedDefenders(studentsWithDirections);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };
  
    fetchStudentsAndDirections();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [defenders, filters]);

  useEffect(() => {
    const handleClickOutsideTable = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setActiveRow(null);
      }
    };

    document.addEventListener('click', handleClickOutsideTable);
    return () => {
      document.removeEventListener('click', handleClickOutsideTable);
    };
  }, []);

  useEffect(() => {
    const sortedData = defenders.slice().sort((a, b) => {
      if (!sortColumn) return 0;
      if (sortColumn === 'Avg_Mark') {
        return sortOrder === 'asc' ? a[sortColumn] - b[sortColumn] : b[sortColumn] - a[sortColumn];
      } else if (sortColumn === 'Red_Diplom') {
        let valA = a[sortColumn] ? 'Да' : null;
        let valB = b[sortColumn] ? 'Да' : null;
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else {
        return sortOrder === 'asc' ? a[sortColumn].localeCompare(b[sortColumn]) : b[sortColumn].localeCompare(a[sortColumn]);
      }
    });
    setSortedDefenders(sortedData);
  }, [sortOrder, sortColumn, defenders]);

  const sortData = (column) => {
    if (sortColumn === column) {
      setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const renderSortArrow = (column) => {
    if (sortColumn === column) {
      return sortOrder === 'asc' ? ' ↑' : ' ↓';
    }
    return null;
  };

  const handleRowClick = (defender) => {
    setActiveRow(defender);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setShowAddModal(false);
    setShowImportModal(false);
    setFormData(null);
  };

  const handleCloseWarningWindow = () => {
    setShowWarningWindow(false);
  };

  const handleEditDefender = async () => {
    if (activeRow) {
      const token = localStorage.getItem('token');
      try {
        const directionResponse = await axios.get(`http://localhost:5000/directions/${activeRow.id_D}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const directionName = directionResponse.data.Name_direction;

        setFormData({
          ...activeRow,
          Name_direction: directionName
        });
        setShowUpdateModal(true);
      } catch (error) {
        console.error('Ошибка при получении направления:', error);
        setErrorMessage('Ошибка при получении направления');
        setShowWarningWindow(true);
      }
    }
  };

  const handleAddDefender = () => {
    setShowAddModal(true);
    setFormData(null);
  };

  const handleSaveAddDefender = async (formData) => {
    const token = localStorage.getItem('token');

    if (!formData || !formData.Fullname || 
      !formData.Group || 
      !formData.Topic || 
      !formData.ScientificAdviser || 
      !formData.Avg_Mark || 
      !formData.YearOfDefense || 
      !formData.Name_direction) {
      setErrorMessage('Не все поля заполнены');
      setShowWarningWindow(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/students/create', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
  
      const newStudent = formData;
  
      setDefenders(prevDefenders => [...prevDefenders, newStudent]);
      setSortedDefenders(prevSorted => [...prevSorted, newStudent]);
      handleCloseModal();
    } catch (error) {
      console.error('Ошибка при добавлении студента:', error);
      setErrorMessage('Ошибка при добавлении студента');
      setShowWarningWindow(true);
    }
    setChanges(false);
  };


  const handleSaveUpdateDefender = (formData) => {
    const token = localStorage.getItem('token');
    if (!changes) {
      setErrorMessage('Нет изменений для сохранения');
      setShowWarningWindow(true);
      return;
    }


    axios.put(`http://localhost:5000/students/${formData.id_S}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Изменения студента успешно сохранены:', response.data);
        setDefenders(prevDefenders =>
          prevDefenders.map(defender =>
            defender.id_S === formData.id_S ? { ...defender, ...formData } : defender
          )
        );
        setSortedDefenders(prevSorted =>
          prevSorted.map(defender =>
            defender.id_S === formData.id_S ? { ...defender, ...formData } : defender
          )
        );
        handleCloseModal();
      })
      .catch(error => {
        console.error('Ошибка при сохранении изменений студента:', error)
        setErrorMessage('Ошибка при сохранении изменений студента');
        setShowWarningWindow(true);
      });
      setChanges(false);
  };

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
    setChanges(true);
  };


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    const { fullname, group, topic, scientificAdviser, avgMark, redDiplom, name_direction } = filters;
    
    const filteredData = defenders.filter((defender) => {
      const fullnameMatch = fullname ? defender.Fullname && defender.Fullname.toLowerCase().includes(fullname.toLowerCase()) : true;
      const groupMatch = group ? defender.Group && defender.Group.toLowerCase().includes(group.toLowerCase()) : true;
      const topicMatch = topic ? defender.Topic && defender.Topic.toLowerCase().includes(topic.toLowerCase()) : true;
      const scientificAdviserMatch = scientificAdviser ? defender.ScientificAdviser && defender.ScientificAdviser.toLowerCase().includes(scientificAdviser.toLowerCase()) : true;
      const nameDirectionMatch = name_direction ? defender.Name_direction && defender.Name_direction.toLowerCase().includes(name_direction.toLowerCase()) : true;
      const avgMarkMatch = avgMark ? defender.Avg_Mark === parseFloat(avgMark) : true;
      const redDiplomMatch = redDiplom ? (defender.Red_Diplom ? 'Да' : null) === redDiplom : true;
      
      return fullnameMatch && groupMatch && topicMatch && scientificAdviserMatch && avgMarkMatch && redDiplomMatch && nameDirectionMatch;
    });
  
    setSortedDefenders(filteredData);
  };

  const handleExport = () => {
    const headers = ['ФИО', 'Группа', 'Тема', 'Руководитель', 'Средний балл', 'С отличием', 'Год поступления', 'Направление'];
    const data = sortedDefenders.map(defender => [
      defender.Fullname,
      defender.Group,
      defender.Topic,
      defender.ScientificAdviser,
      defender.Avg_Mark,
      defender.Red_Diplom ? 'Да' : null,
      defender.YearOfDefense,
      defender.Name_direction
    ]);

    const worksheet = utils.aoa_to_sheet([headers, ...data]);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Defenders');
    writeFile(workbook, 'Defenders.xlsx');
  };
  
  const handleFileUpload = async (data) => {
    const token = localStorage.getItem('token');
  
    for (let row of data) {
      const formattedData = {
        Fullname: row.Fullname,
        Group: row.Group,
        Topic: row.Topic,
        ScientificAdviser: row.ScientificAdviser,
        Avg_Mark: parseFloat(row.Avg_Mark),
        Red_Diplom: row.Red_Diplom === 'Да' ? row.Red_Diplom : null,
        YearOfDefense: row.YearOfDefense,
        Name_direction: row.Name_direction
      };
  
      try {
        const response = await axios.post('http://localhost:5000/students/create', formattedData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);

        setDefenders(prevDefenders => [...prevDefenders, formattedData]);
        setSortedDefenders(prevSorted => [...prevSorted, formattedData]);
        handleCloseModal();
      } catch (error) {
        console.error('Ошибка при импорте данных:', error);
      }
    }
  };


  return (
    <div className="px-5">
      <div className="text-center my-4">
        <h3>Список студентов</h3>
      </div>
      {sortedDefenders.length > 0 && (
        <>
          <SearchStud filters={filters} handleFilterChange={handleFilterChange} />
          <Button variant="primary" className="mx-3" onClick={handleEditDefender} disabled={!activeRow}>Редактировать</Button>
        </>
      )}
      <Button variant="primary" className="mx-3" onClick={handleAddDefender}>
        Добавить
      </Button>
      {sortedDefenders.length > 0 && (
        <>
          <Link to={`/list-defenders`} className="mx-3 ">
            <Button variant="primary" className="">Составы</Button>
          </Link>
          <Button variant="secondary" className="mx-3" onClick={handleExport}>
            Скачать таблицу
          </Button>
        </>
      )}
      <Button variant="secondary" className="mx-3" onClick={() => setShowImportModal(true)}>
        Загрузить данные
      </Button>
      {sortedDefenders.length > 0 ? (
        <>
          <div className="my-4" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <table className="table table-striped table-bordered table-light table-hover text-center" ref={tableRef}>
              <thead className="table-dark">
                <tr>
                  <th>№</th>
                  <th onClick={() => sortData('Fullname')}>ФИО{renderSortArrow('Fullname')}</th>
                  <th onClick={() => sortData('Group')}>Группа{renderSortArrow('Group')}</th>
                  <th onClick={() => sortData('Topic')}>Тема{renderSortArrow('Topic')}</th>
                  <th onClick={() => sortData('ScientificAdviser')}>Руководитель{renderSortArrow('ScientificAdviser')}</th>
                  <th onClick={() => sortData('Avg_Mark')}>Средний балл{renderSortArrow('Avg_Mark')}</th>
                  <th onClick={() => sortData('Red_Diplom')}>С отличием{renderSortArrow('Red_Diplom')}</th>
                  <th onClick={() => sortData('Name_direction')}>Направление{renderSortArrow('Name_direction')}</th>
                </tr>
              </thead>
              <tbody>
                {sortedDefenders.map((defender, index) => (
                  <tr
                    key={defender.id_S}
                    className={activeRow && activeRow.id_S === defender.id_S ? 'table-primary' : ''}
                    onClick={() => handleRowClick(defender)}
                  >
                    <td>{index + 1}</td>
                    <td>{defender.Fullname}</td>
                    <td>{defender.Group}</td>
                    <td>{defender.Topic}</td>
                    <td>{defender.ScientificAdviser}</td>
                    <td>{defender.Avg_Mark}</td>
                    <td>{defender.Red_Diplom ? 'Да' : null}</td>
                    <td>{defender.Name_direction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <NoDataMessage />
      )} 
      {showUpdateModal && (
        <UpdateDefender
          showModal={showUpdateModal}
          handleCloseModal={handleCloseModal}
          handleSaveChanges={handleSaveUpdateDefender}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}
      {showAddModal && (
        <AddDefender
          showModal={showAddModal}
          handleCloseModal={handleCloseModal}
          handleSaveChanges={handleSaveAddDefender}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}
      {showImportModal && (
        <ImportDefendersModal
          showModal={showImportModal}
          handleCloseModal={handleCloseModal}
          handleFileUpload={handleFileUpload}
        />
      )}          
      <WarningWindow 
        show={showWarningWindow} 
        handleClose={handleCloseWarningWindow} 
        errorMessage={errorMessage} />
    </div>
  );
};

export default DefendersPage;