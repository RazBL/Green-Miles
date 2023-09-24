import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Text, Button, useTheme, Headline } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const HotelDetails = ({ route }) => {
  const { hotel } = route.params;
  const navigation = useNavigation(); 
  const [saved, setSaved] = useState(false);
  const theme = useTheme();

  const handleBookNow = () => {
 navigation.navigate('HotelCheckOut', { hotel });
  };


  useEffect(() => {
    console.log(hotel);
  }, [])
  
  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).imageContainer}>
        <Image
          source={{
            uri:
              'https://c4.wallpaperflare.com/wallpaper/624/380/1000/life-resort-hotel-resort-hotel-wallpaper-preview.jpg',
          }}
          resizeMode="contain"
          style={styles(theme).image}
        />

        <TouchableOpacity style={styles(theme).heartContainer} onPress={() => setSaved(!saved)}>
          <MaterialCommunityIcons
            name={saved ? 'heart' : 'heart-outline'}
            color={saved ? '#1CD995' : 'white'}
            size={30}
          />
        </TouchableOpacity>

        <View style={styles(theme).hotelTitleBox}>
          <Headline style={styles(theme).hotelTitle}>{hotel.name} - {hotel.city}</Headline>
          <View>
            <Text style={styles(theme).hotelMiniTitle}>
              <Text style={[styles(theme).hotelMiniTitle, { color: theme.colors.primary }]}>Eco</Text> rating {hotel.eco_rating}/5
            </Text>
          </View>
        </View>
        
        <View style={styles(theme).infoContainer}>
          <Text style={styles(theme).infoTitle}>Address </Text>
          <Text style={styles(theme).info}>{hotel.address}</Text>

          <Text style={styles(theme).infoTitle}>Description</Text>
          <Text style={styles(theme).info}>{hotel.description}</Text>

          <Text style={styles(theme).price}>Price per night</Text>
          <Text style={[styles(theme).price, {fontFamily: 'Montserrat_Medium', fontSize: 17}]}>${hotel.price_per_night}</Text>
        </View>
      </View>
      <Button
        style={styles(theme).bookNowButton} 
        labelStyle={{ color: 'white', fontFamily: 'Montserrat_Bold', fontSize: 15 }}
        onPress={handleBookNow}
      >
        Book Now
      </Button>
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 20,
      flex: 1,
    },
    imageContainer: {
      position: 'relative',
    },
    image: {
      height: 215,
      borderRadius: 10,
      width: '100%',
      alignSelf: 'center',
    },
    hotelTitleBox: {
      backgroundColor: '#1E272E',
      width: '85%',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      position: 'absolute',
      alignSelf: 'center',
      top: 170,
    },
    hotelTitle: {
      fontSize: 20,
      fontFamily: 'Montserrat_Bold',
      color: 'white',
    },
    hotelMiniTitle: {
      fontSize: 15,
      fontFamily: 'Montserrat_Bold',
      color: 'white',
      marginBottom: 7,
    },
    heartContainer: {
      backgroundColor: 'rgba(24, 18, 13, 0.6)',
      position: 'absolute',
      padding: 5,
      borderRadius: 50,
      right: 20,
      top: 10,
    },
    infoContainer: {
      marginTop: 50,
      alignItems: 'flex-start', 
    },
    infoTitle: {
      fontSize: 15,
      fontFamily: 'Montserrat_Bold',
      marginBottom: 10,
      textAlign: 'left', 
    },
    info: {
      fontSize: 12,
      fontFamily: 'Montserrat_Medium',
      marginBottom: 10,
      textAlign: 'left',
    },
    price: {
      fontSize: 15,
      fontFamily: 'Montserrat_Bold',
      marginBottom: 10,
      textAlign: 'left',
      color: '#02304B',
    },
    bookNowButton: {
      position: 'absolute',
      bottom: 20,      
      left: 20,
      right: 20,
      backgroundColor: '#38DDA2',
      fontFamily: 'Montserrat_Bold'
    },
  });

export default HotelDetails;
