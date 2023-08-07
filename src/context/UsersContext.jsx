import React, { useEffect, useState, createContext } from 'react'
import {base_api} from '../../utils/api' ;
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UsersContext = createContext();

export default function UsersContextProvider({ children }) {

    const [users, SetUsers] = useState([]);

    const LoadAllUsers = async () => {
        try {
            let res = await fetch(`${base_api}/users`);
            let data = await res.json();
            SetUsers(data);
        } catch (err) {
            console.error(err);
        }
    }

    const RegisterUser = async (newUser) => {
        try{
            let res = await fetch(`${base_api}/users/register`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
            let data = await res.json();
            if(data){
                await LoadAllUsers();
                return true;
            }
        }catch(err){
            console.log(err);
        }
    }

    const Login = async (email, password) => {
        try {
            let res = await fetch(`${base_api}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
    
            if (!res.ok) {
                let errorData = await res.json();
                console.error(`Error is: ${errorData.error}`);
                return null;
            }
    
            let data = await res.json();
            const { user: loggedinUser, token } = data;

            if (token) {
                await AsyncStorage.setItem('userToken', token);
            }
    
            return loggedinUser;
        } catch (err) {
            console.error(err);
            return null;
        }
    };
    
    

    const EmailExists = (email) => {
        let userFound = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        return userFound;
    }

    const CheckValidEmail = (email) => {
        return (email.endsWith(".com") || email.endsWith(".co.il")) && /^[a-zA-Z0-9.~-]+@[a-zA-Z-]+(\.[a-zA-Z0-9-]+)*$/.test(email);
    }
    

    useEffect(() => {
        LoadAllUsers();
    }, [])

    const value = {
        users,
        SetUsers,
        Login,
        EmailExists,
        CheckValidEmail,
        RegisterUser
    }

    return (
        <UsersContext.Provider value={value}>
            {children}
        </UsersContext.Provider>
    )
}
