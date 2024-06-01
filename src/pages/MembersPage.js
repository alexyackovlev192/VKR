import React, { useState, useRef, useEffect, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import UpdateMember from '../modal-windows/UpdateMember';
import WarningWindow from '../components/WarningWindow';
import SearchMem from '../components/SearchMember';
import NoDataMessage from '../components/NoDataMessage'; 
import { writeFile, utils } from 'xlsx';
import './style-pages/MembersPage.css';

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showWarningWindow, setShowWarningWindow] = useState(false);
  const [formData, setFormData] = useState(null);
  const [activeRow, setActiveRow] = useState(null);
  const [changes, setChanges] = useState(false);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filters, setFilters] = useState({
    fullname: '',
    post: '',
    mail: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const tableRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/gecMembers', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setMembers(response.data);
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
      });
  }, []);

  const sortedMembers = useMemo(() => {
    const filteredData = members.filter((member) => {
      const fullnameMatch = member.Fullname ? member.Fullname.toLowerCase().includes(filters.fullname.toLowerCase()) : false;
      const postMatch = member.Post ? member.Post.toLowerCase().includes(filters.post.toLowerCase()) : false;
      const mailMatch = member.Mail ? member.Mail.toLowerCase().includes(filters.mail.toLowerCase()) : false;
      return fullnameMatch && postMatch && mailMatch;
    });

    if (!sortColumn) return filteredData;

    return filteredData.slice().sort((a, b) => {
      return sortOrder === 'asc' ? a[sortColumn].localeCompare(b[sortColumn]) : b[sortColumn].localeCompare(a[sortColumn]);
    });
  }, [members, filters, sortColumn, sortOrder]);

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

  const handleCloseWarningWindow = () => {
    setShowWarningWindow(false);
  };

  const handleEditMember = () => {
    setFormData(activeRow);
    setShowUpdateModal(true);
  };

  const handleSaveUpdateMembers = (formData) => {
    const token = localStorage.getItem('token');
    if (!changes) {
      setErrorMessage('Нет изменений для сохранения');
      setShowWarningWindow(true);
      return;
    }

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
      .catch(error => {
        console.error('Ошибка при сохранении изменении информации о члене ГЭК:', error);
        setErrorMessage('Ошибка при сохранении изменении информации о члене ГЭК.');
        setShowWarningWindow(true);
      });

    setChanges(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setChanges(true);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
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

  return (
    <div className="px-5">
      <div className="text-center my-4">
        <h3>Список членов комиссии</h3>
      </div>
      {members.length > 0 ? (
        <>
          <SearchMem filters={filters} handleFilterChange={handleFilterChange} />
          <Button variant="primary" className="mx-3" onClick={handleEditMember} disabled={!activeRow}>
            Редактировать
          </Button>
          <Button variant="secondary" className="mx-3" onClick={handleExportToExcel}>
            Скачать таблицу
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
      ) : (
        <NoDataMessage />
      )}          
        <UpdateMember
        showModal={showUpdateModal}
        handleCloseModal={handleCloseModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSaveChanges={handleSaveUpdateMembers}
      />
      <WarningWindow 
        show={showWarningWindow} 
        handleClose={handleCloseWarningWindow} 
        errorMessage={errorMessage} />
    </div>
  );
};

export default MembersPage;