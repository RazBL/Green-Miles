import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const HotelDetails = ({ route }) => {
  const { hotel } = route.params;
  const navigation = useNavigation();

  const handleBookNow = () => {
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
          <View style={styles.textContainer}>
            <Text style={styles.title}>{hotel.name}</Text>
            <Text style={styles.ecoRating}>
              <Text style={[styles.ecoText, { color: '#38DDA2', fontWeight: 'bold' }]}>
                Eco
              </Text>{' '}
              Rating: {hotel.eco_rating} -{' '}
              <Text style={{ color: '#38DDA2', fontWeight: 'bold' }}>Excellent</Text>
            </Text>
          </View>
        </View>
        <Card.Content>
          <Text style={styles.info}>Country: {hotel.country}</Text>
          <Text style={styles.info}>City: {hotel.city}</Text>
          <Text style={styles.info}>Address: {hotel.address}</Text>
          <Text style={styles.info}>Price per night: ${hotel.price_per_night}</Text>
          <Text style={styles.info}>Description: {hotel.description}</Text>
          <Text style={styles.info}>Total Rooms: {hotel.rooms.totalRooms}</Text>
          <Text style={styles.info}>Available Rooms: {hotel.rooms.availability.availableRooms}</Text>
          <Text style={styles.info}>Check-in: {hotel.rooms.availability.from}</Text>
          <Text style={styles.info}>Check-out: {hotel.rooms.availability.to}</Text>
          
          <Button
    style={{ backgroundColor: '#38DDA2', borderColor: 'transparent' }}
    onPress={handleBookNow}
    contentStyle={{ width: '100%' }} // כאן תגדיר את הרוחב של התוכן של הכפתור
  >
    <Text style={{ color: 'white', fontWeight: 'bold' }}>Book Now</Text>
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
    fontFamily: 'Montserrat_Bold',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Montserrat_Bold',
    color: 'white',
  },
  info: {
    fontSize: 15,
    marginBottom: 10,
    fontFamily: 'Montserrat_Bold',
  },
  ecoRating: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Montserrat_Bold',
    color: 'white',
  },
  ecoText: {
    fontWeight: 'normal',
  },
});

export default HotelDetails;
