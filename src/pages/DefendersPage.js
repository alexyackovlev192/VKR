import React, { useState, useRef, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import UpdateDefender from '../modal-windows/UpdateDefender';
import AddDefender from '../modal-windows/AddDefender';

import defendersData from '../data/defendersData.json';
import './style-pages/DefendersPage.css';

const DefendersPage = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [activeRow, setActiveRow] = useState(null);

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchText, setSearchText] = useState('');
  const [sortedDefenders, setSortedDefenders] = useState(defendersData);

  const tableRef = useRef(null);

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
    const sortedData = defendersData.slice().sort((a, b) => {
      if (!sortColumn) return 0;
      if (sortColumn === 'averageGrade') {
        return sortOrder === 'asc' ? a[sortColumn] - b[sortColumn] : b[sortColumn] - a[sortColumn];
      } else if (sortColumn === 'hasHonors') {
        let valA = a[sortColumn] ? 'Да' : 'Нет';
        let valB = b[sortColumn] ? 'Да' : 'Нет';
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else {
        return sortOrder === 'asc' ? a[sortColumn].localeCompare(b[sortColumn]) : b[sortColumn].localeCompare(a[sortColumn]);
      }
    });
    setSortedDefenders(sortedData);
  }, [sortOrder, sortColumn]);

  const sortData = useCallback((column) => {
    if (sortColumn === column) {
      setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  }, [sortColumn, sortOrder]);

  const renderSortArrow = useCallback((column) => {
    if (sortColumn === column) {
      return sortOrder === 'asc' ? ' ↑' : ' ↓';
    }
    return null;
  }, [sortColumn, sortOrder]);

  const handleRowClick = useCallback((defender) => {
    setActiveRow(defender);
    console.log('Выбран студент:', defender.id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowUpdateModal(false);
    setShowAddModal(false);
    setFormData(null);
  }, []);

  const handleEditDefender = useCallback(() => {
    setFormData(activeRow);
    setShowUpdateModal(true);
  }, [activeRow]);

  const handleAddDefender = useCallback(() => {
    setShowAddModal(true);
    setFormData(null);
  }, []);

  const handleSaveChanges = useCallback((formData) => {
    console.log(showUpdateModal ? 'Сохранение изменений:' : 'Добавление нового участника:', formData);
    handleCloseModal();
  }, [showUpdateModal, handleCloseModal]);

  const handleDeleteDefender = useCallback((item) => {
    console.log('Удаление участника:', item);
    setActiveRow(null);
    handleCloseModal();
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: type === 'checkbox' ? checked : value }));
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchText(e.target.value);
    const filteredData = defendersData.filter((defender) => {
      const { name, group, topic, supervisor, averageGrade, hasHonors } = defender;
      const searchRegExp = new RegExp(e.target.value.trim(), 'i');
      return (
        searchRegExp.test(name) ||
        searchRegExp.test(group) ||
        searchRegExp.test(topic) ||
        searchRegExp.test(supervisor) ||
        searchRegExp.test(averageGrade.toString()) ||
        searchRegExp.test(hasHonors ? 'Да' : 'Нет')
      );
    });
    setSortedDefenders(filteredData);
  }, []);

  return (
    <div className="my-5 px-5">
      <>
        <Button variant="primary" className="mx-3" onClick={handleEditDefender} disabled={!activeRow}>
          Редактировать
        </Button>
        <Button variant="primary" className="mx-3" onClick={handleAddDefender}>
          Добавить
        </Button>
      </>
      <input
          type="text"
          className="form-control mb-3 my-3"
          placeholder="Поиск..."
          value={searchText}
          onChange={handleSearch}
        />
      <div className="my-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <table className="table table-striped table-bordered table-light table-hover text-center" ref={tableRef}>
          <thead className="table-dark">
            <tr>
              <th>№</th>
              <th onClick={() => sortData('name')}>ФИО{renderSortArrow('name')}</th>
              <th onClick={() => sortData('group')}>Группа{renderSortArrow('group')}</th>
              <th onClick={() => sortData('topic')}>Тема{renderSortArrow('topic')}</th>
              <th onClick={() => sortData('supervisor')}>Научрук{renderSortArrow('supervisor')}</th>
              <th onClick={() => sortData('averageGrade')}>Средний балл{renderSortArrow('averageGrade')}</th>
              <th onClick={() => sortData('hasHonors')}>Красный диплом{renderSortArrow('hasHonors')}</th>
            </tr>
          </thead>
          <tbody>
            {sortedDefenders.map((defender, index) => (
              <tr
                key={defender.id}
                className={activeRow === defender ? 'table-info' : 'table-light'}
                onClick={() => handleRowClick(defender)}
              >
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
        handleSaveChanges={() => handleSaveChanges(formData)}
        handleDeleteDefender={handleDeleteDefender}
      />
      <AddDefender
        showModal={showAddModal}
        handleCloseModal={handleCloseModal}
        handleInputChange={handleInputChange}
        handleSaveChanges={() => handleSaveChanges(formData)}
        formData={formData}
      />
    </div>
  );
};

export default DefendersPage;