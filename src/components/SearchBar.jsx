import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';


export default function SearchBar({ data, placeholder, onSelect, icon }) {
    const [searchQuery, SetSearchQuery] = useState('');
    const [filteredData, SetFilteredData] = useState([]);
    const [searchBarHeight, SetSearchBarHeight] = useState(0);
    const [isFocused, SetIsFocused] = useState(false);
    const searchbarRef = useRef(null);

    const onChangeSearch = query => SetSearchQuery(query);

    const HandleSelectItem = (item) => {
        SetSearchQuery(item);
        onSelect(item);
        SetIsFocused(false);

        if (searchbarRef.current) {
            searchbarRef.current.blur();
        }
    };

    const HandleLayout = event => {
        const { height } = event.nativeEvent.layout;
        SetSearchBarHeight(height);
    };

    useEffect(() => {
        if (isFocused) {
            const results = data.filter(item =>
                item.toLowerCase().includes(searchQuery.toLowerCase())
            );
            SetFilteredData(results);
        } else {
            SetFilteredData([]);
        }
    }, [searchQuery, isFocused]);

    return (  <>
        <Searchbar
          ref={searchbarRef}
          placeholder={placeholder}
          onChangeText={onChangeSearch}
          value={searchQuery}
          icon={icon}
          style={styles.searchBar}
          onLayout={HandleLayout}
          onFocus={() => { SetIsFocused(true); }}
          onBlur={() => { SetIsFocused(false); }}
          autoCompleteType="off"
          importantForAccessibility="no"
          textContentType="none"
          autoCorrect={false}
        />
        {isFocused && filteredData.length > 0 && (
          <View style={[styles.dropdown, { top: searchBarHeight }]}>
            <ScrollView showsVerticalScrollIndicator={true}>
              {filteredData.map((item, index) => (
                <TouchableOpacity style={styles.dropdownItem} key={index} onPress={() => HandleSelectItem(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </>
    );
};
const styles = StyleSheet.create({
    searchBar: {
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 10,
        zIndex: 2,
    },
    dropdown: {
        position: 'absolute',
        backgroundColor: 'white',
        maxHeight: 200,
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 20,
        width: '100%',
        elevation: 20,
        zIndex: 50,
        borderRadius: 10
    },
    dropdownItem: {
        padding: 10,
    }
});