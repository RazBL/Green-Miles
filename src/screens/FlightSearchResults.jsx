import { View, Text, StyleSheet,FlatList } from 'react-native'
import React from 'react'

//Component
import FlightCard from '../components/FlightCard';

export default function FlightSearchResults() {
  return (
    <View style={styles.container}>
      <Text>

      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  upperBar: {
    backgroundColor: '#1e272e',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  image: {
    width: 70,
  },
});
