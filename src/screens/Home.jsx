import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Headline, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TabOffsetContext from '../context/TabOffsetContext'

export default function Home({ navigation }) {

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


  const ToSaveButtnHandler = () => {
    moveToTab(3);
    navigation.navigate('Save', { screen: 'Save' });
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
      <View style={styles(theme).SaveFlightHotelSection}>
        <Image
          source={require('../images/data-roaming-article.jpg')}
          style={{ height: '100%', width: '100%', opacity: 0.7 }}
        />
        <View style={styles(theme).saveTextButtonBox}>
          <Headline style={{ color: 'white', fontFamily: 'Montserrat_Bold', fontSize: 30, textAlign: 'center', maxWidth: 380 }}>Save the planet and your travel plans</Headline>
          <TouchableOpacity style={styles(theme).toSavePage} onPress={ToSaveButtnHandler}>
            <Text style={styles(theme).saveButtonText}>To Save</Text>
          </TouchableOpacity>
        </View>
      </View>

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
  }
});
