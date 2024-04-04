import React from 'react';
import { NavLink, useLocation } from 'react-router-dom'; // Импортируем NavLink и useLocation
import './style-components/Navigation.css';
import { Nav } from 'react-bootstrap';

const navigationItems = [
  { href: "/", text: "Главная" },
  { href: "/members", text: "Список членов ГЭК" },
  { href: "/schedule", text: "Расписание защит" },
  { href: "/gek", text: "ГЭК" },
  { href: "/defenders", text: "Список защищающихся" },
  { href: "/logout", text: "Выход" }
];

const Navigation = () => {
  const location = useLocation(); // Получаем текущий путь с помощью useLocation

  return (
    <Nav
      fill variant="underline"
      defaultActiveKey="/home"
      activeKey={location.pathname} // Устанавливаем activeKey равным текущему пути
      className="d-flex bd-highlight navigation-list py-2 px-3 fs-5 justify-content-between align-items-center"
    >
      {navigationItems.map((item, index) => (
        <Nav.Item key={index} className="ml-auto">
          <Nav.Link
            as={NavLink} // Используем NavLink вместо простого ссылки
            exact // Устанавливаем точное совпадение пути
            to={item.href} // Устанавливаем путь для NavLink
            className="px-4 link-style"
            style={{ textDecoration: 'none' }}
          >
            {item.text}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default Navigation;