/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UpdateDefender from '../../modal-windows/UpdateDefender';
import AddDefender from '../../modal-windows/AddDefender';
import SearchStud from '../../components/SearchDefender';

import '../style-pages/DefendersPage.css';

const DefendersPage = () => {
  const [defenders, setDefenders] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [activeRow, setActiveRow] = useState(null);

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedDefenders, setSortedDefenders] = useState([]);

  const [filters, setFilters] = useState({
    fullname: '',
    group: '',
    topic: '',
    scientificAdviser: '',
    avgMark: '',
    redDiplom: '' 
  });

  const tableRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/students/thisYear', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setDefenders(response.data);
      setSortedDefenders(response.data);
    })
    .catch(error => console.error('Ошибка при загрузке данных:', error));
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
        let valA = a[sortColumn] ? 'Да' : 'Нет';
        let valB = b[sortColumn] ? 'Да' : 'Нет';
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
    setFormData(null);
  };

  const handleEditDefender = () => {
    setFormData(activeRow);
    setShowUpdateModal(true);
  };

  const handleAddDefender = () => {
    setShowAddModal(true);
    setFormData(null);
  };

  const handleSaveAddDefender = (formData) => {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:5000/students/create', formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Новый студент успешно добавлен:', response.data);
        setDefenders(prevDefenders => [...prevDefenders, response.data]);
        handleCloseModal();
      })
      .catch(error => console.error('Ошибка при добавлении студента:', error));
  };

  const handleSaveUpdateDefender = (formData) => {
    const token = localStorage.getItem('token');
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
        handleCloseModal();
      })
      .catch(error => console.error('Ошибка при сохранении изменений студента:', error));
  };

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    const { fullname, group, topic, scientificAdviser, avgMark, redDiplom } = filters;
    const filteredData = defenders.filter((defender) => {
      const fullnameMatch = defender.Fullname ? defender.Fullname.toLowerCase().includes(fullname.toLowerCase()) : true;
      const groupMatch = defender.Group ? defender.Group.toLowerCase().includes(group.toLowerCase()) : true;
      const topicMatch = defender.Topic ? defender.Topic.toLowerCase().includes(topic.toLowerCase()) : true;
      const scientificAdviserMatch = defender.ScientificAdviser ? defender.ScientificAdviser.toLowerCase().includes(scientificAdviser.toLowerCase()) : true;
      const avgMarkMatch = avgMark ? defender.Avg_Mark === parseFloat(avgMark) : true;
      const redDiplomMatch = redDiplom === '' ? true : (defender.Red_Diplom ? 'Да' : 'Нет') === redDiplom;
      return fullnameMatch && groupMatch && topicMatch && scientificAdviserMatch && avgMarkMatch && redDiplomMatch;
    });
    setSortedDefenders(filteredData);
  };

  return (
    <div className="my-5 px-5">
      <div className="">
        <SearchStud filters={filters} handleFilterChange={handleFilterChange} /> 
        <Button variant="primary" className="mx-3" onClick={handleEditDefender} disabled={!activeRow}>
          Редактировать
        </Button>
        <Button variant="primary" className="mx-3" onClick={handleAddDefender}>
          Добавить
        </Button>
        <Link to={`/test`} className="mx-3 ">
          <Button variant="primary" className="">Составы защищающихся</Button>
        </Link>
      </div>
      <div className="my-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
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
                <td>{defender.Red_Diplom ? 'Да' : 'Нет'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
    </div>
  );
};

export default DefendersPage;