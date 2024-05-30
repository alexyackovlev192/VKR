import React from 'react';
import PrivateRoute from './PrivateRoute';
import Navigation from './Navigation';
import Footer from './Footer';

const ProtectedPageLayout = ({ children, roles }) => (
    <PrivateRoute roles={roles}>
        <div>
            <Navigation />
            {children}
            <Footer />
        </div>
    </PrivateRoute>
);

export default ProtectedPageLayout;