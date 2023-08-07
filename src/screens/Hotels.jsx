import React, { useState, useContext } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { HotelsContext } from '../context/HotelsContext';
import { Button, Searchbar } from 'react-native-paper';
import HotelCard from '../components/HotelCard';

export default function Hotels({ navigation }) {
  const { hotels } = useContext(HotelsContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [minRating, setMinRating] = useState('');
  const [maxRating, setMaxRating] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filteredHotels, setFilteredHotels] = useState(hotels); // רשימת המלונות המסוננת לתצוגה

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    filterHotels(query, minRating, maxRating, sortBy); // סינון המלונות לפי החיפוש הנוכחי עם הסינון הקיים
  };

  const onFilterClicked = () => {
    console.log('Filter clicked');
    setMinRating('4');
    setMaxRating('5');
    setSortBy('');
    filterHotels(searchQuery, '4', '5', ''); // סינון המלונות לפי הסינונים הנוכחיים עם החיפוש הקיים
  };

  const onSortClicked = () => {
    console.log('Sort clicked');
    setSortBy('price_per_night');
    filterHotels(searchQuery, minRating, maxRating, 'price_per_night'); // סינון המלונות לפי הסינונים הנוכחיים עם החיפוש הקיים
  };

  const filterHotels = (search, minRating, maxRating, sortBy) => {
    const filteredHotels = hotels.filter((hotel) => {
      const rating = parseFloat(hotel.eco_rating);
      if (minRating && rating < parseFloat(minRating)) {
        return false;
      }
      if (maxRating && rating > parseFloat(maxRating)) {
        return false;
      }
      if (search && hotel.name.toLowerCase().indexOf(search.toLowerCase()) === -1) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_per_night') {
        return parseFloat(b.price_per_night) - parseFloat(a.price_per_night);
      }
      return 0;
    });

    setFilteredHotels(filteredHotels); // עדכון הרשימה המסוננת
  };


  const onMoreInfoClicked = (hotelData) => {
    navigation.navigate('HotelDetails', { hotelData });
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <View>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchBar}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button mode="contained" icon="filter" onPress={onFilterClicked} style={styles.filterButton} labelStyle={{fontSize:15, fontFamily:'Montserrat_Medium' }}>
            Filter
          </Button>
          <Button mode="contained" icon="sort" onPress={onSortClicked} style={styles.sortButton} labelStyle={{color:'black',fontSize:15, fontFamily:'Montserrat_Medium' }}>
            Sort
          </Button>
        </View>
      </View>

      <ScrollView style={styles.scrollViewStyle}>
        {filteredHotels.map((hotel) => (
          <HotelCard key={hotel._id} hotelData={hotel} onMoreInfoClicked={onMoreInfoClicked} />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'white',
  },
  searchBar: {
    marginRight: 8,
    width: '100%'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15
  },
  filterButton: {
    backgroundColor: '#1e272e',
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
    width:130
  },
  sortButton: {
    backgroundColor: '#1CD995',
    borderBottomStartRadius:0,
    borderTopStartRadius:0,
    width:130
  },
  scrollViewStyle: {
    padding: 20
  }
});

