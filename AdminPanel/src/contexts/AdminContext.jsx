import { base_api } from '../../utilis/api'
import React, { useEffect, useState, createContext } from 'react'
export const AdminContext = createContext();
import { useContext } from 'react';

export default function AdminContextProvider({ children }) {

    const [currentAdmin, SetCurrentAdmin] = useState(null);
    const [users, SetUsers] = useState([]);
    const [flights, SetFlights] = useState([]);
    const [hotels, SetHotels] = useState([]);
    const [hotelBooking, SetHotelbooking] = useState([]);
    const [flightBooking, SetFlightbooking] = useState([]);
    const [hotelBookings, setHotelBookings] = useState([]);
    const [hotelBookingStatus, setHotelBookingStatus] = useState([]);
    
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
                    role: 'admin'
                }),
            });

            const data = await res.json();

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

    const updateBookingStatus = async (bookingId, bookingType, newStatus) => {
        try {
          const token = localStorage.getItem('adminToken');
      
          if (!token) {
            console.error('Missing token');
            return;
          }
      
          const res = await fetch(`${base_api}/admins/booking/${bookingType}/${bookingId}/update-status`, {
            method: 'PUT', // או 'PATCH' כמו שאתה משתמש
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newStatus }),
          });
      
          if (!res.ok) {
            console.error('Failed to update booking status');
            return;
          }
      
          // עדכון הסטטוס בלוח הסטטים
          setHotelBookings((prevBookings) =>
            prevBookings.map((booking) =>
              booking._id === bookingId ? { ...booking, bookingStatus: newStatus } : booking
            )
          );
      
          console.log('Booking status updated successfully:', bookingId, newStatus);
        } catch (error) {
          console.error('Error updating booking status:', error);
        }
      };
      
      


    const AuthAdmin = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            let res = await fetch(`${base_api}/admins/auth`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            let data = await res.json();

            return data;

        } catch (error) {
            console.log(error);
        }

    }

    const LoadAllUsers = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            let res = await fetch(`${base_api}/admins/users`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            let data = await res.json();
            SetUsers(data);
        } catch (err) {
            console.error(err);
        }
    }

    const DeleteUserAccount = async (user) => {
        try {
            let res = await fetch(`${base_api}/users/delete/${user._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            )

            let data = await res.json();
            LoadAllUsers();
            return data;

        } catch (error) {
            console.log(error);
        }
    };


    const DeleteFlights = async (flight) => {
        try {
            let res = await fetch(`${base_api}/flights/delete/${flight._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            )

            let data = await res.json();
            LoadAllFlights();
            return data;

        } catch (error) {
            console.log(error);
        }
    };





    const EditUserProfile = async (selectedUser) => {
        try {
            let editedUser = {
                country: selectedUser.country,
                email: selectedUser.email,
                firstName: selectedUser.firstName,
                lastName: selectedUser.lastName,
                password: selectedUser.password,
            }
            console.log(editedUser);

            console.log(editedUser.password);
            const token = localStorage.getItem('adminToken');
            let res = await fetch(`${base_api}/admins/edit-user/${selectedUser._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ editedUser: editedUser }),
            });
            let data = await res.json();
            console.log(data);
            LoadAllUsers();

        } catch (error) {
            console.log(error);
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
            let token = localStorage.getItem('adminToken');

            if (!token) {
                console.error('Missing token');
                return;
            }
 
            const res = await fetch(`${base_api}/admins/booking/hotels`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            let data = await res.json();
            SetHotelbooking(data);

        } catch (error) {
            console.error('Error:', error);
        }
    };


    const GetAllFlightsBookings = async () => {
        try {
            let token = localStorage.getItem('adminToken');

            if (!token) {
                console.error('Missing token');
                return;
            }
 
            const res = await fetch(`${base_api}/admins/booking/flights`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            let data = await res.json();
            SetFlightbooking(data);

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
        GetAllFlightsBookings();
    }, [currentAdmin])


    const value = {
        Login,
        logOut,
        currentAdmin,
        users,
        flights,
        hotels,
        hotelBooking,
        flightBooking,
        hotelBookingStatus,
        hotelBookings,
        EditUserProfile,
        AuthAdmin,
        DeleteUserAccount,
        updateBookingStatus,
        hotelBookings,
        setHotelBookings,
        hotelBookingStatus,
        setHotelBookingStatus,
    }

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}
