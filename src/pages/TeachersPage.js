import React, { useState, useEffect } from 'react';
import './style-pages/TeachersStyle.css';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);

  // Имитация запроса к серверу для получения данных о преподавателях
  useEffect(() => {
    // Ваш код для запроса данных с сервера
    // Замените этот блок имитацией данных
    const mockTeachersData = [
      {
        id: 1,
        fullName: 'Преподаватель 1',
        email: 'teacher1@example.com',
        phone: '+123456789',
        position: 'Профессор',
        topics: ['Тема 1', 'Тема 2', 'Тема 3'],
      },
      {
        id: 2,
        fullName: 'Преподаватель 2',
        email: 'teacher2@example.com',
        phone: '+987654321',
        position: 'Доцент',
        topics: ['Тема 4', 'Тема 5', 'Тема 6'],
      },
      {
        id: 3,
        fullName: 'Преподаватель 3',
        email: 'teacher2@example.com',
        phone: '+987654321',
        position: 'Доцент',
        topics: ['Тема 4', 'Тема 5', 'Тема 6'],
      },
      {
        id: 4,
        fullName: 'Преподаватель 4',
        email: 'teacher2@example.com',
        phone: '+987654321',
        position: 'Доцент',
        topics: ['Тема 4', 'Тема 5', 'Тема 6'],
      },
      {
        id: 5,
        fullName: 'Преподаватель 5',
        email: 'teacher2@example.com',
        phone: '+987654321',
        position: 'Доцент',
        topics: ['Тема 4', 'Тема 5', 'Тема 6'],
      },
      {
        id: 6,
        fullName: 'Преподаватель 6',
        email: 'teacher2@example.com',
        phone: '+987654321',
        position: 'Доцент',
        topics: ['Тема 4', 'Тема 5', 'Тема 6'],
      },
      {
        id: 7,
        fullName: 'Преподаватель 7',
        email: 'teacher2@example.com',
        phone: '+987654321',
        position: 'Доцент',
        topics: ['Тема 4', 'Тема 5', 'Тема 6'],
      },
      {
        id: 8,
        fullName: 'Преподаватель 8',
        email: 'teacher2@example.com',
        phone: '+987654321',
        position: 'Доцент',
        topics: ['Тема 4', 'Тема 5', 'Тема 6'],
      },
      {
        id: 9,
        fullName: 'Преподаватель 9',
        email: 'teacher2@example.com',
        phone: '+987654321',
        position: 'Доцент',
        topics: ['Тема 4', 'Тема 5', 'Тема 6'],
      },
    ];
    setTeachers(mockTeachersData);
  }, []);

  return (
    <div className="teachers-container">
      <h1 className="teachers-title">Преподаватели</h1>
      <div className="teachers-content">
        <table className="teachers-table">
          <thead>
            <tr>
              <th>ФИО</th>
              <th>Почта</th>
              <th>Телефон</th>
              <th>Должность</th>
              <th>Темы</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.fullName}</td>
                <td>{teacher.email}</td>
                <td>{teacher.phone}</td>
                <td>{teacher.position}</td>
                <td>
                  <ul>
                    {teacher.topics.map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeachersPage;