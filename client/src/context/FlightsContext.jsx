import React, { useEffect, useState, createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { base_api } from '../../utilis/api'

export const FlightsContext = createContext();

export default function FlightsContextProvider({ children }) {

    const [flights, SetFlights] = useState([]);
    const [destinationAirports, SetDestinationAirports] = useState([]);
    const [originAirports, SetOriginAirports] = useState([]);
    const [searchedFlights, SetSearchedFlights] = useState([]);
    const [destinationCities, SetDestinationCities] = useState([]);
    const [originCities, SetOriginCities] = useState([]);
    const [flightOrders, SetFlightOrders] = useState([]);
    const [FlightToBook, SetFlightToBook] = useState([]);
    
    const LoadAllFlights = async () => {
        try {
            let res = await fetch(`${base_api}/flights`);
            let data = await res.json();
            SetFlights(data);
        } catch (err) {
            console.error(err);
        }
    }

    const GetDestinations = () => {
        let data = Array.from(new Set(flights.map(flight => flight.destination.airport))); // remove duplicates
        SetDestinationAirports(data);
    }

    const GetDestinationCities = () => {
        let data = Array.from(new Set(flights.map(flight => flight.destination.city))); // remove duplicates
        SetDestinationCities(data);
    }

    const GetOriginCities = () => {
        let data = Array.from(new Set(flights.map(flight => flight.origin.city))); // remove duplicates
        SetOriginCities(data);
    }

    const GetOrigins = () => {
        let data = Array.from(new Set(flights.map(flight => flight.origin.airport))); // remove duplicates
        SetOriginAirports(data);
    }

    const FlightSearchResults = async (query) => {
        try {
            const queryString = new URLSearchParams(query).toString();
            const url = `${base_api}/flights/search?${queryString}`;
            console.log(url);
            let res = await fetch(url);
            let data = await res.json();
            SetSearchedFlights(data);
            console.log("searched flights array", searchedFlights);
        } catch (err) {
            console.error(err);
        }
    };

    const BookFlightPage = async (navigation, flight, passengers) => {

        let token = await AsyncStorage.getItem('userToken', token);
        if (!token) {
            alert('you must sign in order to book a flight');
            navigation.navigate('Login');
        }
        else {
            SetFlightToBook(flight);
            navigation.navigate('Flight Checkout', { passengers: passengers });
        }

    }

    const FlightBooking = async (currentUser, currentTime, currentDate, FlightToBook, passengers) => {
        try {
            let res = await fetch(`${base_api}/Flights/booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: currentUser._id,
                    flightId: FlightToBook._id,
                    price: FlightToBook.price * passengers,
                    passengers: passengers,
                    date: currentDate,
                    time: currentTime
                }),
            });

            if (!res.ok) {
                let errorData = await res.json();
                console.log(`Error is: ${errorData.error}`);
                return null;
            }

            await GetAllFlightOrders();

        } catch (error) {
            console.log(error);
        }
    }

    const GetAllFlightOrders = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const res = await fetch(`${base_api}/flights/bookings`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (res.ok) {
                const data = await res.json();
                SetFlightOrders(data);
                console.log("All flight orders were fetched");
            } 
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        LoadAllFlights();
    }, []);

    useEffect(() => {
        if (flights.length > 0) {
            GetDestinations();
            GetOrigins();
            GetOriginCities();
            GetDestinationCities();
        }
    }, [flights]);

    const value = {
        flights,
        destinationAirports,
        originAirports,
        FlightSearchResults,
        searchedFlights,
        destinationCities,
        originCities,
        searchedFlights,
        BookFlightPage,
        FlightToBook,
        FlightBooking,
        SetFlightToBook,
        flightOrders,
        GetAllFlightOrders
    }

    return (
        <FlightsContext.Provider value={value}>
            {children}
        </FlightsContext.Provider>
    )
}
