import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { UsersContext } from '../context/UsersContext';

export default function Support() {

  const {currentUser} = useContext(UsersContext)

  return (
      <View style={styles.container}>
      <View style={styles.informationBox}>
        <View style={styles.nameContainer}>
          <TextInput
            label="First Name"
            mode="outlined"
            style={styles.nameInput}
            value={currentUser.firstName}
          />
          <TextInput
            label="Last Name"
            mode="outlined"
            style={styles.nameInput}
            value={currentUser.lastName}
          />
        </View>
        <TextInput
          label="Email"
          mode="outlined"
          keyboardType="email-address"
          style={styles.textInput}
          value={currentUser.email}
        />

        <TextInput
          label="Additional Details"
          mode="outlined"
          multiline
          numberOfLines={7}
          style={styles.textInput}
        />

        <Button
          mode="contained"
          style={styles.button}
          onPress={() => console.log('Submit Button pressed!')}
          labelStyle={{fontFamily: 'Montserrat_Bold', fontSize: 15}}
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
  logo: 'https://example.com/path/to/your/logo.png', // שנה לכתובת ה-URL של התמונה
  logoImage: {
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
    backgroundColor: 'white'
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: 'black',
  },
  textInput: {
    borderRadius: 5,
    marginBottom: 25,
    backgroundColor: 'white'
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#1CD995',
  },
});