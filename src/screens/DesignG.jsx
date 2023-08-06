import React from 'react';
import { Text } from 'react-native';
import { Card, Button } from 'react-native-paper';

const HotelCard = ({ hotelData }) => {
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: 'https://example.com/hotel-image.jpg' }} />
      <Card.Title title={hotelData.name} subtitle={hotelData.country} />
      <Card.Content>
        <Text style={styles.address}>{hotelData.address}</Text>
        <Text style={styles.ecoRating}>Eco rating: {hotelData.eco_rating}</Text>
        <Text style={styles.price}>Price per night: ${hotelData.price_per_night}</Text>
        <Text style={styles.checkIn}>Check-in: {hotelData.checkIn}</Text>
        <Text style={styles.checkOut}>Check-out: {hotelData.checkOut}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={() => console.log('More info clicked')}>
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
