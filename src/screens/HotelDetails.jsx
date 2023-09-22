import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // ייבוא

const HotelDetails = ({ route }) => {
  const { hotel } = route.params;
  const navigation = useNavigation(); // השמת המשתנה navigation

  const handleBookNow = () => {
    // השתמש במשתנה navigation כדי לנווט למסך החדש
    navigation.navigate('HotelCheckOut', { hotel });
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View>
          <Card.Cover
            source={{
              uri:
                'https://c4.wallpaperflare.com/wallpaper/624/380/1000/life-resort-hotel-resort-hotel-wallpaper-preview.jpg',
            }}
          />
          <Text style={styles.ecoRating}>
            <Text style={[styles.ecoText, { color: '#38DDA2', fontWeight: 'bold' }]}>Eco</Text> Rating: {hotel.eco_rating} - <Text style={{ color: '#38DDA2', fontWeight: 'bold' }}>Excellent</Text>
          </Text>
        </View>
        <Card.Content>
          <Text>{hotel.name}</Text>
          <Text>Country: {hotel.country}</Text>
          <Text>Country: {hotel.city}</Text>
          <Text>Address: {hotel.address}</Text>
          <Text>Price per night: ${hotel.price_per_night}</Text>
          <Text>Description: {hotel.description}</Text>
          <Text>Total Rooms: {hotel.rooms.totalRooms}</Text>
          <Text>Available Rooms: {hotel.rooms.availability.availableRooms}</Text>
          <Text>Check-in: {hotel.rooms.availability.from}</Text>
          <Text>Check-out: {hotel.rooms.availability.to}</Text>
          <Button
            style={{ backgroundColor: '#38DDA2', fontWeight: 'bold' }}
            labelStyle={{ color: 'white' }}
            onPress={handleBookNow} // הפעל את הפונקציה handleBookNow כאשר לוחצים על הכפתור
          >
            Book Now
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  card: {
    elevation: 4,
    marginBottom: 16,
  },
  ecoRating: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: 8,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: 'bold',
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  ecoText: {
    fontWeight: 'normal',
  },
});

export default HotelDetails;
