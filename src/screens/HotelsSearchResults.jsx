import { View, StyleSheet, FlatList, ScrollView } from 'react-native'
import { Button, Headline, useTheme} from 'react-native-paper'
import React, { useContext } from 'react'
import { HotelsContext } from '../context/HotelsContext'

//Component
import HotelCard from '../components/HotelCard'


export default function FlightSearchResults({navigation}) {

  const theme = useTheme();

  const { searchedHotels } = useContext(HotelsContext);

  const test = () => {
    navigation.navigate('Login')
  }

  return (<>
      <View style={styles(theme).container}>
        <View style={styles(theme).buttonContainer}>
          <Button onPress={test} mode="contained" icon="filter" style={styles(theme).filterButton} labelStyle={{ fontSize: 15, fontFamily: 'Montserrat_Medium' }}>
            Filter
          </Button>
          <Button mode="contained" icon="sort" style={styles(theme).sortButton} labelStyle={{ color: 'black', fontSize: 15, fontFamily: 'Montserrat_Medium' }}>
            Sort
          </Button>
        </View>
        <View>
          {searchedHotels.length === 0 ? (
            <Headline style={styles(theme).noFlightsText}>Sorry.. But no Hotels were found :( </Headline>
          ) : (
            <FlatList
              data={searchedHotels}
              keyExtractor={(item) => item._id}  
              renderItem={({ item }) => <HotelCard hotel={item} navigation={navigation} />}
            />
          )}
        </View>
      </View>
  </>
  )
}

const styles = theme => StyleSheet.create({
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
    backgroundColor: theme.colors.logoBackground,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
    width: 130,
    borderRadius: 10
  },
  sortButton: {
    backgroundColor: theme.colors.primary,
    borderBottomStartRadius: 0,
    borderTopStartRadius: 0,
    width: 130,
    borderRadius: 10
  },
  noFlightsText: {
    textAlign: 'center',
    fontFamily: 'Montserrat_Medium',
  }
});