import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';
import { Avatar, Button, Card, useTheme } from 'react-native-paper';

const LeftContent = (props) => <Avatar.Icon {...props} icon="arrow-left" />;

export default function Hotels() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitle}>Hotels Search Results</Text>
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
        <Card.Title title="Name Of Hotel" subtitle="Card Subtitle" left={LeftContent} />
        <Card.Content>
          <Card.Cover source={{ uri: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' }} />
          <Text style={styles.cardTitle}>Card title </Text>
          <Text style={styles.cardContent}>Card content </Text>
        </Card.Content>
        <Card.Actions>
          <Button>More Info</Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Name Of Hotel 2 " subtitle="Card Subtitle 2 " left={LeftContent} />
        <Card.Content>
          <Card.Cover source={{ uri: 'https://images.unsplash.com/photo-1535827841776-24afc1e255ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80' }} />
          <Text style={styles.cardTitle}>Card title 2 </Text>
          <Text style={styles.cardContent}>Card content 2 </Text>
        </Card.Content>
        <Card.Actions>
          <Button>More Info</Button>
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
});