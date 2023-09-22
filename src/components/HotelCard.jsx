import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UsersContext } from '../context/UsersContext'; // Import the UsersContext

const HotelCard = ({ hotel, navigation }) => {
  const { SaveHotel, RemoveSavedHotel, CheckIfHotelSaved, currentUser } = useContext(UsersContext); // Get the functions and currentUser from UsersContext

  const navigateToHotelDetails = () => {
    navigation.navigate('HotelDetails', { hotel });
  };

  const isHotelSaved = (currentUser, hotelId) => {
    if (!currentUser || !currentUser.savedHotels) {
      return false;
    }
    let savedHotels = currentUser.savedHotels;
    let hotelFound = savedHotels.find(id => hotelId === id);
    return hotelFound !== undefined;
  };

  const hotelSaveHandler = () => {
    if (!hotel.saved) {
      SaveHotel(hotel, navigation);
    } else {
      RemoveSavedHotel(hotel);
    }
  };

  return (
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
        <Text style={styles.title}>{hotel.name}</Text>
        <Text style={styles.info}>Address: {hotel.address.replace(/\n/g, ' ')}</Text>
        <Text style={styles.info}>Price for 1 Night: ${hotel.price_per_night}</Text>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <Button
          style={{ backgroundColor: '#38DDA2' }}
          onPress={navigateToHotelDetails}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Book Now</Text>
        </Button>
        <View style={styles.favoriteIcon}>
          <MaterialCommunityIcons
            name={isHotelSaved(currentUser, hotel._id) ? 'heart' : 'heart-outline'}
            size={24}
            color={isHotelSaved(currentUser, hotel._id) ? '#38DDA2' : 'black'}
            onPress={hotelSaveHandler}
          />
        </View>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
  },
  ecoRating: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: 8,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: 'bold',
    zIndex: 1,
  },
  ecoText: {
    fontWeight: 'normal',
  },
  cardActions: {
    justifyContent: 'space-between',
  },
  favoriteIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HotelCard;
