import React from 'react';
import { Link } from 'react-router-dom';
import './style-components/NavigationStyle.css';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Главная</Link></li>
        <li><Link to="/news">Новости</Link></li>
        <li><Link to="/documents">Документы</Link></li>
        <li><Link to="/teachers">Преподаватели</Link></li>
        <li><Link to="/topics">Темы</Link></li>
        <li><Link to="/profile">Профиль</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;