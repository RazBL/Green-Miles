import React, { useEffect, useState, createContext } from 'react'
import { base_api } from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const cc = require('country-city');
export const UsersContext = createContext();

export default function UsersContextProvider({ children }) {

    const [users, SetUsers] = useState([]);
    const [currentUser, SetCurrentUser] = useState(null);
    const [countries, SetCountries] = useState([]);
    const [savedFlights, SetSavedFlights] = useState([]);

    const LoadAllUsers = async () => {
        try {
            let res = await fetch(`${base_api}/users`);
            let data = await res.json();
            SetUsers(data);
        } catch (err) {
            console.error(err);
        }
    }

    const GetAllCountriesAndCities = () => {
        const countries = cc.getCountries();
        SetCountries(countries);
    }

    const RegisterUser = async (newUser) => {
        try {
            let res = await fetch(`${base_api}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
            let data = await res.json();
            if (data) {
                await LoadAllUsers();
                return true;
            }
        } catch (err) {
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
                console.log(`Error is: ${errorData.error}`);
                return null;
            }

            let data = await res.json();
            if (data) {
                const { user: loggedinUser, token } = data;
                await AsyncStorage.setItem('userToken', token);
                SetCurrentUser(loggedinUser);
                console.log("loggedin user", loggedinUser);
                console.log("current user", loggedinUser);
                return loggedinUser;
            }
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const GetTokenAndNavigate = async (navigation) => {
        let token = await AsyncStorage.getItem('userToken');
        if (!token) {
            alert('You must sign in to save a flight');
            navigation.navigate('Login');
            throw new Error('User not authenticated');
        }
        return token;
    }


    const UpdateUserFlightsInState = (flightId, action) => {
        const updatedUsers = users.map(user => {
            if (user._id === currentUser._id) {
                let updatedUser = { ...user };
                if (action === 'save') {
                    updatedUser.savedFlights.push(flightId);
                } else if (action === 'remove') {
                    updatedUser.savedFlights = updatedUser.savedFlights.filter(id => id !== flightId);
                }
                SetCurrentUser(updatedUser);
                return updatedUser;
            }
            return user;
        });
        SetUsers(updatedUsers);
    }

    const SaveFlight = async (flight, navigation) => {
        try {
            const token = await GetTokenAndNavigate(navigation);
            let res = await fetch(`${base_api}/users/save-flight`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ flight }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error(`Error is: ${errorData.error}`);
                return;
            }

            console.log("Flight saved successfully!");
            UpdateUserFlightsInState(flight._id, 'save');
        } catch (error) {
            console.error(error);
        }
    }

    const RemoveSavedFlight = async (flight, navigation) => {
        try {
            const token = await GetTokenAndNavigate(navigation);
            let res = await fetch(`${base_api}/users/unsave-flight`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ flight }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error(`Error is: ${errorData.error}`);
                return;
            }

            console.log("Saved Flight was removed successfully!");
            UpdateUserFlightsInState(flight._id, 'remove');
        } catch (error) {
            console.error(error);
        }
    }

    const LoadSavedFlights = async () => {
        if (currentUser) {
            try {
                let res = await fetch(`${base_api}/users/${currentUser._id}/saved-flights`);

                let data = await res.json();

                res2 = await fetch(`${base_api}/Flights/`);

                let data2 = await res2.json()

                let savedFlightsObj = data2.filter(flight => data.includes(flight._id))

                SetSavedFlights(savedFlightsObj);

            } catch (error) {
                console.error("There was a problem fetching saved flights:", error);
            }
        }
    }


    const SaveFlight2 = async (flight, navigation) => {
        try {
            const token = await GetTokenAndNavigate(navigation);
            let res = await fetch(`${base_api}/users/save-flight`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ flight }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error(`Error is: ${errorData.error}`);
                return;
            }

            console.log("Flight saved successfully!");
            UpdateUserFlightsInState(flight._id, 'save');
        } catch (error) {
            console.error(error);
        }
    }


    const SaveHotel = async (hotel, navigation) => {

        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
            alert('you must sign in to save a flight');
            navigation.navigate('Login');
        }
        else {
            try {
                let res = await fetch(`${base_api}/users/save-hotel`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        hotel: hotel,
                    }),
                });


                if (!res.ok) {
                    let errorData = await res.json();
                    console.log(`Error is: ${errorData.error}`);
                    return null;
                }
                console.log("hotel saved successfully!");
                LoadAllUsers();
                const updatedUserProfile = users.find(user => currentUser._id === user._id)
                SetCurrentUser(updatedUserProfile);

            } catch (error) {
                console.log(error);
            }
        }
    }


    const RemoveSavedHotel = async (hotel) => {
        let token = await AsyncStorage.getItem('userToken');
        if (!token) {
            alert('you must sign in to save a flight');
            navigation.navigate('Login');
        }
        else {
            try {
                let res = await fetch(`${base_api}/users/unsave-hotel`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        hotel: hotel,
                    }),
                });

                if (!res.ok) {
                    let errorData = await res.json();
                    console.log(`Error is: ${errorData.error}`);
                    return null;
                }
                console.log("Saved hotel was removed successfully!");
                LoadAllUsers();
                const updatedUserProfile = users.find(user => currentUser._id === user._id)
                SetCurrentUser(updatedUserProfile);

            } catch (error) {
                console.log(error);
            }
        }
    }

    const GetUserProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                let res = await fetch(`${base_api}/users/profile`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!res.ok) {
                    console.error('Error Getting user Profile');
                    return null;
                }

                let data = await res.json();
                let user = data.user;
                return user;
            }
        } catch (err) {
            console.error(err);
        }
        return null;
    };

    const CheckIfFlightSaved = (flightId) => {
        if (!currentUser || !currentUser.savedFlights) {
            return undefined;
        }
        let savedFlights = currentUser.savedFlights;
        let flightFound = savedFlights.find(id => flightId === id);
        return flightFound;
    }


    const CheckIfHotelSaved = (hotelId) => {
        if (!currentUser || !currentUser.savedHotels) {
            return undefined;
        }
        let savedHotels = currentUser.savedHotels;
        console.log(savedHotels);
        let HotelFound = savedHotels.find(id => hotelId === id);
        return HotelFound;
    }

    const isHotelSaved = (currentUser, hotelId) => {
        if (!currentUser || !currentUser.savedHotels) {
            return false;
        }
        let savedHotels = currentUser.savedHotels;
        let hotelFound = savedHotels.find(id => hotelId === id);
        return hotelFound !== undefined;
    };


    const RemoveToken = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            SetCurrentUser(null);
        } catch (error) {
            console.error('An error occurred while removing the token:', error);
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
        GetAllCountriesAndCities();
    }, []);


    const value = {
        users,
        SetUsers,
        Login,
        EmailExists,
        CheckValidEmail,
        RegisterUser,
        GetUserProfile,
        RemoveToken,
        SaveFlight,
        SaveHotel,
        CheckIfFlightSaved,
        CheckIfHotelSaved,
        RemoveSavedHotel,
        RemoveSavedFlight,
        CheckValidEmail,
        countries,
        LoadSavedFlights,
        savedFlights,
        currentUser
    }

    return (
        <UsersContext.Provider value={value}>
            {children}
        </UsersContext.Provider>
    )
}
