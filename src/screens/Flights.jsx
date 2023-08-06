import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import React, { useContext } from 'react';
import { Avatar, Button, Headline } from 'react-native-paper';
import { FlightsContext } from '../context/FlightsContext';
import FlightCard from '../components/FlightCard';

const LeftContent = (props) => <Avatar.Icon {...props} icon="arrow-left" />;

export default function Flights() {
  const { flights } = useContext(FlightsContext);

  const renderItem = ({ item }) => <FlightCard flight={item} />;

  return (
    <View style={styles.container}>
      <View>
        <Headline>Flights search result</Headline>
      </View>
      <FlatList
        data={flights}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        extraData={flights}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
