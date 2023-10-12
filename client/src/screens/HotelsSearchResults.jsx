import { Text,View, StyleSheet, FlatList } from 'react-native'
import { Button, Headline, useTheme} from 'react-native-paper'
import React, { useContext, useState, useEffect } from 'react'
import CheckBox from 'react-native-check-box';
import { HotelsContext } from '../context/HotelsContext'

//Component
import HotelCard from '../components/HotelCard'


export default function HotelSearchResults({navigation}) {

  const theme = useTheme();

  const { searchedHotels } = useContext(HotelsContext);

  const [selectedPriceOptionIndex, SetSelectedPriceOptionIndex] = useState(null);
  const [selectedSorteOptionIndex, SetSelectedSortOptionIndex] = useState(null);
  const [displayedHotels, SetDisplayedHotels] = useState(searchedHotels);

  const filterPriceConditions = [
    { label: 'Under $150 per night', min: null, max: 150 },
    { label: '$150 to $300 per night', min: 150, max: 300 },
    { label: 'Over $300 per night', min: 300, max: null },
  ];

  const [ecoRatingFilter, SetEcoRatingFilter] = useState(false)

  const [toggleFilterDropdown, SetToggleFilterDropdown] = useState(false);

  const [toggleSortDropdown, SetToggleSortDropdown] = useState(false);

  const sortOptions = ['price: Lowest first', 'price: Highest first', 'Eco rating: Highest first']

  const FilterAndSortHotels = () => {
    let filteredHotels = [...searchedHotels];

    // Filter by price
    if (selectedPriceOptionIndex !== null) {
      const condition = filterPriceConditions[selectedPriceOptionIndex];
      filteredHotels = filteredHotels.filter(hotel => {
        if (condition.min !== null && hotel.price_per_night < condition.min) return false;
        if (condition.max !== null && hotel.price_per_night > condition.max) return false;
        return true;
      });
    }

    // Filter by EcoRating
     if (ecoRatingFilter) {
      filteredHotels = filteredHotels.filter(hotel => hotel.eco_rating > 3);
    }

    // Sort flights
    switch (selectedSorteOptionIndex) {
      case 0: // Price: Lowest first
      filteredHotels.sort((a, b) => a.price_per_night - b.price_per_night);
        break;
      case 1: // Price: Highest first
      filteredHotels.sort((a, b) => b.price_per_night - a.price_per_night);
        break;
      case 2: // EcoRating : Lowest first
      filteredHotels.sort((a, b) => a.ecoRating - b.ecoRating);
        break;
      default:
        break;
    }

    return filteredHotels;
  }


  useEffect(() => {
    SetDisplayedHotels(FilterAndSortHotels());
  }, [searchedHotels, selectedPriceOptionIndex, ecoRatingFilter, selectedSorteOptionIndex,]);

  return (<>
    <View style={styles(theme).container}>
      <View style={styles(theme).buttonContainer}>
        <View style={styles(theme).buttonDropdownContainer}>
          <Button mode="contained" icon="filter" style={styles(theme).filterButton}
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
              <View style={styles(theme).filterButtonDropdown}>
                <View>
                  <Text style={{ color: 'white', fontFamily: 'Montserrat_Bold', fontSize: 15 }}>Price</Text>
                  {
                    filterPriceConditions.map((option, index) => {
                      const isSelected = selectedPriceOptionIndex === index;
                      return (
                        <CheckBox
                          key={index}
                          isChecked={isSelected}
                          style={styles(theme).dropdownItem}
                          onClick={() => SetSelectedPriceOptionIndex(isSelected ? null : index)}
                          rightTextStyle={styles(theme).dropdownItemText}
                          rightText={option.label}
                          checkBoxColor='white'
                        />
                      );
                    })
                  }
                </View>
                <View>
                  <Text style={{ color: 'white', fontFamily: 'Montserrat_Bold', fontSize: 15, marginTop: 20 }}>Eco Rating</Text>
                  <CheckBox
                    isChecked={ecoRatingFilter}
                    style={styles(theme).dropdownItem}
                    onClick={() => SetEcoRatingFilter(!ecoRatingFilter)}
                    rightTextStyle={styles(theme).dropdownItemText}
                    rightText={"Above 3"}
                    checkBoxColor='white'
                    
                  />
                </View>
              </View>)
          }
        </View>

        <View style={styles(theme).buttonDropdownContainer}>
          <Button mode="contained"
            icon="sort"
            style={styles(theme).sortButton}
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
              <View style={styles(theme).SortrButtonDropdown}>
                <View>
                  {
                    sortOptions.map((option, index) => {
                      const isSelected = selectedSorteOptionIndex === index;
                      return (
                        <CheckBox
                          key={index}
                          isChecked={isSelected}
                          style={styles(theme).dropdownItem}
                          onClick={() => SetSelectedSortOptionIndex(isSelected ? null : index)}
                          rightTextStyle={styles(theme).dropdownItemText}
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
        {searchedHotels.length === 0 ? (
          <Headline style={styles(theme).HotelsText}>Sorry.. But no Hotels were found :( </Headline>
        ) : (
          <FlatList
            data={displayedHotels}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <HotelCard hotel={item} navigation={navigation} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 65}}
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
    ///paddingBottom: 65,
    paddingVertical: 30
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30
  },
  filterButton: {
    backgroundColor: theme.colors.logoBackground,
    borderRadius: 15,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
    height: 40,
    width: 130
  },
  sortButton: {
    backgroundColor: theme.colors.primary,
    borderBottomStartRadius: 0,
    borderTopStartRadius: 0,
    width: 130,
    borderRadius: 10
  },
  HotelsText: {
    textAlign: 'center',
    fontFamily: 'Montserrat_Medium',
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
  dropdownItemText: {
    fontFamily: 'Montserrat_Medium',
    color: 'white'
  },
  dropdownItem: {
    padding: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  ButtonDropdownContainer: {
    position: 'relative'
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

});