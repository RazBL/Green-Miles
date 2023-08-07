import React from 'react';
import { Text, TouchableOpacity } from 'react-native'; // שינוי כאן - הוספת TouchableOpacity
import { Card, Button } from 'react-native-paper';
import { View } from 'react-native-web';

const HotelCard = ({ hotelData, onMoreInfoClicked }) => { // שינוי כאן - הוספת פרמטר onMoreInfoClicked
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: 'https://c4.wallpaperflare.com/wallpaper/624/380/1000/life-resort-hotel-resort-hotel-wallpaper-preview.jpg' }} />
      <Card.Title title={hotelData.name} subtitle={hotelData.country} />
      <Card.Content>
        <Text style={styles.address}>{hotelData.address}</Text>
        <Text style={styles.ecoRating}>Eco rating: {hotelData.eco_rating}</Text>
        <Text style={styles.price}>Price per night: ${hotelData.price_per_night}</Text>
        <Text style={styles.checkIn}>Check-in: {hotelData.checkIn}</Text>
        <Text style={styles.checkOut}>Check-out: {hotelData.checkOut}</Text>
      </Card.Content>
      <Card.Actions>
        {/* שינוי כאן - הכפתור משתמש בפונקציה שמועברת כפרמטר */}
        <Button mode="contained" style={{backgroundColor: '#95a5a6',}} labelStyle={{ color: 'black'}} onPress={() => onMoreInfoClicked(hotelData)}>
          More Info
         </Button>

      </Card.Actions>
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