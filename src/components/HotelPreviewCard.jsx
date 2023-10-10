import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme, Card } from 'react-native-paper'
import React, { useContext, useState, useEffect } from 'react'
//Context
import { HotelsContext } from '../context/HotelsContext';
import TabOffsetContext from '../context/TabOffsetContext'



export default function HotelPreviewCard({ hotel, navigation }) {
  const theme = useTheme();
  const { HotelRatingText } = useContext(HotelsContext);
  const [hotelRating, SetHotelRating] = useState("");

  const moveToTab = useContext(TabOffsetContext);


  const NavigateToHotelDetails = () => {
    navigation.navigate('Navigation', {
      screen: 'Hotels',
      params: {
        screen: 'HotelsSearch',
        params: {
          hotel: hotel
        }
      }
    });
    moveToTab(2);
};


  useEffect(() => {
    SetHotelRating(HotelRatingText(hotel));
  }, []);


  return (
    <TouchableOpacity style={styles(theme).cardContainer} onPress={NavigateToHotelDetails}>
      <View style={styles(theme).imageContainer}>
        <Card.Cover
          source={{
            uri: hotel.image,
          }}
        />
        <View style={styles(theme).ecoRating}>
          <Text style={[styles(theme).ecoText, { color: 'white' }]}>
            <Text style={[styles(theme).ecoText, { color: theme.colors.primary }]}>Eco</Text> Rating: {hotel.eco_rating}/5 - <Text style={[styles(theme).ecoText, { color: '#38DDA2', }]}>{hotelRating}</Text>
          </Text>
        </View>
      </View>
      <Text style={styles(theme).headline}>{hotel.name}</Text>
      <Text style={styles(theme).text}>{hotel.address}</Text>
    </ TouchableOpacity >

  )
}


const styles = theme => StyleSheet.create({
  cardContainer: {
    width:  200,
    flex: 1,
    marginRight: 15
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
    paddingHorizontal: 7,
    borderRadius: 25,
    zIndex: 1,
  },
  ecoText: {
    fontSize: 10,
    fontFamily: 'Montserrat_Bold',
    alignSelf: 'center'
  }
})