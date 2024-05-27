import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import './style-components/Navigation.css';
import { Nav } from 'react-bootstrap';

// Список ссылок для каждой роли
const navigationItems = {
  1: [
    { href: "/", text: "Главная" },
    { href: "/users", text: "Админка" },
    { href: "/logout", text: "Выход" }
  ],
  2: [
    { href: "/", text: "Главная" },
    { href: "/my-schedule", text: "Мои защиты" },
    { href: "/my-gek", text: "Мои ГЭК" },
    { href: "/logout", text: "Выход" }
  ],
  3: [
    { href: "/", text: "Главная" },
    { href: "/members", text: "Список членов ГЭК" },
    { href: "/schedule", text: "Расписание защит" },
    { href: "/gek", text: "ГЭК" },
    { href: "/defenders", text: "Список защищающихся" },
    { href: "/logout", text: "Выход" }
  ],
  4: [
    { href: "/", text: "Главная" },
    { href: "/my-schedule-sec", text: "Мои защиты" },
    { href: "/my-gek-sec", text: "Мои ГЭК" },
    { href: "/logout", text: "Выход" }
  ]
};

const Navigation = () => {
  const [userRoles, setUserRoles] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRoles(decodedToken.roles);
    }
  }, []);

  if (!userRoles.length) return null;

  // Собираем ссылки для всех ролей пользователя
  const allUserItems = [];
  userRoles.forEach(role => {
    const roleItems = navigationItems[role] || [];
    roleItems.forEach(item => {
      if (!allUserItems.find(existingItem => existingItem.href === item.href)) {
        allUserItems.push(item);
      }
    });
  });

  // Перемещаем "Главная" на первое место, а "Выход" на последнее
  const sortedNavigationItems = [
    ...allUserItems.filter(item => item.href === "/"),
    ...allUserItems.filter(item => item.href === "/my-schedule"),
    ...allUserItems.filter(item => item.href === "/my-gek"),
    ...allUserItems.filter(item => item.href !== "/" && item.href !== "/logout" && item.href !== "/my-schedule" && item.href !== "/my-gek"),
    ...allUserItems.filter(item => item.href === "/logout")
  ];

  return (
    <Nav
      fill
      variant="underline"
      activeKey={location.pathname}
      className="d-flex bd-highlight navigation-list py-2 px-3 fs-5 justify-content-between align-items-center"
    >
      {sortedNavigationItems.map((item, index) => (
        <Nav.Item key={index} className="ml-auto">
          <Nav.Link
            as={NavLink}
            to={item.href}
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