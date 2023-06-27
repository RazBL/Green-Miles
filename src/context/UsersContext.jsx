import React, { useEffect, useState, createContext } from 'react'
const usersData = require('../data/users.json')

export const UsersContext = createContext();

export default function UsersContextProvider({ children }) {

    const [users, SetUsers] = useState([]);

    const GetUsers = async () => {
        try {
            SetUsers(usersData);
        } catch (err) {
            console.error(err);
        }
    }

    const IfUserExists = (email, password) => {
        let userFound = users.find(u => u.email === email && u.password === password);
        return userFound;
    }

    const EmailExists = (email) => {
        let userFound = users.find(u => u.email === email);
        return userFound;
    }

    const CheckValidEmail = (email) => {
        return (email.endsWith(".com") || email.endsWith(".co.il")) && /^[a-zA-Z0-9.~-]+@[a-zA-Z-]+(\.[a-zA-Z0-9-]+)*$/.test(email);
    }
    

    useEffect(() => {
        GetUsers()
        console.log(users);
    }, [])

    const value = {
        users,
        SetUsers,
        IfUserExists,
        EmailExists,
        CheckValidEmail
    }

    return (
        <UsersContext.Provider value={value}>
            {children}
        </UsersContext.Provider>
    )
}
