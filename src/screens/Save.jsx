import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { Headline, useTheme } from 'react-native-paper'
import React, { useContext, useState, useEffect } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Components
import FlightCard from '../components/FlightCard';
import HotelCard from '../components/HotelCard';

// Context
import { FlightsContext } from '../context/FlightsContext';
import { UsersContext } from '../context/UsersContext';
import { HotelsContext } from '../context/HotelsContext';

export default function Save({ navigation }) {

  const theme = useTheme();

  const { flights } = useContext(FlightsContext);
  const { hotels} = useContext(HotelsContext)
  const { currentUser } = useContext(UsersContext);

  const [flightsButton, SetFlightsButton] = useState(true);
  const [hotelsButton, SetHotelsButton] = useState(false);
  const [savedFlights, SetSavedFlights] = useState([]);
  const [savedHotels, SetSavedHotels] = useState([]);
  const flightTextColor = flightsButton ? theme.colors.primary : 'white';
  const HotelTextColor = hotelsButton ? theme.colors.primary : 'white';



  useEffect(() => {
    if (currentUser) {
      let filteredFlights = flights.filter(flight => currentUser.savedFlights.includes(flight._id));
      SetSavedFlights(filteredFlights);
      let filteredHotels = hotels.filter(hotel => currentUser.savedHotels.includes(hotel._id));
      console.log("hotels", filteredHotels);
      SetSavedHotels(filteredHotels);
    }
  }, [currentUser, flights,]);

  useEffect(() => {
  }, [savedFlights, savedHotels]);


  return (
    <View style={styles(theme).container}>

      {
        flightsButton ? (<Headline style={styles(theme).headline}>My Saved Flights</Headline>) :
          (<Headline style={styles(theme).headline}>My Saved Hotels</Headline>)
      }

      <View style={styles(theme).buttonsSection}>

        <TouchableOpacity style={flightsButton ? styles(theme).pressedButton : styles(theme).notPressedButton}
          disabled={flightsButton}
          onPress={() => {
            SetFlightsButton(true);
            SetHotelsButton(false);
          }}>
          <Text style={flightsButton ? styles(theme).pressedButtonText : styles(theme).notPressedButtonText}>Flights</Text>
          <MaterialCommunityIcons name={'airplane'} style={{ marginLeft: 5 }} color={flightTextColor} size={24} />
        </TouchableOpacity>

        <TouchableOpacity style={hotelsButton ? styles(theme).pressedButton : styles(theme).notPressedButton}
          disabled={hotelsButton}
          onPress={() => {
            SetFlightsButton(false);
            SetHotelsButton(true);
          }}>
          <Text style={hotelsButton ? styles(theme).pressedButtonText : styles(theme).notPressedButtonText} >Hotels</Text>
          <MaterialCommunityIcons name={'bed'} style={{ marginLeft: 5 }} color={HotelTextColor} size={24} />
        </TouchableOpacity>

      </View>

      <View>
            <FlatList
              data={flightsButton ? savedFlights : savedHotels}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => flightsButton ? (<FlightCard flight={item} navigation={navigation} />) :
               (<HotelCard  hotel={item} navigation={navigation}/>)}
              showsVerticalScrollIndicator={false} 
              contentContainerStyle={{ paddingBottom: 120}}/>
      </View>
    </View>
  )
}


const styles = theme => StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    padding: 20,
    paddingVertical: 10,
    flex: 1,
  },
  headline: {
    fontSize: 20,
    fontFamily: 'Montserrat_Bold',
    color:"black",
    marginBottom: 30,
    alignSelf: 'center'
  },
  buttonsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  notPressedButtonText: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'Montserrat_Bold'
  },
  notPressedButton: {
    backgroundColor: theme.colors.primary,
    padding: 13,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressedButtonText: {
    fontSize: 15,
    color: theme.colors.primary,
    fontFamily: 'Montserrat_Bold'
  },
  pressedButton: {
    backgroundColor: 'white',
    padding: 12,
    paddingHorizontal: 19,
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    alignItems: 'center',
  }
})