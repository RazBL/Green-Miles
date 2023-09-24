import { View, StyleSheet, FlatList, Text } from 'react-native'
import { Button, Headline } from 'react-native-paper'
import React, { useContext, useState, useEffect } from 'react'
import { FlightsContext } from '../context/FlightsContext';
import CheckBox from 'react-native-check-box';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['ViewPropTypes']);

//Component
import FlightCard from '../components/FlightCard';

export default function FlightSearchResults({ navigation }) {

  const { searchedFlights } = useContext(FlightsContext);

  const [selectedPriceOptionIndex, SetSelectedPriceOptionIndex] = useState(null);
  const [selectedSorteOptionIndex, SetSelectedSortOptionIndex] = useState(null);
  const [displayedFlights, SetDisplayedFlights] = useState(searchedFlights);

  const filterPriceConditions = [
    { label: 'Under $150', min: null, max: 150 },
    { label: '$150 to $300', min: 150, max: 300 },
    { label: 'Over $300', min: 300, max: null },
  ];

  const [co2StateFilter, SetCo2StateFilter] = useState(false)

  const [toggleFilterDropdown, SetToggleFilterDropdown] = useState(false);

  const [toggleSortDropdown, SetToggleSortDropdown] = useState(false);

  const sortOptions = ['Sort by price: Lowest first', 'Sort by price: Highest first', 'Sort by Co2: Lowest first']

  const FilterAndSortFlights = () => {
    let filteredFlights = [...searchedFlights];

    // Filter by price
    if (selectedPriceOptionIndex !== null) {
      const condition = filterPriceConditions[selectedPriceOptionIndex];
      filteredFlights = filteredFlights.filter(flight => {
        if (condition.min !== null && flight.price < condition.min) return false;
        if (condition.max !== null && flight.price > condition.max) return false;
        return true;
      });
    }

    // Filter by CO2
    if (co2StateFilter) {
      filteredFlights = filteredFlights.filter(flight => flight.co2 < 1.4);
    }

    // Sort flights
    switch (selectedSorteOptionIndex) {
      case 0: // Price: Lowest first
        filteredFlights.sort((a, b) => a.price - b.price);
        break;
      case 1: // Price: Highest first
        filteredFlights.sort((a, b) => b.price - a.price);
        break;
      case 2: // CO2: Lowest first
        filteredFlights.sort((a, b) => a.co2 - b.co2);
        break;
      default:
        break;
    }

    return filteredFlights;
  }


  useEffect(() => {
    SetDisplayedFlights(FilterAndSortFlights());
  }, [searchedFlights, selectedPriceOptionIndex, co2StateFilter, selectedSorteOptionIndex,]);


  return (<>
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonDropdownContainer}>
          <Button mode="contained" icon="filter" style={styles.filterButton}
            labelStyle={{ fontSize: 15, fontFamily: 'Montserrat_Medium' }}
            onPress={() => {
              SetToggleFilterDropdown(prevToggle => !prevToggle);
              SetToggleSortDropdown(false);
            }}
          >
            Filter
          </Button>
          {
            !toggleFilterDropdown ? (
              <View style={{ position: 'absolute' }}><Text></Text></View>
            ) : (
              <View style={styles.filterButtonDropdown}>
                <View>
                  <Text style={{ color: 'white', fontFamily: 'Montserrat_Bold', fontSize: 15 }}>Price</Text>
                  {
                    filterPriceConditions.map((option, index) => {
                      const isSelected = selectedPriceOptionIndex === index;
                      return (
                        <CheckBox
                          key={index}
                          isChecked={isSelected}
                          style={styles.dropdownItem}
                          onClick={() => SetSelectedPriceOptionIndex(isSelected ? null : index)}
                          rightTextStyle={styles.dropdownItemText}
                          rightText={option.label}
                          checkBoxColor='white'
                        />
                      );
                    })
                  }
                </View>
                <View>
                  <Text style={{ color: 'white', fontFamily: 'Montserrat_Bold', fontSize: 15, marginTop: 20 }}>Co2</Text>
                  <CheckBox
                    isChecked={co2StateFilter}
                    style={styles.dropdownItem}
                    onClick={() => SetCo2StateFilter(!co2StateFilter)}
                    rightTextStyle={styles.dropdownItemText}
                    rightText={"Under 1.4"}
                    checkBoxColor='white'
                  />
                </View>
              </View>)
          }
        </View>

        <View style={styles.buttonDropdownContainer}>
          <Button mode="contained"
            icon="sort"
            style={styles.sortButton}
            labelStyle={{ color: 'white', fontSize: 15, fontFamily: 'Montserrat_Medium' }}
            onPress={() => {
              SetToggleSortDropdown(prevToggle => !prevToggle);
              SetToggleFilterDropdown(false);
            }}
          >
            Sort
          </Button>
          {
            !toggleSortDropdown ? (
              <View style={{ position: 'absolute' }}><Text></Text></View>
            ) : (
              <View style={styles.SortrButtonDropdown}>
                <View>
                  {
                    sortOptions.map((option, index) => {
                      const isSelected = selectedSorteOptionIndex === index;
                      return (
                        <CheckBox
                          key={index}
                          isChecked={isSelected}
                          style={styles.dropdownItem}
                          onClick={() => SetSelectedSortOptionIndex(isSelected ? null : index)}
                          rightTextStyle={styles.dropdownSortItemText}
                          rightText={option}
                          checkBoxColor='white'
                        />
                      );
                    })
                  }
                </View>
              </View>)
          }
        </View>
      </View>

      <View>
        {searchedFlights.length === 0 ? (
          <Headline style={styles.noFlightsText}>Sorry.. But no Flights were found :( </Headline>
        ) : (
          <FlatList
            data={displayedFlights}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <FlightCard flight={item} navigation={navigation} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 65}}
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
    paddingVertical: 30
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30
  },
  filterButton: {
    backgroundColor: '#1e272e',
    borderRadius: 15,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
    height: 40,
    width: 130
  },
  sortButton: {
    backgroundColor: '#1CD995',
    borderRadius: 15,
    borderBottomStartRadius: 0,
    borderTopStartRadius: 0,
    width: 130
  },
  noFlightsText: {
    textAlign: 'center',
    fontFamily: 'Montserrat_Medium',
  },
  ButtonDropdownContainer: {
    position: 'relative'
  },
  filterButtonDropdown: {
    position: 'absolute',
    zIndex: 100,
    backgroundColor: '#1e272e',
    width: '150%',
    padding: 20,
    paddingHorizontal: 15,
    paddingBottom: 30,
    top: 40,
    borderRadius: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },
  SortrButtonDropdown: {
    position: 'absolute',
    backgroundColor: '#1CD995',
    width: '150%',
    padding: 20,
    top: 40,
    paddingHorizontal: 15,
    paddingBottom: 30,
    right: 0,
    zIndex: 4,
    borderRadius: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },
  dropdownItem: {
    padding: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  dropdownItemText: {
    fontFamily: 'Montserrat_Medium',
    color: 'white'
  },
  dropdownSortItemText: {
    fontFamily: 'Montserrat_Medium',
    color: 'white'
  }

});
