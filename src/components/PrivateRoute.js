import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children, roles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    const paramsString = window.location.search;
    localStorage.setItem('redirectParams', paramsString);
    return <Navigate to="/auth" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRoles = decodedToken.roles;

    if (!roles.some(role => userRoles.includes(role))) {
      return null; 
    }
  } catch (error) {
    console.error('Недействительный токен:', error);
    return <Navigate to="/auth" />;
  }

  return children;
};

export default PrivateRoute;