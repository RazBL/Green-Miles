import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';
import { Avatar, Button, Card,  } from 'react-native-paper';

const LeftContent = (props) => <Avatar.Icon {...props} icon="arrow-left" />;

export default function Flights() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitle}>Flights Search Results</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button icon="filter" mode="contained" compact={true}>
          Filter
        </Button>
        <Button icon="sort" mode="contained" compact={true}>
          Sort
        </Button>
      </View>

  
      <Card style={styles.card}>
  <Card.Title title="Name Of Flight:" subtitle=" Subtitle Flights :" left={LeftContent} />
  <Card.Content>
    <Card.Cover source={{ uri: 'https://c0.wallpaperflare.com/preview/315/109/163/aircraft-airliner-airplane-airport.jpg' }} />

    <View style={styles.flightDetailsContainer}>
      <Text style={styles.flightTime}>From Place - 16:15</Text>
      <Text style={styles.flightDirection}>Direct Destination 18:20</Text>
    </View>

    <Text style={styles.cardContent}>Eco rating : </Text>
  </Card.Content>
  <Card.Actions>
    <View style={{ width: '100%' }}>
    <Button mode="contained">Select</Button>
    </View>
  </Card.Actions>
</Card>


<Card style={styles.card}>
  <Card.Title title="Name Of Flight:" subtitle=" Subtitle Flights :" left={LeftContent} />
  <Card.Content>
  <Card.Cover source={{ uri: 'https://c0.wallpaperflare.com/preview/896/528/12/a380-aircraft-airline-airliner.jpg' }} />

    <View style={styles.flightDetailsContainer}>
      <Text style={styles.flightTime}>From Place - 16:15</Text>
      <Text style={styles.flightDirection}>Direct Destination 18:20</Text>
    </View>

    <Text style={styles.cardContent}>Eco rating : </Text>
  </Card.Content>
  <Card.Actions>
    <View style={{ width: '100%' }}>
    <Button mode="contained">Select</Button>
    </View>
  </Card.Actions>
</Card>


    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 16,
    color: '#444',
  },
  subTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContentContainer: {
    alignItems: 'center',
    paddingTop: 16,
  },
});

