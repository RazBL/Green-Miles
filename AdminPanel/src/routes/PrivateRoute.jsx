import React from 'react';
import { Navigate } from 'react-router-dom';

const CheckAuthToken = () => {
    const token = localStorage.getItem('adminToken');
    console.log("Token exists:", token !== null); // Add this line for debugging
    return token !== null;
};

export default function PrivateRoute({children}) {
    return CheckAuthToken() ? children : <Navigate to="/" />;
}
