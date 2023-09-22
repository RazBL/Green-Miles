import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button, TextInput } from 'react-native-paper';

const HotelCheckOut = ({ route }) => {
  const { hotel } = route.params;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
    
      <Card style={styles.card}>
        <View>
          <Card.Cover
            source={{
              uri:
                'https://c4.wallpaperflare.com/wallpaper/624/380/1000/life-resort-hotel-resort-hotel-wallpaper-preview.jpg',
            }}
          />
          <Text style={styles.ecoRating}>
            <Text style={[styles.ecoText, { color: '#38DDA2', fontWeight: 'bold' }]}>Eco</Text> Rating: {hotel?.eco_rating} - <Text style={{ color: '#38DDA2', fontWeight: 'bold' }}>Excellent</Text>
          </Text>
        </View>
        <Card.Content>
          <Text>{hotel?.name}</Text>
          <Text>Country: {hotel?.country}</Text>
          <Text>Address: {hotel?.address}</Text>
          <Text>Price per night: ${hotel?.price_per_night}</Text>
          <Text>Check-in: {hotel?.rooms.availability.from}</Text>
          <Text>Check-out: {hotel?.rooms.availability.to}</Text>

          {/* Payment Information Section */}
          <Text style={styles.paymentInfo}>Payment Information</Text>
          <TextInput label="Credit Card Number" mode="outlined" style={styles.input} />
          <TextInput label="Expiration Date" mode="outlined" style={styles.input} />
          <TextInput label="CCV" mode="outlined" style={styles.input} />
          <TextInput label="Name Owner Credit Card" mode="outlined" style={styles.input} />

          <Button
            style={{ backgroundColor: 'black', marginTop: 16 }}
            labelStyle={{ color: 'white', fontWeight: 'bold' }}
          >
            Confirm Booking
          </Button>
        </Card.Content>
      </Card>
      
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    flex: 1,
  },
  card: {
    elevation: 4,
  },
  ecoRating: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: 8,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: 'bold',
    zIndex: 1,
  },
  ecoText: {
    fontWeight: 'normal',
  },
  input: {
    marginBottom: 16,
  },
  paymentInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default HotelCheckOut;
