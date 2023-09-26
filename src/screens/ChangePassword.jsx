import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button, Headline } from 'react-native-paper';

export default function ChangePassword() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={{marginTop: 10}}>
          <View style={styles.inputContainer}>
            <TextInput
              label="Current Password"
              mode="outlined"
              secureTextEntry={true}
              style={styles.textInput}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              label="New Password"
              mode="outlined"
              secureTextEntry={true}
              style={styles.textInput}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              label="Confirm Password"
              mode="outlined"
              secureTextEntry={true}
              style={styles.textInput}
            />
          </View>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={{fontFamily: 'Montserrat_Bold'}}
            onPress={() => console.log('Update Password Button pressed!')}
          >
            Update Password
          </Button>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  inputContainer: {
    marginBottom: 30,
  },
  textInput: {
    backgroundColor: 'white',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#38DDA2',
  },
});
