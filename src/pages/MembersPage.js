/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import UpdateMember from '../modal-windows/UpdateMember';
import SearchMem from '../components/SearchMember';
import { writeFile, utils } from 'xlsx';
import './style-pages/MembersPage.css';

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [activeRow, setActiveRow] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedMembers, setSortedMembers] = useState([]);
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

    axios.get('http://localhost:5000/gecMembers', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setMembers(response.data);
      setSortedMembers(response.data);
    })
    .catch(error => console.error('Ошибка при загрузке данных:', error));
  }, []);

  useEffect(() => {
    setSortedMembers(members);
    handleSearch();
  }, [members, filters]);

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

    const sortedData = sortedMembers.slice().sort((a, b) => {
      return sortOrder === 'asc' ? a[sortColumn].localeCompare(b[sortColumn]) : b[sortColumn].localeCompare(a[sortColumn]);
    });
    setSortedMembers(sortedData);
  }, [sortColumn, sortOrder, sortedMembers]);

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
    console.log('Выбран ГЭК:', member.id_U);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setFormData(null);
  };

  const handleEditMember = () => {
    setFormData(activeRow);
    setShowUpdateModal(true);
  };

  const handleSaveUpdateMembers = (formData) => {
    const token = localStorage.getItem('token');
    axios.put(`http://localhost:5000/gecMembers/${formData.id_U}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Изменения информации о члене ГЭК успешно:', response.data);
      setMembers(prevMembers =>
        prevMembers.map(member =>
          member.id_U === formData.id_U ? { ...member, ...formData } : member
        )
      );
      handleCloseModal();
    })
    .catch(error => console.error('Ошибка при сохранении изменении информации о члене ГЭК:', error));
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
    const filteredData = members.filter((member) => {
      const fullnameMatch = member.Fullname ? member.Fullname.toLowerCase().includes(fullname.toLowerCase()) : false;
      const postMatch = member.Post ? member.Post.toLowerCase().includes(post.toLowerCase()) : false;
      const mailMatch = member.Mail ? member.Mail.toLowerCase().includes(mail.toLowerCase()) : false;
      return fullnameMatch && postMatch && mailMatch;
    });
    setSortedMembers(filteredData);
  };

  const handleExportToExcel = () => {
    const ws = utils.json_to_sheet(
      sortedMembers.map((member, index) => ({
        '№': index + 1,
        'ФИО': member.Fullname,
        'Должность': member.Post,
        'Почта': member.Mail
      }))
    );

    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Members');

    writeFile(wb, 'members.xlsx');
  };

  // Function to render content based on user role
  const renderContentByRole = () => {
    if (!userRole) return null;

    // Assuming userRole is an array of roles
    if (userRole.includes(3)) {
      return (
        <>
          <Button variant="primary" className="mx-3" onClick={handleEditMember} disabled={!activeRow}>
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
                {sortedMembers.map((member, index) => (
                  <tr
                    key={member.id}
                    className={activeRow === member ? 'table-info' : 'table-light'}
                    onClick={() => handleRowClick(member)}
                  >
                    <td>{index + 1}</td>
                    <td>{member.Fullname}</td>
                    <td>{member.Post}</td>
                    <td>{member.Mail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <UpdateMember
            members={members}
            showModal={showUpdateModal}
            handleCloseModal={handleCloseModal}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSaveChanges={handleSaveUpdateMembers}
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
                {sortedMembers.map((member, index) => (
                  <tr
                    key={member.id}
                    className={activeRow === member ? 'table-info' : 'table-light'}
                    onClick={() => handleRowClick(member)}
                  >
                    <td>{index + 1}</td>
                    <td>{member.Fullname}</td>
                    <td>{member.Post}</td>
                    <td>{member.Mail}</td>
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

export default MembersPage;