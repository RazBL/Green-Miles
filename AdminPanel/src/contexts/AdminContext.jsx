import { base_api } from '../../utilis/api'
import React, { useEffect, useState, createContext } from 'react'
export const AdminContext = createContext();
import { useContext } from 'react';

export default function AdminContextProvider({ children }) {

    const [currentAdmin, SetCurrentAdmin] = useState(null);
    const [users, SetUsers] = useState([]);

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


            const data = await res.json();  // <-- Extract data from response here

            if (!res.ok) {
                console.log(`Error is: ${data.error}`);
                return null;
            }

            if (data) {
                const { admin: loggedinAdmin, token } = data;
                localStorage.setItem('adminToken', token);
                SetCurrentAdmin(loggedinAdmin);
                console.log(currentAdmin);
                return loggedinAdmin;
            }
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const LoadAllUsers = async () => {
        try {
            let res = await fetch(`${base_api}/users`);
            let data = await res.json();
            SetUsers(data);
        } catch (err) {
            console.error(err);
        }
    }

    const logOut = () => {
        // כאן נקודת הפרידה, עליך להוסיף את הפעולות שהמשתמש יתנתק מהן, לדוגמה, מחיקת Token מה-LocalStorage.
        localStorage.removeItem('adminToken'); // הסרת Token מה-LocalStorage

        // עדכון הסטייט של המשתמש ל-null
        SetCurrentAdmin(null);
    };

    useEffect(() => {
        LoadAllUsers();
    }, [])


    const value = {
        Login,
        logOut,
        currentAdmin,
        users
    }

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}
