import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomePage from './pages/HomePage';
import MembersPage from './pages/MembersPage';
import SchedulePage from './pages/SchedulePage';
import GekPage from './pages/GekPage';
import DefendersPage from './pages/DefendersPage';
import LoginForm from './components/LoginForm';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const App = () => {
    // axios.get('/api/data') // замените '/api/data' на путь к вашему API на сервере
    // .then(response => {
    //   // Обработка полученных данных
    //   console.log(response.data);
    // })
    // .catch(error => {
    //   console.error('There was a problem with the fetch operation:', error);
    // });
    
    const PageLayout = ({ children }) => (
      <div>
        <Navigation />
        {children}
        <Footer />
      </div>
    );
    
    return (
      <Router>
        <Routes>
          <Route path="/" element={<PageLayout><HomePage /></PageLayout>} />
          <Route path="/members" element={<PageLayout><MembersPage /></PageLayout>} />
          <Route path="/schedule" element={<PageLayout><SchedulePage /></PageLayout>} />
          <Route path="/gek" element={<PageLayout><GekPage /></PageLayout>} />
          <Route path="/defenders" element={<PageLayout><DefendersPage /></PageLayout>} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
  );
}

export default App;