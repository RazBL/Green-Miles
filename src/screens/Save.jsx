import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Headline, useTheme } from 'react-native-paper'
import React, { useContext, useState, useEffect } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Components
import FlightCard from '../components/FlightCard';
import HotelCard from '../components/HotelCard';

// Context
import { FlightsContext } from '../context/FlightsContext';
import { UsersContext } from '../context/UsersContext';

export default function Save({ navigation }) {

  const theme = useTheme();

  const { LoadSavedFlights, savedFlights } = useContext(FlightsContext);
  const { currentUser } = useContext(UsersContext);

  const [flightsButton, SetFlightsButton] = useState(true);
  const [hotelsButton, SetHotelsButton] = useState(false);

  const flightTextColor = flightsButton ? 'white' : theme.colors.primary;
  const HotelTextColor = hotelsButton ? 'white' : theme.colors.primary;


  useEffect(() => {
    LoadSavedFlights()
  }, [currentUser?.savedFlights]);

  return (
    <View>
      <Headline>My Saved Flights</Headline>
      <View>
        <TouchableOpacity onPress={() => {
          SetFlightsButton(true);
          SetHotelsButton(false);
        }}>
          <Text>Flights</Text>
          <MaterialCommunityIcons name={'airplane'} style={{ marginTop: 5 }} color={flightTextColor} size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          SetFlightsButton(false);
          SetHotelsButton(true);
        }}>
          <Text>Hotels</Text>
          <MaterialCommunityIcons name={'bed'} style={{ marginTop: 5 }} color={HotelTextColor} size={24} />
        </TouchableOpacity>
      </View>

      <View>
        {
          savedFlights.length === 0 ? <Text>no flight</Text> :
            <FlatList
              data={savedFlights}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <FlightCard flight={item} navigation={navigation} />}
              showsVerticalScrollIndicator={false} />
        }
      </View>
    </View>
  )
}