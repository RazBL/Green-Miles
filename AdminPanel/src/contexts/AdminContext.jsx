import { base_api } from '../../utilis/api'
import React, { useEffect, useState, createContext } from 'react'
export const AdminContext = createContext();
import { useContext } from 'react';

export default function AdminContextProvider({ children }) {

    const [currentAdmin, SetCurrentAdmin] = useState(null);
    const [users, SetUsers] = useState([]);
    const [flights, SetFlights] = useState([]);
    const [hotels, SetHotels] = useState([]);
    const [hotelbooking, SetHotelbooking] = useState([]);

    
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

    const LoadAllFlights = async () => {
        try {
            let res = await fetch(`${base_api}/flights`);
            let data = await res.json();
            SetFlights(data);
        } catch (err) {
            console.error(err);
        }
    }

    const loadAllHotels = async () => {
        try {
          let res = await fetch(`${base_api}/hotels`);
          let data = await res.json();
          SetHotels(data);
        } catch (err) {
          console.error(err);
        }
      }

      const GetAllHotelBookings = async () => {
        try {
            const token = localStorage.getItem('adminToken');
    
            if (!token) {
                console.error('Missing token');
                return;
            }
    
            const res = await fetch(`${base_api}/hotels/bookings`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (res.ok) {
                const data = await res.json();
                SetHotelbooking(data);
            } else {
                console.error('Request failed:', res.status, res.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
      
      
      
   
    useEffect(() => {
        console.log(currentAdmin);
        LoadAllUsers();
        LoadAllFlights();
        loadAllHotels();
        GetAllHotelBookings();
    }, [currentAdmin])


    const value = {
        Login,
        logOut,
        currentAdmin,
        users,
        flights,
        hotels,
        hotelbooking,
    }

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}
