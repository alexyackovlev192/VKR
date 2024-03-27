import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginForm from './components/LoginForm';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import NewsPage from './pages/NewsPage';
import DocumentsPage from './pages/DocumentsPage';
import TeachersPage from './pages/TeachersPage';
import TopicsPage from './pages/TopicsPage';

import './App.css';

// Общий компонент для всех страниц
const PageLayout = ({ children }) => (
  <div>
    <Navigation />
    {children}
    <Footer />
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageLayout><HomePage /></PageLayout>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<PageLayout><ProfilePage /></PageLayout>} />
        <Route path="/news" element={<PageLayout><NewsPage /></PageLayout>} />
        <Route path="/documents" element={<PageLayout><DocumentsPage /></PageLayout>} />
        <Route path="/teachers" element={<PageLayout><TeachersPage /></PageLayout>} />
        <Route path="/topics" element={<PageLayout><TopicsPage /></PageLayout>} />
      </Routes>
    </Router>
  );
};

export default App;