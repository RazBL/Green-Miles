import React, { useEffect, useState, createContext } from 'react'
import {base_api} from '../../utils/api' ;

export const HotelsContext = createContext();

export default function HotelsContextProvider({ children }) {

    const [hotels, SetHotels] = useState([]);

    const LoadAllHotels = async () => {
        try {
            let res = await fetch(`${base_api}/hotels`);
            let data = await res.json();
            SetHotels(data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        LoadAllHotels();
    }, [])

    const value = {
        hotels,
    }

    return (
        <HotelsContext.Provider value={value}>
            {children}
        </HotelsContext.Provider>
    )
}
