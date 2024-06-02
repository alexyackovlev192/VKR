import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import MembersPage from './pages/MembersPage';
import SecretariesPage from './pages/SecretariesPage';
import SchedulePage from './pages/schedule-pages/SchedulePage';
import MySchedulePage from './pages/schedule-pages/MySchedulePage';
import MyScheduleSecretariePage from './pages/schedule-pages/MyScheduleSecretariePage';
import OpenMySchedulePage from './pages/schedule-pages/OpenMySchedulePage';
import OpenMyScheduleSecretariePage from './pages/schedule-pages/OpenMyScheduleSecretariePage';
import DefenderSchedulePage from './pages/schedule-pages/DefenderSchedulePage'; 
import DefenderScheduleSecretariePage from './pages/schedule-pages/DefenderScheduleSecretariePage'; 
import GekPage from './pages/gek-pages/GekPage';
import MyGekPage from './pages/gek-pages/MyGekPage';
import MyGekSecretariePage from './pages/gek-pages/MyGekSecretariePage';
import UsersPage from './pages/UsersPage';
import EditGekPage from './pages/gek-pages/EditGekPage';
import CreateGekPage from './pages/gek-pages/CreateGekPage';
import ListDefendersForSchedulePage from './pages/defenders-pages/ListDefendersForSchedulePage';
import EditListDefendersForSchedulePage from './pages/defenders-pages/EditListDefendersForSchedulePage';
import CreateGekAddMemberPage from './pages/gek-pages/CreateGekAddMembersPage';
import DefendersPage from './pages/defenders-pages/DefendersPage';
import ResultSchedulesPage from './pages/schedule-pages/ResultSchedulesPage';
import LoginForm from './components/LoginForm';

import ProtectedPageLayout from './components/ProtectedPageLayout'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/auth" element={<LoginForm />} />
                <Route path="/users" element={
                    <ProtectedPageLayout roles={[1]}>
                        <UsersPage />
                    </ProtectedPageLayout>
                } />
                <Route path="/members" element={
                    <ProtectedPageLayout roles={[3]}>
                        <MembersPage />
                    </ProtectedPageLayout>
                } />
                <Route path="/secretaries" element={
                    <ProtectedPageLayout roles={[3]}>
                        <SecretariesPage />
                    </ProtectedPageLayout>
                } />
                <Route path="/schedule" element={
                    <ProtectedPageLayout roles={[3]}>
                        <SchedulePage />
                    </ProtectedPageLayout>
                } />
                <Route path="/my-schedule" element={
                    <ProtectedPageLayout roles={[2]}>
                        <MySchedulePage />
                    </ProtectedPageLayout>
                } />
                <Route path="/my-schedule-sec" element={
                    <ProtectedPageLayout roles={[4]}>
                        <MyScheduleSecretariePage />
                    </ProtectedPageLayout>
                } />
                <Route path="/my-schedule/:id_DS" element={
                    <ProtectedPageLayout roles={[2]}>
                        <OpenMySchedulePage />
                    </ProtectedPageLayout>
                } />
                <Route path="/my-schedule-sec/:id_DS" element={
                    <ProtectedPageLayout roles={[4]}>
                        <OpenMyScheduleSecretariePage />
                    </ProtectedPageLayout>
                } />
                <Route path="/list-defenders" element={
                    <ProtectedPageLayout roles={[3]}>
                        <ListDefendersForSchedulePage />
                    </ProtectedPageLayout>
                } />
                <Route path="/list-defenders-edit/:id_DS" element={
                    <ProtectedPageLayout roles={[3]}>
                        <EditListDefendersForSchedulePage />
                    </ProtectedPageLayout>
                } />
                <Route path="/defender-schedule/:id_S" element={
                    <ProtectedPageLayout roles={[2]}>
                        <DefenderSchedulePage />
                    </ProtectedPageLayout>
                } />
                <Route path="/defender-schedule-sec/:id_S" element={
                    <ProtectedPageLayout roles={[4]}>
                        <DefenderScheduleSecretariePage />
                    </ProtectedPageLayout>
                } />
                <Route path="/my-gek" element={
                    <ProtectedPageLayout roles={[2]}>
                        <MyGekPage />
                    </ProtectedPageLayout>
                } />
                <Route path="/my-gek-sec" element={
                    <ProtectedPageLayout roles={[4]}>
                        <MyGekSecretariePage />
                    </ProtectedPageLayout>
                } />
                <Route path="/gek" element={
                    <ProtectedPageLayout roles={[3]}>
                        <GekPage />
                    </ProtectedPageLayout>
                } />
                <Route path="/create-gek" element={
                    <ProtectedPageLayout roles={[3]}>
                        <CreateGekPage />
                    </ProtectedPageLayout>
                } />
                <Route path="/create-gek/add-member" element={
                    <ProtectedPageLayout roles={[3]}>
                        <CreateGekAddMemberPage />
                    </ProtectedPageLayout>
                } />
                <Route path="/edit-gek/:id_G" element={
                    <ProtectedPageLayout roles={[3]}>
                        <EditGekPage />
                    </ProtectedPageLayout>
                } />
                <Route path="/defenders" element={
                    <ProtectedPageLayout roles={[3]}>
                        <DefendersPage />
                    </ProtectedPageLayout>
                } />
                <Route path="/result-schedules" element={
                    <ProtectedPageLayout roles={[3]}>
                        <ResultSchedulesPage />
                    </ProtectedPageLayout>
                } />
                <Route path="*" element={<Navigate to="/auth" />} />
            </Routes>
        </Router>
    );
}

export default App;