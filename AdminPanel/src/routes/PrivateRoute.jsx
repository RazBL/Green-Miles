import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminContext } from '../contexts/AdminContext';

export default function PrivateRoute({children}) {

    const {AuthAdmin} = useContext(AdminContext)

    const CheckAuthToken = () => {
        AuthAdmin();
    };

    return CheckAuthToken() ? children : <Navigate to="/" />;
}
