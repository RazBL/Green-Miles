import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme, Card } from 'react-native-paper'
import React, { useContext, useState, useEffect } from 'react'
//Context
import { HotelsContext } from '../context/HotelsContext';

//Component
export default function HotelPreviewCard({ hotel, navigation }) {
  const theme = useTheme();
  const { HotelRatingText } = useContext(HotelsContext);
  const [hotelRating, SetHotelRating] = useState("")

  const NavigateToHotelDetails = () => {
    navigation.navigate('Tab', {
      screen: 'Hotels',
      params: {
        screen: 'Hotel',
        params: { hotel }
      }
    });
  };

  useEffect(() => {
    SetHotelRating(HotelRatingText(hotel));
  }, []);


  return (
    <View style={styles(theme).cardContainer}>
      <TouchableOpacity onPress={NavigateToHotelDetails}>
        <View style={styles(theme).imageContainer}>
          <Card.Cover
            source={{
              uri:
                'https://c4.wallpaperflare.com/wallpaper/624/380/1000/life-resort-hotel-resort-hotel-wallpaper-preview.jpg',
            }}
          />
          <View style={styles(theme).ecoRating}>
            <Text style={[styles(theme).ecoText, { color: 'white' }]}>
              <Text style={[styles(theme).ecoText, { color: theme.colors.primary }]}>Eco</Text> Rating: {hotel.eco_rating}/5 - <Text style={[styles(theme).ecoText, { color: '#38DDA2', }]}>{hotelRating}</Text>
            </Text>
          </View>
        </View>
      </ TouchableOpacity>
      <View>
        <Text style={styles(theme).headline}>{hotel.name}</Text>
        <Text style={styles(theme).text}>{hotel.address}</Text>
      </View>
    </View>
  )
}


const styles = theme => StyleSheet.create({
  cardContainer: {
    width: '50%',
    flex: 1
  },
  imageContainer: {
    position: 'relative'
  },
  headline: {
    fontFamily: 'Montserrat_Bold',
    fontSize: 13,
    marginVertical: 5
  },
  text: {
    fontFamily: 'Montserrat_Medium',
    fontSize: 10,
  },
  ecoRating: {
    position: 'absolute',
    top: 15,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: 8,
    paddingHorizontal: 5,
    borderRadius: 25,
    zIndex: 1,
  },
  ecoText: {
    fontSize: 11,
    fontFamily: 'Montserrat_Bold',
    alignSelf: 'center'
  }
})