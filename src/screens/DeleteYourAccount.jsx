import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Headline } from 'react-native-paper';

export default function DeleteAccount() {
  return (
    <View style={styles.container}>
      <Headline style={styles.title}>Delete Your Account</Headline>

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Are you sure you want to delete your Green Miles account? If you are having problems, please contact our support who can help.
        </Text>

        <Text style={styles.text}>
          Deleting your account will remove access to Green Mile order history, personal information, and more.
        </Text>
      </View>

      <Button
        mode="contained"
        style={styles.button}
        color="white"
        onPress={() => console.log('Delete your account Button pressed!')}
      >
        Delete your account
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Montserrat_Bold', // גופן Montserrat_Bold
    fontSize: 24,
  },
  textContainer: {
    marginBottom: 20,
  },
  text: {
    marginBottom: 10,
    fontFamily: 'Montserrat_Bold', // גופן Montserrat_Bold
  },
  button: {
    width: 349,
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 25,
    borderRadius: 25,
    fontFamily: 'Montserrat_Bold', // גופן Montserrat_Bold
  },
});
