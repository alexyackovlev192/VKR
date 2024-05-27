import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MembersPage from './pages/MembersPage';
import SchedulePage from './pages/schedule-pages/SchedulePage';
import MySchedulePage from './pages/schedule-pages/MySchedulePage';
import OpenMySchedulePage from './pages/schedule-pages/OpenMySchedulePage';
import DefenderSchedulePage from './pages/schedule-pages/DefenderSchedulePage';
import GekPage from './pages/gek-pages/GekPage';
import MyGekPage from './pages/gek-pages/MyGekPage';
import UsersPage from './pages/UsersPage';
import EditGekPage from './pages/gek-pages/EditGekPage';
import CreateGekPage from './pages/gek-pages/CreateGekPage';
import ListDefendersForSchedulePage from './pages/schedule-pages/ListDefendersForSchedulePage';
import CreateGekAddMemberPage from './pages/gek-pages/CreateGekAddMembersPage';
import DefendersPage from './pages/DefendersPage';
import LoginForm from './components/LoginForm';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
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
                <Route path="/" element={<Navigate to="/auth" />} />
                <Route path="/auth" element={<LoginForm />} />
                <Route path="/users" element={<PageLayout><UsersPage /></PageLayout>} />
                <Route path="/main" element={<PageLayout><HomePage /></PageLayout>} />
                <Route path="/members" element={<PageLayout><MembersPage /></PageLayout>} />
                <Route path="/schedule" element={<PageLayout><SchedulePage /></PageLayout>} />
                <Route path="/my-schedule" element={<PageLayout><MySchedulePage /></PageLayout>} />
                <Route path="/my-schedule/:id_DS" element={<PageLayout><OpenMySchedulePage /></PageLayout>} />
                <Route path="/test" element={<PageLayout><ListDefendersForSchedulePage /></PageLayout>} />
                <Route path="/defender-schedule/:id_S" element={<PageLayout><DefenderSchedulePage /></PageLayout>} />
                <Route path="/my-gek" element={<PageLayout><MyGekPage /></PageLayout>} />
                <Route path="/gek" element={<PageLayout><GekPage /></PageLayout>} />
                <Route path="/create-gek" element={<PageLayout><CreateGekPage /></PageLayout>} />
                <Route path="/create-gek/add-member" element={<PageLayout><CreateGekAddMemberPage /></PageLayout>} />
                <Route path="/edit-gek/:gekId" element={<PageLayout><EditGekPage /></PageLayout>} />
                <Route path="/defenders" element={<PageLayout><DefendersPage /></PageLayout>} />
            </Routes>
        </Router>
    );
}

export default App;