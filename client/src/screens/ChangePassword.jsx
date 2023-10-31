import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button, Headline } from 'react-native-paper';
import { UsersContext } from '../context/UsersContext';


export default function ChangePassword({navigation}) {
  const [currentPassword, SetCurrentPassword] = useState("");
  const [newPassword, SetnewPassword] = useState("");
  const [confirmPassword, SetconfirmPassword] = useState("");
  const { ChangeUserPassword } = useContext(UsersContext);

  const handleUpdatePassword = async () => {
    if (InputHandler()) {
      const changed = await ChangeUserPassword(currentPassword, newPassword);
      
      if (changed){
        alert("The Passwords has been changed!");
        navigation.navigate("Account");
      }
      else{
        alert("Current password is incorrect")
      }
    }
  };


  const InputHandler = () => {
    let valid = true;


    if (currentPassword == "" || newPassword == "" || confirmPassword == "") {
      valid = false;
      alert("Please don't leave any of the input fields empty");
    }
    else if (newPassword != confirmPassword) {
      valid = false;
      alert("passwords are not the same.")
    }
    else if (!(/^(?=.*[A-Z])(?=.*[!@#$%^&*]).+$/.test(newPassword))) {
      alert("Ensure your password has one capital letter and one unique symbol");
      valid = false;
    }
    else if(newPassword.length < 7){
      alert("Password length has to contain 7 letters or more.");
      valid = false;
    }

    return valid;
  }


  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={{ marginTop: 10 }}>
          <View style={styles.inputContainer}>
            <TextInput
              label="Current Password"
              mode="outlined"
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={(text) => SetCurrentPassword(text)}

            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              label="New Password"
              mode="outlined"
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={(text) => SetnewPassword(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              label="Confirm Password"
              mode="outlined"
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={(text) => SetconfirmPassword(text)}
            />
          </View>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={{ fontFamily: 'Montserrat_Bold', color: 'white', fontSize: 15 }}
            onPress={handleUpdatePassword}
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
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 25
  },
});