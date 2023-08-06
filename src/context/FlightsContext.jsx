import React, { useEffect, useState, createContext } from 'react'
import { base_api } from '../../utils/api';

export const FlightsContext = createContext();

export default function FlightsContextProvider({ children }) {

    const [flights, SetFlights] = useState([]);
    const [destinations, SetDestinations] = useState([]);
    const [origins, SetOrigins] = useState([]);
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
        let data = Array.from(new Set(flights.map(flight => flight.destination))); // remove duplicates
        SetDestinations(data);
    }

    const GetOrigins = () => {
        let data = Array.from(new Set(flights.map(flight => flight.origin))); // remove duplicates
        SetOrigins(data);
    }

    const FlightSearchResults = async(query) => {
        try {
          const queryString = new URLSearchParams(query).toString();
          const url = `${base_api}/flights/search?${queryString}`;
          console.log(url);
          let res = await fetch(url);
          let data = await res.json();
          console.log(data);
        } catch (err) {
          console.error(err);
        }
      };

      

    const fetchData = async () => {
        await LoadAllFlights();
        GetDestinations();
        GetOrigins();
    };

    useEffect(() => {
        fetchData();
    }, []);

    const value = {
        flights,
        destinations,
        origins,
        FlightSearchResults
    }

    return (
        <FlightsContext.Provider value={value}>
            {children}
        </FlightsContext.Provider>
    )
}
