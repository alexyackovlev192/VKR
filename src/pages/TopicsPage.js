import React, { useState, useEffect } from 'react';
import './style-pages/TopicsStyle.css';

const TopicsPage = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const mockTopicsData = [
      {
        id: 1,
        title: 'Тема 1',
        teacher: 'Преподаватель 1',
      },
      {
        id: 2,
        title: 'Тема 2',
        teacher: 'Преподаватель 2',
      },
      {
        id: 3,
        title: 'Тема 3',
        teacher: 'Преподаватель 2',
      },
      {
        id: 4,
        title: 'Тема 4',
        teacher: 'Преподаватель 3',
      },
    ];
    setTopics(mockTopicsData);
  }, []);

  return (
    <div className="themes-container">
      <h1 className="teachers-title">Темы</h1>
      <div className="themes-content">
        <table className="themes-table">
          <thead>
            <tr>
              <th>Название темы</th>
              <th>Преподаватель</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((topic) => (
              <tr key={topic.id}>
                <td>{topic.title}</td>
                <td>{topic.teacher}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopicsPage;