import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import UpdateDefender from '../modal-windows/UpdateDefender';
import AddDefender from '../modal-windows/AddDefender';
import Search from '../components/SearchMember'; 
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
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setDefenders(response.data);
    })
    .catch(error => console.error('Ошибка при загрузке данных:', error));
  }, []);

  useEffect(() => {
    setSortedDefenders(defenders);
    handleSearch();
  }, [defenders]);
  
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
      // Логика сортировки остается без изменений
    });
    setSortedDefenders(sortedData);
  }, [sortOrder, sortColumn, defenders]);

  const sortData = (column) => {
    // Логика сортировки остается без изменений
  };

  const renderSortArrow = (column) => {
    // Логика отрисовки стрелки сортировки остается без изменений
  };

  const handleRowClick = (defender) => {
    // Логика обработки клика по строке таблицы остается без изменений
  };

  const handleCloseModal = () => {
    // Логика закрытия модальных окон остается без изменений
  };

  const handleEditDefender = () => {
    // Логика редактирования студента остается без изменений
  };

  const handleAddDefender = () => {
    // Логика добавления студента остается без изменений
  };

  const handleSaveAddDefender = (formData) => {
    // Логика сохранения добавленного студента остается без изменений
  };

  const handleSaveUpdateDefender = (formData) => {
    // Логика сохранения изменений студента остается без изменений
  };

  const handleInputChange = (e) => {
    // Логика обработки изменений в форме остается без изменений
  };

  const handleSearch = (e) => {
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
  };


  return (
    <div className="my-5 px-5">
      <Search searchText={searchText} handleSearch={handleSearch} />        
      <Button variant="primary" className="mx-3" onClick={handleEditDefender} disabled={!activeRow}>
        Редактировать
      </Button>
      <Button variant="primary" className="mx-3" onClick={handleAddDefender}>
        Добавить
      </Button>
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