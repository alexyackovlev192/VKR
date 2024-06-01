import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import './style-components/Navigation.css';
import { Nav } from 'react-bootstrap';

const navigationItems = {
  1: [
    { href: "/users", text: "Админка" },
    { href: "/logout", text: "Выход" }
  ],
  2: [
    { href: "/my-schedule", text: "Защиты члена комиссии" },
    { href: "/my-gek", text: "ГЭК члена комиссии" },
    { href: "/logout", text: "Выход" }
  ],
  3: [
    { href: "/members", text: "Список членов ГЭК" },
    { href: "/secretaries", text: "Список секретарей ГЭК" },
    { href: "/schedule", text: "Расписание защит" },
    { href: "/gek", text: "ГЭК" },
    { href: "/defenders", text: "Список защищающихся" },
    { href: "/result-schedules", text: "Результаты защит" },
    { href: "/logout", text: "Выход" }
  ],
  4: [
    { href: "/my-schedule-sec", text: "Защиты секретаря" },
    { href: "/my-gek-sec", text: "ГЭК секретаря" },
    { href: "/logout", text: "Выход" }
  ]
};

const Navigation = () => {
  const [userRoles, setUserRoles] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRoles(decodedToken.roles);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth');
  };

  if (!userRoles.length) return null;

  const allUserItems = [];
  userRoles.forEach(role => {
    const roleItems = navigationItems[role] || [];
    roleItems.forEach(item => {
      if (!allUserItems.find(existingItem => existingItem.href === item.href)) {
        allUserItems.push(item);
      }
    });
  });

  const sortedNavigationItems = [
    ...allUserItems.filter(item => item.href === "/my-schedule"),
    ...allUserItems.filter(item => item.href === "/my-gek"),
    ...allUserItems.filter(item => item.href !== "/logout" && item.href !== "/my-schedule" && item.href !== "/my-gek"),
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
              {item.href === "/logout" ? (
              <Nav.Link
                to={item.href}
                className="px-4 link-style"
                style={{ textDecoration: 'none' }}
                onClick={handleLogout}
              >
                {item.text}
              </Nav.Link>
              ) : (
                <Nav.Link
                  as={NavLink}
                  to={item.href}
                  className="px-4 link-style"
                  style={{ textDecoration: 'none' }}
                >
                  {item.text}
                </Nav.Link>
              )}
            </Nav.Item>
          ))}
    </Nav>
  );
};

export default Navigation;