import React, { useState, useRef, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import UpdateMember from '../modal-windows/UpdateMember';
import AddMember from '../modal-windows/AddMember';

import membersData from '../data/membersData.json';
import './style-pages/MembersPage.css';

const MembersPage = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [activeRow, setActiveRow] = useState(null);
  
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchText, setSearchText] = useState('');
  const [sortedMembers, setSortedMembers] = useState(membersData);

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

  const sortData = useCallback((column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }

    const sortedData = sortedMembers.slice().sort((a, b) => {
      if (column === 'name' || column === 'position' || column === 'email') {
        return sortOrder === 'asc' ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]);
      } else {
        return 0;
      }
    });

    setSortedMembers(sortedData);
  }, [sortColumn, sortOrder, sortedMembers]);

  const handleRowClick = useCallback((member) => {
    setActiveRow(member);
    console.log('Выбран ГЭК:', member.id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowUpdateModal(false);
    setShowAddModal(false);
    setFormData(null);
  }, []);

  const handleEditMember = useCallback(() => {
    setActiveRow(activeRow);
    setFormData(activeRow);
    setShowUpdateModal(true);
  }, [activeRow]);

  const handleAddMember = useCallback(() => {
    setShowAddModal(true);
    setFormData(null);
  }, []);

  const handleSaveChanges = useCallback((formData) => {
    if (showUpdateModal) {
      console.log('Сохранение изменений:', formData);
    } else if (showAddModal) {
      console.log('Добавление нового участника:', formData);
    }
    handleCloseModal();
  }, [showUpdateModal, showAddModal, handleCloseModal]);

  const handleDeleteMember = useCallback((item) => {
    console.log('Удаление члена ГЭК:', item);
    setActiveRow(null);
    handleCloseModal();
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value, checked, type } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  }, [formData]);

  const handleSearch = useCallback((e) => {
    setSearchText(e.target.value);
    const filteredData = membersData.filter((member) => {
      const { name, position, email } = member;
      const searchRegExp = new RegExp(e.target.value.trim(), 'i');
      return searchRegExp.test(name) || searchRegExp.test(position) || searchRegExp.test(email);
    });
    setSortedMembers(filteredData);
  }, []);

  return (
    <div className="my-5 px-5">
      <>
        <Button variant="primary" className="mx-3" onClick={handleEditMember} disabled={!activeRow}>
          Редактировать
        </Button>
        <Button variant="primary" className="mx-3" onClick={handleAddMember}>
          Добавить
        </Button>
      </>

      <div className="my-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Поиск..."
          value={searchText}
          onChange={handleSearch}
        />
        <table className="table table-striped table-bordered table-light table-hover text-center" ref={tableRef}>
          <thead className="table-dark">
            <tr>
              <th>№</th>
              <th onClick={() => sortData('name')}>ФИО</th>
              <th onClick={() => sortData('position')}>Должность</th>
              <th onClick={() => sortData('email')}>Почта</th>
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
                <td>{member.name}</td>
                <td>{member.position}</td>
                <td>{member.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UpdateMember
        showModal={showUpdateModal}
        handleCloseModal={handleCloseModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSaveChanges={() => handleSaveChanges(formData)}
        handleDeleteMember={handleDeleteMember}
      />
      <AddMember
        showModal={showAddModal}
        handleCloseModal={handleCloseModal}
        handleInputChange={handleInputChange}
        handleSaveChanges={() => handleSaveChanges(formData)}
        formData={formData}
      />
    </div>
  );
};

export default MembersPage;