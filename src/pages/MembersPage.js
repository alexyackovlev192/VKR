import React from 'react';
import './style-pages/MembersPage.css';
import Table from 'react-bootstrap/Table';
import membersData from '../data/membersData.json';

const MembersPage = () => {

      return (
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
            <tr key={member.id}>
              <td>{index + 1}</td>
              <td>{member.name}</td>
              <td>{member.position}</td>
              <td>{member.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      );
    };

export default MembersPage;