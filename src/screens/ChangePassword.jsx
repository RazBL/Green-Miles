import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button, Headline } from 'react-native-paper';

export default function ChangePassword() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Headline style={styles.headline}>Change Password</Headline>

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
          color="#38DDA2"
          onPress={() => console.log('Update Password Button pressed!')}
        >
          Update Password
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  box: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  
  inputContainer: {
    marginBottom: 15,
  },
  textInput: {
    backgroundColor: 'white',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#38DDA2',
  },
});
