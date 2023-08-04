import React, { useState, useEffect, useContext } from 'react';
import { Text, View, ScrollView } from 'react-native';
import HotelCard from '../components/HotelCard';
import { HotelsContext } from '../context/HotelsContext';

export default function Hotels() {
  const { hotels } = useContext(HotelsContext);

  return (<>
    <View><Text>Search bar</Text></View>
    <View><Text>fliter + sort</Text></View>
    <ScrollView>
      {hotels.map((hotel) => (
        <HotelCard key={hotel._id} hotelData={hotel} />
      ))}
    </ScrollView>
  </>
  );
}

