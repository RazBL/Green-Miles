import { SafeAreaView, ScrollView, KeyboardAvoidingView, Image, View, Text, StyleSheet, TouchableOpacity, Alert, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useContext, useState, useRef } from 'react'
import { TextInput, Button, Headline } from 'react-native-paper';
import { UsersContext } from '../context/UsersContext';

export default function RegisterStepOne({ navigation }) {

  const scrollRef = useRef(null);
  const { RegisterUser, EmailExists, CheckValidEmail } = useContext(UsersContext);
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [firstName, SetFirstName] = useState('');
  const [lastName, SetLastName] = useState('');

  const PrevBtnHandler = () => {
    navigation.goBack()
  }

  const SignInBtnHandler = () => {
    navigation.navigate('Login');
  }

  const RegisterHandler = () => {
    if (IsInputValid()) {
      let lowerCaseEmail = email.toLowerCase();

      let user = {
        firstName: firstName,
        lastName: lastName,
        email: lowerCaseEmail,
        password: password
      }

      if (RegisterUser(user)) {
        alert("User was created successfully!");
        navigation.navigate('Login');
      }
      else {
        alert('error');
      }
    }
  }

  const IsInputValid = () => {

    let isValid = true;

    if (!email || !password || !firstName || !lastName) {
      alert('Input is required!');
      isValid = false;

    }
    else if (EmailExists(email)) {
      alert('Email already exist')
      isValid = false;
    }
    else if (!CheckValidEmail(email)) {
      alert('Invalid email');
      isValid = false;
    }
    else if (!(/^(?=.*[A-Z])(?=.*[!@#$%^&*]).+$/.test(password))) {
      alert("Ensure your password has one capital letter and one unique symbol");
      isValid = false;
    }
    return isValid;
  }


  const SkipBtnHandler = () => {
    navigation.navigate('Navigation');
  }

  const HandleInputFocus = () => {
    scrollRef.current.scrollTo({ x: 0, y: 180, animated: true });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={styles.container} >
        <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={{ flexGrow: 1 }} ref={scrollRef}>
          <SafeAreaView style={styles.container}>
            <View style={styles.imageFrame}>
              <Image
                source={require('../images/Logo.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.informationBox}>
              <Headline style={[styles.headline]}>Become a <Text style={{ color: '#1CD995' }}>Green</Text> Miles member today!</Headline>
              <View style={styles.nameContainer}>
                <TextInput
                  label="First Name"
                  backgroundColor="white"
                  style={[styles.nameInput, styles.marginRight]}
                  onChangeText={text => SetFirstName(text)}
                  onFocus={HandleInputFocus}
                />
                <TextInput
                  label="Last Name"
                  backgroundColor="white"
                  style={[styles.nameInput, styles.marginLeft]}
                  onChangeText={text => SetLastName(text)}
                  onFocus={HandleInputFocus}
                />
              </View>
              <TextInput
                label="Email"
                backgroundColor="white"
                style={styles.textInput}
                onChangeText={text => SetEmail(text)}
                keyboardType="email-address"
                onFocus={HandleInputFocus}
              />
              <TextInput
                label="Password"
                backgroundColor="white"
                style={styles.textInput}
                onChangeText={text => SetPassword(text)}
                secureTextEntry
                onFocus={HandleInputFocus}
              />
              <Button
                mode="outlined"
                contentStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 50,
                }}
                style={styles.registerButton}
                onPress={RegisterHandler}
              >
                <Text style={[{ fontSize: 15, color: '#1CD995', fontFamily: 'Montserrat_Bold' }]}>Sign in</Text>
              </Button>
              <View style={styles.linkTextContainer}>
                <Text style={[{ color: 'black', fontSize: 15 }, styles.default]}>Already have an account? </Text>
                <TouchableOpacity onPress={SignInBtnHandler}>
                  <Text style={styles.linkText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.prevBtn} onPress={PrevBtnHandler}>
              <Text style={styles.skipPrevBtnText}>Prev</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.skipBtn} onPress={SkipBtnHandler}>
              <Text style={styles.skipPrevBtnText}>Skip</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  default: {
    fontFamily: 'Montserrat_Medium',
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
    alignSelf: 'center'
  },
  informationBox: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  headline: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Montserrat_Bold',
    fontSize: 25,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  nameInput: {
    height: 50,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  textInput: {
    borderRadius: 5,
    marginBottom: 25,
  },
  registerButton: {
    marginTop: 15,
    marginBottom: 25,
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 50,
    borderColor: '#1CD995'
  },
  linkTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  linkText: {
    color: '#007BFF',
    fontSize: 15,
    fontFamily: "Montserrat_Medium"
  },
  prevBtn: {
    position: "absolute",
    bottom: 30,
    left: 20
  },
  skipBtn: {
    position: "absolute",
    bottom: 30,
    right: 20
  },
  skipPrevBtnText: {
    color: '#007BFF',
    fontSize: 18,
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat_Bold'
  },
});
