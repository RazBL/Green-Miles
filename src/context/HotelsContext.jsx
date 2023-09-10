import React, { useEffect, useState, createContext } from 'react';
import { base_api } from '../../utils/api';

export const HotelsContext = createContext();

export default function HotelsContextProvider({ children }) {
  const [hotels, setHotels] = useState([]);
  const [searchedHotels, setSearchedHotels] = useState([]);
  const [checkInDates, setCheckInDates] = useState([]);
  const [checkOutDates, setCheckOutDates] = useState([]);
  const [locations, setLocations] = useState([]);

  const loadAllHotels = async () => {
    try {
      let res = await fetch(`${base_api}/hotels`);
      let data = await res.json();
      setHotels(data);
    } catch (err) {
      console.error(err);
    }
  }
  
  /*
  const searchHotels = async (query) => {
    try {
      const queryString = new URLSearchParams(query).toString();
      const url = `${base_api}/hotels/search?${queryString}`;
      console.log(url);
      let res = await fetch(url);
      let data = await res.json();
      setSearchedHotels(data);
    } catch (err) {
      console.error(err);
    }
  };
  */ 
  const HotelSearchResults = async (query) => {
    try {
      const queryString = new URLSearchParams(query).toString();
      const url = `${base_api}/hotels/search?${queryString}`;
      console.log("this is url",url);
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      setSearchedHotels(data);
    } catch (err) {
      console.error(err);
    }
  };
  


  const getHotelCheckInDates = () => {
    let data = Array.from(new Set(hotels.map(hotel => hotel.rooms.availability.from)));
    setCheckInDates(data);
  }

  const getHotelCheckOutDates = () => {
    let data = Array.from(new Set(hotels.map(hotel => hotel.rooms.availability.to)));
    setCheckOutDates(data);
  }

  const getHotelLocations = () => {
    let data = Array.from(new Set(hotels.map(hotel => hotel.city)));
    setLocations(data);
  }

  useEffect(() => {
    loadAllHotels();
  }, []);

  const value = {
    hotels,
    searchedHotels,
    checkInDates,
    checkOutDates,
    locations,
    getHotelCheckInDates,
    getHotelCheckOutDates,
    getHotelLocations,
    HotelSearchResults
  };

  return (
    <HotelsContext.Provider value={value}>
      {children}
    </HotelsContext.Provider>
  );
}
