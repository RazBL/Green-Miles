import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Headline, useTheme} from 'react-native-paper';

export default function DeleteAccount() {
  const theme = useTheme();
  return (
    <View style={styles.container}>
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
        labelStyle={{fontFamily: 'Montserrat_Bold', color: 'black', fontSize: 15}}
        onPress={() => console.log('Delete your account Button pressed!')}
      >
        Delete account
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  textContainer: {
    marginBottom: 20,
  },
  text: {
    marginBottom: 10,
    fontFamily: 'Montserrat_Bold', // גופן Montserrat_Bold
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 0.8,
    marginBottom: 25,
    borderRadius: 25,
    borderColor: 'black'
  },
});
