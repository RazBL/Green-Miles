import React from 'react';
import { Text, TouchableOpacity } from 'react-native'; // שינוי כאן - הוספת TouchableOpacity
import { Card, Button } from 'react-native-paper';
import { View } from 'react-native-web';

const HotelCard = ({ hotel, navigation }) => { // שינוי כאן - הוספת פרמטר onMoreInfoClicked
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: 'https://c4.wallpaperflare.com/wallpaper/624/380/1000/life-resort-hotel-resort-hotel-wallpaper-preview.jpg' }} />
      <Card.Title title={hotel.name} subtitle={hotel.country} />
      <Card.Title title={hotel.address} subtitle={hotel.country} />
      <Card.Title title={hotel.ecoRating} subtitle={hotel.country} />
      
    </Card>
  );
};

const styles = {
  card: {
    marginBottom: 16,
  },
  address: {
    fontSize: 16,
    marginBottom: 8,
  },
  ecoRating: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  checkIn: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  checkOut: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
};

export default HotelCard;