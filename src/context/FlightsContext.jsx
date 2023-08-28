import React, { useEffect, useState, createContext } from 'react'
import { base_api } from '../../utils/api';

export const FlightsContext = createContext();

export default function FlightsContextProvider({ children }) {

    const [flights, SetFlights] = useState([]);
    const [destinationAirports, SetDestinationAirports] = useState([]);
    const [originAirports, SetOriginAirports] = useState([]);
    const [searchedFlights, SetSearchedFlights] = useState([]);

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
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        LoadAllFlights();
    }, []);

    useEffect(() => {
        if (flights.length > 0) {
            GetDestinations();
            GetOrigins();
        }
    }, [flights]);

    const value = {
        flights,
        destinationAirports,
        originAirports,
        FlightSearchResults,
        searchedFlights
    }

    return (
        <FlightsContext.Provider value={value}>
            {children}
        </FlightsContext.Provider>
    )
}
