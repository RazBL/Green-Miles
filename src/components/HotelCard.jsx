import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UsersContext } from '../context/UsersContext'; 
import { HotelsContext } from '../context/HotelsContext';

const HotelCard = ({ hotel, navigation }) => {
  const { SaveHotel, RemoveSavedHotel, currentUser, CheckIfHotelSaved } = useContext(UsersContext); // Get the functions and currentUser from UsersContext
  const { HotelRatingText } = useContext(HotelsContext);
  const [hotelRating, SetHotelRating] = useState("")
  const [saved, SetSaved] = useState(false);

  const navigateToHotelDetails = () => {
    if (currentUser)
      navigation.navigate('Hotel', { hotel });
    else {
      navigation.navigate('Login');
      alert("You must login in order to book");
    }
  };

  //Start state of the heart icon.
  const isHotelSaved = () => {
    let foundHotel = CheckIfHotelSaved(hotel._id);
    console.log('found hotel', foundHotel);
    if (foundHotel) {
      SetSaved(true);
    }
    else
      SetSaved(false);
  };

  const hotelSaveHandler = () => {
    if (!currentUser) {
      alert("You must login in order to save");
      navigation.navigate('Login');
      return;
    }

    let isSaved = currentUser.savedHotels.find(item => item == hotel._id)

    if (!isSaved) {
      SaveHotel(hotel, navigation);
      SetSaved(true); // שנה את הערך ל־true כאשר משתמש לוחץ לשמור את המלון
      console.log("hotel was saved");
    } else {
      RemoveSavedHotel(hotel);
      SetSaved(false); // שנה את הערך ל־false כאשר משתמש לוחץ להסיר את המלון
    }
  };

  useEffect(() => {
    SetHotelRating(HotelRatingText(hotel));
    isHotelSaved();
  }, [currentUser]);


  return (
    <View style={styles.card}>
      <View>
        <Card.Cover style={{ borderRadius: 10, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, height: 158 }}
          source={{
            uri:
              'https://c4.wallpaperflare.com/wallpaper/624/380/1000/life-resort-hotel-resort-hotel-wallpaper-preview.jpg',
          }}
        />
        <Text style={styles.ecoRating}>
          <Text style={[styles.ecoText, { color: '#38DDA2', fontWeight: 'bold' }]}>Eco</Text> Rating: {hotel.eco_rating}/5 - <Text style={{ color: '#38DDA2', fontWeight: 'bold' }}>{hotelRating}</Text>
        </Text>
      </View>
      <Card.Content style={{ margin: 10 }}>
        <Text style={styles.title}>{hotel.name}</Text>
        <Text style={styles.info}>Address: {hotel.address.replace(/\n/g, ' ')}</Text>
        <Text style={styles.info}>Price for 1 Night: $<Text style={{ fontFamily: 'Montserrat_Bold', fontSize: 15 }}>{hotel.price_per_night}</Text></Text>
      </Card.Content>
      <View style={styles.cardActions}>
        <Button
          style={{ backgroundColor: '#38DDA2', borderColor: 'transparent', width: 200 }}
          onPress={navigateToHotelDetails}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Book Now</Text>
        </Button>
        <View style={styles.favoriteIconContainer}>
          <View style={styles.favoriteIcon}>
            <MaterialCommunityIcons
              onPress={hotelSaveHandler}
              name={saved ? 'heart' : 'heart-outline'}
              color={saved ? '#1CD995' : 'black'}
              size={30}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    elevation: 4,
    backgroundColor: 'white',
    marginBottom: 30,
    fontFamily: 'Montserrat_Bold',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#A2A2A2'
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Montserrat_Bold',
  },
  info: {
    fontSize: 15,
    marginBottom: 10,
    fontFamily: 'Montserrat_Medium',
  },
  ecoRating: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    fontSize: 15,
    fontWeight: 'bold',
    zIndex: 1,
  },
  ecoText: {
    fontWeight: 'normal',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  favoriteIconContainer: {
    position: 'absolute',
    top: 0, // אנחנו מציינים שהאייקון יהיה באותו גובה כמו הכפתור
    right: 10, // מיקום אופקי בצד הימני
  },
});

export default HotelCard;