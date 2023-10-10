import React, { useEffect, useState, createContext } from 'react';
import { base_api } from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HotelsContext = createContext();

export default function HotelsContextProvider({ children }) {
  const [hotels, setHotels] = useState([]);
  const [searchedHotels, setSearchedHotels] = useState([]);
  const [checkInDates, setCheckInDates] = useState([]);
  const [checkOutDates, setCheckOutDates] = useState([]);
  const [locations, setLocations] = useState([]);
  const [hotelBookings, SetHotelBookings] = useState([]);
  const [HotelToBook, SetHotelToBook] = useState([]);



  const loadAllHotels = async () => {
    try {
      let res = await fetch(`${base_api}/hotels`);
      let data = await res.json();
      setHotels(data);
    } catch (err) {
      console.error(err);
    }
  }
  
  const HotelRatingText = (hotel) => {
    let ratingText = ""
    if(hotel.eco_rating > 4.5){
      ratingText = "Excellent"
    }
    else if(hotel.eco_rating > 4){
      ratingText = "Very Good"
    }
    else if(hotel.eco_rating > 3){
      ratingText = "Good"
    }
    else if(hotel.eco_rating > 2){
      ratingText = "Fair"
    }
    else{
      ratingText = 'Poor'
    }

    return ratingText;
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
/*
  const HotelBooking = async (currentUser, checkin, checkOut, HoteloToBook) => {
    try {
        let res = await fetch(`${base_api}/hotels/booking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: currentUser._id,
                hotelId: HoteloToBook._id,
                price_per_night: HoteloToBook.price_per_night,
                to:checkOut,
                from: checkin,
            }),
        });
*/ 


const HotelBooking = async (currentUser, currentTime, currentDate, HotelToBook) => {
  try {

    console.log(HotelToBook.total_price);
      let res = await fetch(`${base_api}/hotels/booking`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              userId: currentUser._id,
              hotelId: HotelToBook._id,
              hotelImage: HotelToBook.image,
              price: HotelToBook.total_price,
              date: currentDate,
              time: currentTime,
              nightsStay: 3
          }),
      });

      if (!res.ok) {
          let errorData = await res.json();
          console.log(`Error is: ${errorData.error}`);
          return null;
      }

      // אם ההזמנה התבצעה בהצלחה, עדכן רשימת ההזמנות שלך
      GetAllHotelBookings();
  } catch (error) {
      console.log(error);
  }
};


const GetAllHotelBookings = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    console.log('Token:', token); // הדפס את ה-Token
    const res = await fetch(`${base_api}/hotels/bookings`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (res.ok) {
      const data = await res.json();
      console.log('Hotels booked:', data); // הדפס את הנתונים
      SetHotelBookings(data);
    }
    await console.log((hotelBookings));
  } catch (error) {
    console.log('Error:', error);
  }
};




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
    HotelSearchResults,
    HotelRatingText,
    GetAllHotelBookings,
    HotelBooking,
    HotelToBook,
    SetHotelToBook,
    hotelBookings
  };

  return (
    <HotelsContext.Provider value={value}>
      {children}
    </HotelsContext.Provider>
  );
}
