import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'

//Component
import FlightCard from '../components/FlightCard';

export default function FlightSearchResults() {
  return (<>
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button mode="contained" icon="filter" style={styles.filterButton} labelStyle={{ fontSize: 15, fontFamily: 'Montserrat_Medium' }}>
          Filter
        </Button>
        <Button mode="contained" icon="sort" style={styles.sortButton} labelStyle={{ color: 'black', fontSize: 15, fontFamily: 'Montserrat_Medium' }}>
          Sort
        </Button>
      </View>
    </View>
  </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 15
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  filterButton: {
    backgroundColor: '#1e272e',
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
    width: 130
  },
  sortButton: {
    backgroundColor: '#1CD995',
    borderBottomStartRadius: 0,
    borderTopStartRadius: 0,
    width: 130
  },
});
