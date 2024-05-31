import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { writeFile, utils } from 'xlsx';
import UpdateUser from '../modal-windows/UpdateUser';
import AddUser from '../modal-windows/AddUser';
import SearchUser from '../components/SearchUser';
import './style-pages/UsersPage.css';
import ImportUsersModal from '../modal-windows/ImportUsers';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [showImportModal, setShowImportModal] = useState(false);
  const [activeRow, setActiveRow] = useState(null);

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedUsers, setSortedUsers] = useState([]);

  const [filters, setFilters] = useState({
    fullname: '',
    post: '',
    mail: '',
    login: ''
  });

  const tableRef = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:5000/admin/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      const usersWithRoleNames = response.data.map(async user => {
        if (user.roles && user.roles.length > 0) {
          const roles = await Promise.all(user.roles.map(async roleId => {
            const token = localStorage.getItem('token');
            const roleResponse = await axios.get(`http://localhost:5000/roles/${roleId}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            return roleResponse.data.Name_role;
          }));
          return { ...user, roles: roles.join('<br>') };
        } else {
          return user;
        }
      });
      Promise.all(usersWithRoleNames).then(usersWithRoles => {
        setUsers(usersWithRoles);
        setSortedUsers(usersWithRoles);
      });
    })
    .catch(error => console.error('Ошибка при загрузке данных:', error));
  };

  useEffect(() => {
    handleSearch();
  }, [users, filters]);

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

    const sortedData = sortedUsers.slice().sort((a, b) => {
      return sortOrder === 'asc' ? a[sortColumn].localeCompare(b[sortColumn]) : b[sortColumn].localeCompare(a[sortColumn]);
    });
    setSortedUsers(sortedData);
  }, [sortColumn, sortOrder]);

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

  const handleRowClick = (user) => {
    setActiveRow(user);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowUpdateModal(false);
    setShowImportModal(false);
    setFormData(null);
  };

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === 'checkbox' ? (checked ? [...(formData[name] || []), parseInt(value)] : formData[name].filter(role => role !== parseInt(value))) : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
};

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    const { fullname, post, mail, login } = filters;
    const filteredData = users.filter((user) => {
      const fullnameMatch = user.Fullname ? user.Fullname.toLowerCase().includes(fullname.toLowerCase()) : true;
      const loginMatch = user.Login ? user.Login.toLowerCase().includes(login.toLowerCase()) : true;
      const postMatch = user.Post ? user.Post.toLowerCase().includes(post.toLowerCase()) : true;
      const mailMatch = user.Mail ? user.Mail.toLowerCase().includes(mail.toLowerCase()) : true;
      return fullnameMatch && postMatch && mailMatch && loginMatch;
    });
    setSortedUsers(filteredData);
  };

  const handleAddUser = () => {
    setShowAddModal(true);
    setFormData({});
  };

  const handleEditUser = () => {
    setFormData(activeRow);
    setShowUpdateModal(true);
  };

  const handleSaveUpdateUser = (formData) => {
    const token = localStorage.getItem('token');
    axios.put(`http://localhost:5000/admin/users/${formData.id_U}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Изменения информации о пользователе успешно сохранены:', response.data);
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id_U === formData.id_U ? { ...user, ...formData } : user
        )
      );
      handleCloseModal();
      fetchUsers();
    })
    .catch(error => console.error('Ошибка при сохранении изменений информации о пользователе:', error));
  };
  
  const handleSaveAddUser = (formData) => {
    const token = localStorage.getItem('token');
  
    const sanitizedFormData = {
      Fullname: formData.Fullname,
      Login: formData.Login,
      Password: formData.Password,
      Mail: formData.Mail,
      Post: formData.Post,
      Roles: formData.Roles || []
    };

    console.log(sanitizedFormData);
    axios.post('http://localhost:5000/admin/registration', sanitizedFormData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Новый пользователь успешно добавлен:', response.data);
      fetchUsers();
      handleCloseModal();
    })
    .catch(error => console.error('Ошибка при создании пользователя:', error));
  };

  const handleExport = () => {
    const headers = ['Логин', 'Роль', 'ФИО', 'Должность', 'Почта'];
    const data = sortedUsers.map(user => [
      user.Login,
      user.roles.replace(/<br>/g, ', '),  // Заменяем <br> на запятую
      user.Fullname,
      user.Post,
      user.Mail
    ]);

    const worksheet = utils.aoa_to_sheet([headers, ...data]);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Users');
    writeFile(workbook, 'Users.xlsx');
  };
  
  const handleFileUpload = async (data) => {
    const token = localStorage.getItem('token');
  
    for (let row of data) {
      const formattedData = {
        Fullname: row.Fullname,
        Post: row.Post,
        Roles: row.Roles,
        Login: row.Login,
        Password: row.Password,
        Mail: row.Mail
      }; 
      console.log(formattedData);
      try {
        const response = await axios.post('http://localhost:5000/admin/registration', formattedData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);

        fetchUsers();
        handleCloseModal();
      } catch (error) {
        console.error('Ошибка при импорте данных:', error);
      }
    }
  };

  return (
    <div className="my-5 px-5">
      <SearchUser filters={filters} handleFilterChange={handleFilterChange} />
      <Button variant="primary" className="mx-3" onClick={handleEditUser} disabled={!activeRow}>
        Редактировать
      </Button>
      <Button variant="primary" className="mx-3" onClick={handleAddUser}>
        Добавить
      </Button>
      <Button variant="secondary" className="mx-3" onClick={handleExport}>
        Скачать таблицу
      </Button>
      <Button variant="secondary" className="mx-3" onClick={() => setShowImportModal(true)}>
        Загрузить данные
      </Button>
      <div className="my-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <table className="table table-striped table-bordered table-light table-hover text-center" ref={tableRef}>
          <thead className="table-dark">
            <tr>
              <th>№</th>
              <th onClick={() => sortData('Login')}>Логин{renderSortArrow('Login')}</th>
              <th>Роль</th>
              <th onClick={() => sortData('Fullname')}>ФИО{renderSortArrow('Fullname')}</th>
              <th onClick={() => sortData('Post')}>Должность{renderSortArrow('Post')}</th>
              <th onClick={() => sortData('Mail')}>Почта{renderSortArrow('Mail')}</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers && sortedUsers.length > 0 ? (
              sortedUsers.map((user, index) => (
                <tr
                  key={user.id_U}
                  className={activeRow === user ? 'table-info' : 'table-light'}
                  onClick={() => handleRowClick(user)}
                >
                  <td>{index + 1}</td>
                  <td>{user.Login}</td>
                  <td dangerouslySetInnerHTML={{ __html: user.roles }}></td>
                  <td>{user.Fullname}</td>
                  <td>{user.Post}</td>
                  <td>{user.Mail}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Данные не найдены</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showUpdateModal && (
        <UpdateUser
          showModal={showUpdateModal}
          handleCloseModal={handleCloseModal}
          handleSaveChanges={handleSaveUpdateUser}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}
      {showAddModal && (
        <AddUser
          showModal={showAddModal}
          handleCloseModal={handleCloseModal}
          handleSaveChanges={handleSaveAddUser}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}
      {showImportModal && (
        <ImportUsersModal
          showModal={showImportModal}
          handleCloseModal={handleCloseModal}
          handleFileUpload={handleFileUpload}
        />
      )}
    </div>
  );
};

export default UsersPage;