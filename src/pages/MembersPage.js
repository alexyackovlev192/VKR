import React, { useState }from 'react';
import './style-pages/MembersPage.css';
import Table from 'react-bootstrap/Table';
import UpdateMember from '../modal-windows/UpdateMembers';

import membersData from '../data/membersData.json';

const MembersPage = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleRowDoubleClick = (member) => {
    setSelectedMember(member);
    setShowModal(true);
    setFormData(member);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
    setShowModal(false);
    setFormData(null);
    setIsEditing(false);
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    console.log('Сохранение изменение члена ГЭК:', formData);
    handleCloseModal();
  };

  const handleDeleteMember = () => {
    console.log('Удаление члена ГЭК:', selectedMember);
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    const { fullName, value, checked, type } = e.target;
    setFormData({ ...formData, [fullName]: type === 'checkbox' ? checked : value });
  };
  return (
    <div className="my-5 px-5">
      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>№</th>
          <th>ФИО</th>
          <th>Должность</th>
          <th>Почта</th>
        </tr>
      </thead>
      <tbody>
        {membersData.map((member, index) => (
          <tr key={member.id} onDoubleClick={() => handleRowDoubleClick(member)}>
            <td>{index + 1}</td>
            <td>{member.fullName}</td>
            <td>{member.position}</td>
            <td>{member.email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    <UpdateMember
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        isEditing={isEditing}
        formData={formData}
        handleInputChange={handleInputChange}
        handleEditButtonClick={handleEditButtonClick}
        handleDeleteMember={handleDeleteMember}
        handleSaveChanges={handleSaveChanges}
      />
    </div>
  );
};

export default MembersPage;