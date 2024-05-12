import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './style-components/Login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        Login: username,
        Password: password
      });
      const token = response.data.token;
      // Сохраняем токен в localStorage
      localStorage.setItem('token', token);
      // Переходим на главную страницу
      navigate('/');
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
    }
  };

  return (
    <div className="login-container d-flex justify-content-center text-center">
      <div className="col-md-3 rounded-4">
        <Form className="forma bg-light rounded-4 shadow-lg">
          <Form.Group controlId="formBasicUsername" className="px-3 py-2 fs-5">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="px-3 my-2 fs-5">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="button" onClick={handleLogin} block className="btn btn-primary my-2">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;