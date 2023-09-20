import { View, StyleSheet, FlatList, ScrollView } from 'react-native'
import { Button, Headline } from 'react-native-paper'
import React, { useContext } from 'react'
import { FlightsContext } from '../context/FlightsContext';

//Component
import FlightCard from '../components/FlightCard';


export default function FlightSearchResults({navigation}) {

  const { searchedFlights } = useContext(FlightsContext);
  
  const test = () => {
    navigation.navigate('Login')
  }

  return (<>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button onPress={test} mode="contained" icon="filter" style={styles.filterButton} labelStyle={{ fontSize: 15, fontFamily: 'Montserrat_Medium' }}>
            Filter
          </Button>
          <Button mode="contained" icon="sort" style={styles.sortButton} labelStyle={{ color: 'black', fontSize: 15, fontFamily: 'Montserrat_Medium' }}>
            Sort
          </Button>
        </View>
        <View>
          {searchedFlights.length === 0 ? (
            <Headline style={styles.noFlightsText}>Sorry.. But no Flights were found :( </Headline>
          ) : (
            <FlatList
              data={searchedFlights}
              keyExtractor={(item) => item._id}  // Assuming each flight has a unique _id property
              renderItem={({ item }) => <FlightCard flight={item} navigation={navigation} />}
            />
          )}
        </View>
      </View>
  </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30
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
  noFlightsText: {
    textAlign: 'center',
    fontFamily: 'Montserrat_Medium',
  }
});
