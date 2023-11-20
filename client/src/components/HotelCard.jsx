import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UsersContext } from '../context/UsersContext';
import { HotelsContext } from '../context/HotelsContext';
import TabOffsetContext from '../context/TabOffsetContext';

const HotelCard = ({ hotel, navigation, rooms }) => {
  const { SaveHotel, RemoveSavedHotel, currentUser, CheckIfHotelSaved } = useContext(UsersContext);
  const { HotelRatingText } = useContext(HotelsContext);
  const [hotelRating, SetHotelRating] = useState("");
  const [saved, SetSaved] = useState(false);
  const [tooltipVisible, SetTooltipVisible] = useState(false);

  const moveToTab = useContext(TabOffsetContext);

  const navigateToHotelDetails = () => {
    navigation.navigate('Hotel',
      {
        hotel: hotel,
        rooms: rooms
      }
    );
    moveToTab(2);
  };


  // Start state of the heart icon.
  const isHotelSaved = () => {
    let foundHotel = CheckIfHotelSaved(hotel._id);
    if (foundHotel) {
      SetSaved(true);
    } else {
      SetSaved(false);
    }
  };

  const hotelSaveHandler = async() => {
    if (!currentUser) {
      alert("You must login in order to save");
      navigation.navigate('Login');
      return;
    }

    let isSaved = currentUser.savedHotels.find(item => item._id == hotel._id);
    console.log("is saved", isSaved);
    if (!isSaved) {
     await SaveHotel(hotel, navigation, rooms);
      SetSaved(true); // Change the value to true when the user clicks to save the hotel
      console.log("hotel was saved");
    } else {
      await RemoveSavedHotel(hotel);
      SetSaved(false); // Change the value to false when the user clicks to remove the hotel
    }
  };


  useEffect(() => {
    SetHotelRating(HotelRatingText(hotel));
    isHotelSaved();
  }, [currentUser, currentUser?.savedHotels]);

  return (
    <View style={styles.card}>
      <View>
        <Card.Cover
          style={{ borderRadius: 10, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, height: 158 }}
          source={{
            uri: hotel.image,
          }}
        />

        <View style={styles.ecoRating}>
          <Text style={{ color: 'white', fontFamily: 'Montserrat_Bold' }}>
            <Text style={[styles.ecoText, { color: '#38DDA2', fontFamily: 'Montserrat_Bold' }]}>Eco</Text> Rating {hotel.eco_rating}/5 - <Text style={{ color: '#38DDA2', fontWeight: 'bold' }}>{hotelRating}  </Text>
          </Text>
          <TouchableOpacity onPress={() => SetTooltipVisible(true)} style={{}}>
            <MaterialCommunityIcons name="help-circle-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>



        <Modal
          animationType="slide"
          transparent={true}
          visible={tooltipVisible}
          onRequestClose={() => SetTooltipVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.modalContainer}>
              <Text style={{ fontFamily: 'Montserrat_Bold', fontSize: 16, textAlign: 'center' }}>
                <Text style={{ fontFamily: 'Montserrat_Bold', fontSize: 16, color: '#38DDA2' }}>Eco</Text> Rating
              </Text>
              <Text style={styles.modalText}>
                Eco Rating reflects a hotel's commitment to eco-friendly practices, considering energy efficiency, waste reduction, water conservation, and fewer disposable items. Higher EcoRatings mean hotels are more eco-conscious, which allows travelers to make greener choices while supporting sustainable practices.
              </Text>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => SetTooltipVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>



      </View>
      <Card.Content style={{ margin: 10 }}>
        <Text style={styles.title}>{hotel.name}</Text>
        <Text style={styles.info}>Address: {hotel.address.replace(/\n/g, ' ')}</Text>
        <Text style={styles.info}>Price for 1 Night: $<Text style={{ fontFamily: 'Montserrat_Bold', fontSize: 15 }}>{hotel.price_per_night * rooms || hotel.price_per_night * hotel.roomz}</Text></Text>
        <Text style={styles.info}>Rooms : <Text style={{ fontFamily: 'Montserrat_Bold', fontSize: 15 }}>{rooms || hotel.roomz}</Text></Text>
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
    borderColor: '#A2A2A2',
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
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    fontSize: 15,
    zIndex: 1,
    flexDirection: 'row'
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
    top: 0, // We specify that the icon will be at the same height as the button
    right: 10, // Horizontal position on the right side
  },

  modalContainer: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  modalText: {
    fontFamily: 'Montserrat_Medium',
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 20,
  },
  closeButton: {
    backgroundColor: '#38DDA2',
    borderColor: 'transparent',
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  closeButtonText: {
    fontFamily: 'Montserrat_Bold',
    color: 'white',
    fontSize: 15
  }


});

export default HotelCard;
