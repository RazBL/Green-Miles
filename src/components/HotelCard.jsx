import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';

const HotelCard = ({ hotelData }) => {
  return (

    <Card style={styles.card}>
      <Card.Title title={hotelData.name} subtitle={hotelData.country} />
      <Card.Content>
        <Text>{hotelData.address}</Text>
        <Text>Eco rating: {hotelData.eco_rating}</Text>
        <Text>Price per night: {hotelData.price_per_night}</Text>
        <Text>Check-in: {hotelData.checkIn}</Text>
        <Text>Check-out: {hotelData.checkOut}</Text>
      </Card.Content>
      <Card.Actions>
        <Button>Select</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
});

export default HotelCard;

