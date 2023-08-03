import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, TextInput, Button, Headline } from 'react-native-paper';
<<<<<<< Updated upstream

export default function Support() {
  return (
=======


export default function Support() {
  return (
 
>>>>>>> Stashed changes
    <View style={styles.container}>
      <View style={styles.imageFrame}>
        <Image
          source={require('../images/LogoPng.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.informationBox}>
        <Headline style={styles.headline}>Support</Headline>

<<<<<<< Updated upstream
        <Text style={styles.label}>Name</Text>
=======
        <Text style={[styles.label, { textAlign: 'right' }]}>Name</Text>
>>>>>>> Stashed changes
        <View style={styles.nameContainer}>
          <TextInput
            label="First Name"
            mode="outlined"
            style={styles.nameInput}
          />
          <TextInput
            label="Last Name"
            mode="outlined"
            style={styles.nameInput}
          />
        </View>

<<<<<<< Updated upstream
        <Text style={styles.label}>Email</Text>
=======
        <Text style={[styles.label, { textAlign: 'right' }]}>Email</Text>
>>>>>>> Stashed changes
        <TextInput
          label="Email"
          mode="outlined"
          keyboardType="email-address"
          style={styles.textInput}
<<<<<<< Updated upstream
        />

        <Text style={styles.label}>Additional Details</Text>
        <TextInput
          label="Additional Details"
=======

        />

         <Text style={[styles.label, { textAlign: 'right' }]}>Additional Details</Text>
         <TextInput
          label="Problem description text box"
>>>>>>> Stashed changes
          mode="outlined"
          multiline
          numberOfLines={4}
          style={styles.textInput}
        />

        <Button
          mode="contained"
          style={styles.button}
          onPress={() => console.log('Submit Button pressed!')}
        >
          Submit
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageFrame: {
    height: 160,
    alignItems: 'center',
    backgroundColor: '#1e272e',
    justifyContent: 'center',
  },
  logo: {
    height: 80,
    width: 130,
    alignSelf: 'center',
  },
  informationBox: {
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
  },
  headline: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
    fontSize: 25,
  },
  nameContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  nameInput: {
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
    height: 50,
    borderRadius: 5,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: 'black',
  },
  textInput: {
    borderRadius: 5,
    marginBottom: 25,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#1e272e',
  },
<<<<<<< Updated upstream
});
=======

});
>>>>>>> Stashed changes
