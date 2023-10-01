import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Headline, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TabOffsetContext from '../context/TabOffsetContext'

//Screens

//Componenets
import HotelPreviewCard from '../components/HotelPreviewCard';

//Contexts
import { HotelsContext } from '../context/HotelsContext';

export default function Home({ navigation }) {

  const {hotels} = useContext(HotelsContext)

  const moveToTab = useContext(TabOffsetContext);

  const theme = useTheme();

  const ToHotelButtnHandler = () => {
    moveToTab(2);
    navigation.navigate('Hotels', { screen: 'Hotels' });
  };

  const ToFlightButtnHandler = () => {
    moveToTab(1);
    navigation.navigate('Flights', { screen: 'Flights' });
  };


  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).flightHotelSearch}>
        <View style={styles(theme).hotelImageBox}>
          <Image
            source={require('../images/hotels2.jpg')}
            resizeMode="contain"
            style={{ height: '100%', width: '100%',  opacity: 0.77 }}
          />
          <TouchableOpacity style={styles(theme).hotelFlightButton} onPress={ToHotelButtnHandler}>
            <View style={styles(theme).iconTextBox} >
              <MaterialCommunityIcons name={'bed-queen'} color={'white'} size={20} />
              <Text style={styles(theme).hotelFlightButtonText}>Hotels</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles(theme).flightImageBox}>
          <Image
            source={require('../images/flight2.jpg')}
            resizeMode="cover"
            style={{ height: '100%', width: '100%',opacity: 0.85}}
          />
          <TouchableOpacity style={styles(theme).hotelFlightButton} onPress={ToFlightButtnHandler}>
            <View style={styles(theme).iconTextBox} >
              <MaterialCommunityIcons name={'airplane'} color={'white'} size={22} />
              <Text style={styles(theme).hotelFlightButtonText}>Flights</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles(theme).HighestEcoRatedHotels}>
        <Headline style={styles(theme).headline}>Highest <Headline style={[styles(theme).headline, {color: theme.colors.primary}]}>Eco</Headline> rated Hotels</Headline>
      </View>

        <HotelPreviewCard hotel={hotels[0]} navigation={navigation}/>

    
    </View>
  )
}

const styles = theme => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 35
  },
  flightHotelSearch: {
    flexDirection: 'row',
    marginBottom: 35
  },
  headline: {
    fontSize: 20,
    fontFamily: 'Montserrat_Bold',
    alignSelf: 'center',
    color: 'black'
  },
  hotelImageBox: {
    flex: 1,
    height: 280,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  flightImageBox: {
    flex: 1,
    height: 280,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  SaveFlightHotelSection: {
    height: 280,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  toSavePage: {
    width: 175,
    height: 45,
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  saveButtonText: {
    color: 'white',
    fontFamily: 'Montserrat_Bold',
    fontSize: 20,
  },
  hotelFlightButton: {
    color: 'white',
    width: 160,
    height: 45,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute'
  },
  iconTextBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  hotelFlightButtonText: {
    marginLeft: 10,
    color: 'white',
    fontFamily: 'Montserrat_Medium',
    fontSize: 20,
  },
  saveTextButtonBox: {
    justifyContent: "center",
    alignItems: 'center',
    position: 'absolute'
  },
  HighestEcoRatedHotels: {

  }
});
