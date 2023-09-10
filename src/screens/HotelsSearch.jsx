import React, { useContext, useState, useEffect } from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Modal,TouchableWithoutFeedback,Keyboard,TextInput,Platform,} from 'react-native';
import { Button, Headline, useTheme } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HotelsContext } from '../context/HotelsContext';
import { useNavigation } from '@react-navigation/native';


export default function HotelSearch({ navigation }) {
  const {HotelSearchResults, hotels} = useContext(HotelsContext);
  const theme = useTheme();
  const [passengers, setPassengers] = useState(1);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState({
    checkIn: false,
    checkOut: false,
  });
  const [showDestinationPicker, setShowDestinationPicker] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDateField, setSelectedDateField] = useState('checkIn');
  const MAX_PASSENGERS = 9;
  const MIN_PASSENGERS = 1;
  const [transformedHotelCountries, SetTransformedHotelCountries] = useState([]);

  const IncrementPassengers = () => {
    if (passengers < MAX_PASSENGERS) setPassengers(passengers + 1);
  };

  const DecrementPassengers = () => {
    if (passengers > MIN_PASSENGERS) setPassengers(passengers - 1);
  };

  const handleConfirm = () => {
    setShowDatePicker({
      ...showDatePicker,
      checkIn: false,
      checkOut: false,
    });
  };

  


  const DateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker((prevShowDatePicker) => ({
      ...prevShowDatePicker,
      [selectedDateField]: Platform.OS === 'ios' ? prevShowDatePicker[selectedDateField] : false,
    }));
    
    if (selectedDateField === 'checkIn') {
      setCheckInDate(currentDate);
    } else if (selectedDateField === 'checkOut') {
      setCheckOutDate(currentDate);
    }
  };

  const HandleHotelSearch = () => {
    if (!isInputValid()) return;
  
    const formattedCheckInDate = checkInDate.toISOString().split('T')[0];
    const formattedCheckOutDate = checkOutDate.toISOString().split('T')[0];
  
    const query = {
      country: selectedDestination,
      checkInDate: formattedCheckInDate,
      checkOutDate: formattedCheckOutDate,
    };
  
    HotelSearchResults(query);
    navigation.navigate('Hotel Search Results'); // כאן אנחנו משנים את המסך באמצעות ניווט
  };
  

  const isInputValid = () => {
    if (!selectedDestination) {
      alert('Please choose a destination.');
      return false;
    }

    return true;
  };

  const TransformHotels = () => {

    let uniqueData = Array.from(new Set(hotels.map(hotel => hotel.country)));
    
    let data = uniqueData.map(country => (
      {
        label: country,
        value: country
      }
    ));

    console.log(data);
  
    SetTransformedHotelCountries(data);
  }
  

  useEffect(() => {
    TransformHotels();
    console.log("Hello this is hotel text!");
    console.log(transformedHotelCountries);
  }, [])
  

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles(theme).container}>
        <View style={styles(theme).flightSearch}>
          <Headline style={styles(theme).headline}>
            Search for a <Headline style={{ color: theme.colors.primary }}>Hotel</Headline>
          </Headline>

          <View style={styles(theme).searchSection}>
            <MaterialCommunityIcons
              name="map-marker"
              size={25}
              color="#2B3A4A"
              style={styles(theme).inputIcon}
            />
            <DropDownPicker
              open={showDestinationPicker}
              onOpen={() => setShowDestinationPicker(true)}
              onClose={() => setShowDestinationPicker(false)}
              placeholder="Choose a Destination"
              items={transformedHotelCountries}
              value={selectedDestination}
              setValue={setSelectedDestination}
              textStyle={{ fontSize: 15, color: '#2B3A4A', fontFamily: 'Montserrat_Medium' }}
              searchable={true}
              style={styles(theme).input}
            />
          </View>

          <TouchableOpacity
            style={[styles(theme).searchSection]}
            onPress={() => {
              setSelectedDateField('checkIn');
              setShowDatePicker((prevShowDatePicker) => ({
                ...prevShowDatePicker,
                checkIn: true,
              }));
            }}
          >
            <View style={styles(theme).inputWrapper}>
              <MaterialCommunityIcons
                name="calendar"
                size={25}
                color="#2B3A4A"
                style={styles(theme).inputIcon}
              />
              <TextInput
                editable={false}
                underlineColorAndroid="transparent"
                backgroundColor="white"
                style={styles(theme).input}
                placeholder="Choose Check-In Date"
                value={checkInDate.toDateString()}
              />
              {showDatePicker.checkIn && (
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={checkInDate}
                  onChange={(event, selectedDate) => DateChange(event, selectedDate)}
                  onConfirm={handleConfirm}
                />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles(theme).searchSection]}
            onPress={() => {
              setSelectedDateField('checkOut');
              setShowDatePicker((prevShowDatePicker) => ({
                ...prevShowDatePicker,
                checkOut: true,
              }));
            }}
          >
            <View style={styles(theme).inputWrapper}>
              <MaterialCommunityIcons
                name="calendar"
                size={25}
                color="#2B3A4A"
                style={styles(theme).inputIcon}
              />
              <TextInput
                editable={false}
                underlineColorAndroid="transparent"
                backgroundColor="white"
                style={styles(theme).input}
                placeholder="Choose Check-Out Date"
                value={checkOutDate.toDateString()}
              />
              {showDatePicker.checkOut && (
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={checkOutDate}
                  onChange={(event, selectedDate) => DateChange(event, selectedDate)}
                  onConfirm={handleConfirm}
                />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles(theme).searchSection]}
            onPress={() => setModalVisible(true)}
          >
            <View style={styles(theme).inputWrapper}>
              <MaterialCommunityIcons
                name="account"
                size={25}
                color="#2B3A4A"
                style={styles(theme).inputIcon}
              />
              <TextInput
                editable={false}
                underlineColorAndroid="transparent"
                backgroundColor="white"
                style={styles(theme).input}
                placeholderTextColor={theme.colors.inputTextColor}
                placeholder={`${passengers} Guest${passengers === 1 ? '' : 's'}`}
              />
            </View>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
              setModalVisible(!isModalVisible);
            }}
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles(theme).centeredView}>
                <View style={styles(theme).modalView}>
                  <View style={{ flexDirection: 'column' }}>
                    <TouchableOpacity onPress={IncrementPassengers}>
                      <Text style={styles(theme).modalText}>+</Text>
                    </TouchableOpacity>
                    <Text style={[styles(theme).modalText]}>{passengers}</Text>
                    <TouchableOpacity onPress={DecrementPassengers}>
                      <Text style={styles(theme).modalText}>-</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={[styles(theme).button, styles(theme).buttonClose]}
                    onPress={() => setModalVisible(!isModalVisible)}
                  >
                    <Text style={styles(theme).textStyle}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          <Button
            mode="flat"
            contentStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
            }}
            onPress={HandleHotelSearch}
            style={styles(theme).searchButton}
          >
            <Text style={[{ fontSize: 20, color: 'white' }, { fontFamily: 'Montserrat_Bold' }]}>Search</Text>
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'white',
    },
    headline: {
      fontSize: 25,
      fontFamily: 'Montserrat_Bold',
      color: 'white',
      alignSelf: 'center',
      marginBottom: 30,
    },
    searchSection: {
      marginBottom: 20,
    },
    inputIcon: {
      position: 'absolute',
      left: 20,
      zIndex: 5,
      elevation: 10,
      top: '50%',
      transform: [{ translateY: -12.5 }],
    },
    searchButton: {
      marginTop: 10,
      borderRadius: 25,
      backgroundColor: '#1DBF84',
      borderColor: 'transparent',
    },
    flightSearch: {
      backgroundColor: '#1e272e',
      paddingVertical: 30,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    input: {
      paddingHorizontal: 60,
      zIndex: 1,
      borderRadius: 0,
      borderWidth: 0,
      fontSize: 15,
      fontFamily: 'Montserrat_Medium',
      height: 50,
      color: theme.colors.inputTextColor,
    },
    inputWrapper: {
      overflow: 'hidden',
      height: 50,
      justifyContent: 'center',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      padding: 20,
      paddingTop: 50,
      paddingBottom: 50,
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontFamily: 'Montserrat_Medium',
      fontSize: 30,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      width: 200,
    },
    buttonClose: {
      backgroundColor: '#1DBF84',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
