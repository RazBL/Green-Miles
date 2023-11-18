import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminContext } from '../contexts/AdminContext';

export default function PrivateRoute({ children }) {
    const { AuthAdmin } = useContext(AdminContext);
    const [authCompleted, SetAuthCompleted] = useState(false);
    const [isAuthenticated, SetIsAuthenticated] = useState(false);

    const CheckAuthToken = async () => {
        try {
            const result = await AuthAdmin();

            if (result.error) {
                console.error('Authentication error:', result.error);
            } else {
                SetIsAuthenticated(result);
            }

            SetAuthCompleted(true);
        } catch (error) {
            console.error('Authentication error:', error);
            SetAuthCompleted(true);
        }
    };

    useEffect(() => {
        CheckAuthToken();
    }, []);

    if (!authCompleted) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
}
