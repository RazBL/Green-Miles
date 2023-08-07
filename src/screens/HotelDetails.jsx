import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { Card } from 'react-native-paper';

const HotelDetails = ({ route }) => {
  const { hotelData } = route.params;

  return (
    <View style={styles.container}>
      <Card>
        <Card.Cover source={{ uri: 'https://c4.wallpaperflare.com/wallpaper/624/380/1000/life-resort-hotel-resort-hotel-wallpaper-preview.jpg' }} />
        <Card.Content>
          <Text>Hotel Name: {hotelData.name}</Text>
          <Text>Country: {hotelData.country}</Text>
          <Text>Address: {hotelData.address}</Text>
          <Text>Eco Rating: {hotelData.eco_rating}</Text>
          <Text>Price per night: {hotelData.price_per_night}</Text>
          <Text>Check-in: {hotelData.checkIn}</Text>
          <Text>Check-out: {hotelData.checkOut}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default HotelDetails;

const styles = StyleSheet.create({
container: {
      backgroundColor:'white',
      padding:16
}
})