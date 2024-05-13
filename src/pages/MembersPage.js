import React, { useState, useRef, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import UpdateMember from '../modal-windows/UpdateMember';
//import AddMember from '../modal-windows/AddMember';

import './style-pages/MembersPage.css';

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  //const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [activeRow, setActiveRow] = useState(null);
  
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchText, setSearchText] = useState('');
  const [sortedMembers, setSortedMembers] = useState([]);

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
    .catch(error => console.error('Ошибка при загрузке данных:', error));
  }, []);

  useEffect(() => {
    setSortedMembers(members);
  }, [members]);


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
    const sortedData = sortedMembers.slice().sort((a, b) => {
      if (!sortColumn) return 0;
      if (sortColumn === 'Fullname' || sortColumn === 'Post' || sortColumn === 'Mail') {
        return sortOrder === 'asc' ? a[sortColumn].localeCompare(b[sortColumn]) : b[sortColumn].localeCompare(a[sortColumn]);
      }
      return 0;
    });
    setSortedMembers(sortedData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortColumn, sortOrder]);

  const sortData = useCallback((column) => {
    if (sortColumn === column) {
      setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  }, [sortColumn]);

  const renderSortArrow = (column) => {
    if (sortColumn === column) {
        return sortOrder === 'asc' ? ' ↑' : ' ↓';
    }
    return null;
  };
  
  const handleRowClick = useCallback((member) => {
    setActiveRow(member);
    console.log('Выбран ГЭК:', member.id_U);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowUpdateModal(false);
    //setShowAddModal(false);
    setFormData(null);
  }, []);

  const handleEditMember = useCallback(() => {
    setActiveRow(activeRow);
    setFormData(activeRow);
    setShowUpdateModal(true);
  }, [activeRow]);

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
          prevMembers.map(members =>
            members.id_U === formData.id_U ? { ...members, ...formData } : members
          )
        );
        handleCloseModal();
      })
      .catch(error => console.error('Ошибка при сохранении изменении информации о члене ГЭК:', error));
  };

  // const handleAddMember = useCallback(() => {
  //   setShowAddModal(true);
  //   setFormData(null);
  // }, []);

  // const handleSaveAddMembers = (formData) => {
  //   const token = localStorage.getItem('token');
  //   axios.post('http://localhost:5000/gecMembers/create', formData, {
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   })
  //     .then(response => {
  //       console.log('Новый член ГЭК успешно добавлен:', response.data);
  //       setMembers(prevMembers => [...prevMembers, response.data]);
  //       handleCloseModal();
  //     })
  //     .catch(error => console.error('Ошибка при добавлении члена ГЭК:', error));
  // };


  // const handleDeleteMember = useCallback((item) => {
  //   console.log('Удаление члена ГЭК:', item);
  //   setActiveRow(null);
  //   handleCloseModal();
  // }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value, checked, type } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  }, [formData]);

  const handleSearch = useCallback((e) => {
    setSearchText(e.target.value);
    const filteredData = members.filter((member) => {
      const { Fullname, Post, Mail } = member;
      const searchRegExp = new RegExp(e.target.value.trim(), 'i');
      return searchRegExp.test(Fullname) || searchRegExp.test(Post) || searchRegExp.test(Mail);
    });
    setSortedMembers(filteredData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="my-5 px-5">
      <>
        <Button variant="primary" className="mx-3" onClick={handleEditMember} disabled={!activeRow}>
          Редактировать
        </Button>
        {/* <Button variant="primary" className="mx-3" onClick={handleAddMember}>
          Добавить
        </Button> */}
      </>
      <input
          type="text"
          className="form-control mb-3 my-4"
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
        //handleDeleteMember={handleDeleteMember}
      />
      {/* <AddMember
        showModal={showAddModal}
        handleCloseModal={handleCloseModal}
        handleInputChange={handleInputChange}
        handleSaveChanges={handleSaveAddMemberr}
        formData={formData}
      /> */}
    </div>
  );
};

export default MembersPage;