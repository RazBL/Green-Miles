import { base_api } from '../../utilis/api'
import React, { useEffect, useState, createContext } from 'react'
export const AdminContext = createContext();

export default function AdminContextProvider({ children }) {

    const [currentAdmin, SetCurrentAdmin] = useState(null);

    const Login = async (email, password) => {
        try {
            let res = await fetch(`${base_api}/admins/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
    
            console.log(res);
    
            const data = await res.json();  // <-- Extract data from response here
    
            if (!res.ok) {
                console.log(`Error is: ${data.error}`);
                return null;
            }
    
            if (data) {
                const { admin: loggedinAdmin, token } = data;
                localStorage.setItem('adminToken', token); 
                SetCurrentAdmin(loggedinAdmin);
                return loggedinAdmin;
            }
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const value = {
        Login,
        currentAdmin
    }

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}
