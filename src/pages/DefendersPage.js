import React, { useState, useRef, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import UpdateDefender from '../modal-windows/UpdateDefender';
import AddDefender from '../modal-windows/AddDefender';
import './style-pages/DefendersPage.css';

const DefendersPage = () => {
  const [defenders, setDefenders] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [activeRow, setActiveRow] = useState(null);

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchText, setSearchText] = useState('');
  const [sortedDefenders, setSortedDefenders] = useState([]);

  const tableRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/students/thisYear', {
      headers: {
        Authorization: `Bearer ${token}` // Добавляем токен в заголовок запроса
      }
    })
      .then(response => {
        setDefenders(response.data);
        setSortedDefenders(response.data);
        console.log(response.data);
      })
      .catch(error => console.error('Ошибка при получении данных:', error));
  }, []);

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

  const sortData = useCallback((column) => {
    if (sortColumn === column) {
      setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  }, [sortColumn]);

  const renderSortArrow = useCallback((column) => {
    if (sortColumn === column) {
      return sortOrder === 'asc' ? ' ↑' : ' ↓';
    }
    return null;
  }, [sortColumn, sortOrder]);

  const handleRowClick = useCallback((defender) => {
    setActiveRow(defender);
    console.log('Выбран студент:', defender.id_S);
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
  }, [handleCloseModal]);

  const handleInputChange = useCallback((e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: type === 'checkbox' ? checked : value }));
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchText(e.target.value);
    const filteredData = defenders.filter((defender) => {
      const { Fullname, Group, Topic, ScientificAdviser, Avg_Mark, Red_Diplom } = defender;
      const searchRegExp = new RegExp(e.target.value.trim(), 'i');
      return (
        searchRegExp.test(Fullname) ||
        searchRegExp.test(Group) ||
        searchRegExp.test(Topic) ||
        searchRegExp.test(ScientificAdviser) ||
        searchRegExp.test(Avg_Mark.toString()) ||
        searchRegExp.test(Red_Diplom ? 'Да' : 'Нет')
      );
    });
    setSortedDefenders(filteredData);
  }, [defenders]);

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
          show={showUpdateModal}
          onClose={handleCloseModal}
          onSave={handleSaveChanges}
          formData={formData}
          onInputChange={handleInputChange}
        />
      )}
      {showAddModal && (
        <AddDefender
          show={showAddModal}
          onClose={handleCloseModal}
          onSave={handleSaveChanges}
          formData={formData}
          onInputChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default DefendersPage;