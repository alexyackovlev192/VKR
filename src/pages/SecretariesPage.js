/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import UpdateSecretarie from '../modal-windows/UpdateSecretarie';
import SearchMem from '../components/SearchMember';
import { writeFile, utils } from 'xlsx';

const SecretariesPage = () => {
  const [secretaries, setSecretaries] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [activeRow, setActiveRow] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedSecretaries, setSortedSecretaries] = useState([]);
  const [filters, setFilters] = useState({
    fullname: '',
    post: '',
    mail: ''
  });
  const tableRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.roles);
    }

    axios.get('http://localhost:5000/secretariesGec', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setSecretaries(response.data);
      setSortedSecretaries(response.data);
    })
    .catch(error => console.error('Ошибка при загрузке данных:', error));
  }, []);

  useEffect(() => {
    setSortedSecretaries(secretaries);
    handleSearch();
  }, [secretaries, filters]);

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
    if (!sortColumn) return;

    const sortedData = sortedSecretaries.slice().sort((a, b) => {
      return sortOrder === 'asc' ? a[sortColumn].localeCompare(b[sortColumn]) : b[sortColumn].localeCompare(a[sortColumn]);
    });
    setSortedSecretaries(sortedData);
  }, [sortColumn, sortOrder, sortedSecretaries]);

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

  const handleRowClick = (member) => {
    setActiveRow(member);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setFormData(null);
  };

  const handleEditSecretarie = () => {
    setFormData(activeRow);
    setShowUpdateModal(true);
  };

  const handleSaveUpdateSecretaries = (formData) => {
    const token = localStorage.getItem('token');
    axios.put(`http://localhost:5000/secretariesGec/${formData.id_U}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Изменения информации о секретаре обновлена:', response.data);
      setSecretaries(prevSecretaries =>
        prevSecretaries.map( secretarie =>
            secretarie.id_U === formData.id_U ? { ...secretarie, ...formData } : secretarie
        )
      );
      handleCloseModal();
    })
    .catch(error => console.error('Ошибка при сохранении изменении информации о секретаре:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    const { fullname, post, mail } = filters;
    const filteredData = secretaries.filter((sec) => {
      const fullnameMatch = sec.Fullname ? sec.Fullname.toLowerCase().includes(fullname.toLowerCase()) : false;
      const postMatch = sec.Post ? sec.Post.toLowerCase().includes(post.toLowerCase()) : false;
      const mailMatch = sec.Mail ? sec.Mail.toLowerCase().includes(mail.toLowerCase()) : false;
      return fullnameMatch && postMatch && mailMatch;
    });
    setSortedSecretaries(filteredData);
  };

  const handleExportToExcel = () => {
    const ws = utils.json_to_sheet(
      sortedSecretaries.map((sec, index) => ({
        '№': index + 1,
        'ФИО': sec.Fullname,
        'Должность': sec.Post,
        'Почта': sec.Mail
      }))
    );

    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Secretaries');

    writeFile(wb, 'Secretaries.xlsx');
  };

  const renderContentByRole = () => {
    if (!userRole) return null;

    if (userRole.includes(3)) {
      return (
        <>
          <Button variant="primary" className="mx-3" onClick={handleEditSecretarie} disabled={!activeRow}>
            Редактировать
          </Button>
          <Button variant="secondary" className="mx-3" onClick={handleExportToExcel}>
            Экспорт в Excel
          </Button>
          <div className="my-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <table className="table table-striped table-bordered table-light table-hover text-center" ref={tableRef}>
              <thead className="table-dark">
                <tr>
                  <th>№</th>
                  <th onClick={() => sortData('Fullname')}>ФИО{renderSortArrow('Fullname')}</th>
                  <th onClick={() => sortData('Post')}>Должность{renderSortArrow('Post')}</th>
                  <th onClick={() => sortData('Mail')}>Почта{renderSortArrow('Mail')}</th>
                </tr>
              </thead>
              <tbody>
                {sortedSecretaries.map((sec, index) => (
                  <tr
                    key={sec.id}
                    className={activeRow === sec ? 'table-info' : 'table-light'}
                    onClick={() => handleRowClick(sec)}
                  >
                    <td>{index + 1}</td>
                    <td>{sec.Fullname}</td>
                    <td>{sec.Post}</td>
                    <td>{sec.Mail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <UpdateSecretarie
            secretaries={secretaries}
            showModal={showUpdateModal}
            handleCloseModal={handleCloseModal}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSaveChanges={handleSaveUpdateSecretaries}
          />
        </>
      );
    } else if (userRole.includes(2)) {
      return (
        <>
          <Button variant="secondary" className="mx-3" onClick={handleExportToExcel}>
            Экспорт в Excel
          </Button>
          <div className="my-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <table className="table table-striped table-bordered table-light table-hover text-center" ref={tableRef}>
              <thead className="table-dark">
                <tr>
                  <th>№</th>
                  <th onClick={() => sortData('Fullname')}>ФИО{renderSortArrow('Fullname')}</th>
                  <th onClick={() => sortData('Post')}>Должность{renderSortArrow('Post')}</th>
                  <th onClick={() => sortData('Mail')}>Почта{renderSortArrow('Mail')}</th>
                </tr>
              </thead>
              <tbody>
                {sortedSecretaries.map((sec, index) => (
                  <tr
                    key={sec.id}
                    className={activeRow === sec ? 'table-info' : 'table-light'}
                    onClick={() => handleRowClick(sec)}
                  >
                    <td>{index + 1}</td>
                    <td>{sec.Fullname}</td>
                    <td>{sec.Post}</td>
                    <td>{sec.Mail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );
    } else {
      return <div>У вас нет доступа к этой странице</div>;
    }
  };

  return (
    <div className="my-5 px-5">
      <SearchMem filters={filters} handleFilterChange={handleFilterChange} />
      {renderContentByRole()}
    </div>
  );
};

export default SecretariesPage;