import { KeyboardAvoidingView, ScrollView, Image, View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useContext, useState, useRef, useEffect } from 'react';
import { TextInput, Button, Headline } from 'react-native-paper';
import { UsersContext } from '../context/UsersContext';

export default function Login({ navigation }) {
  const { RemoveToken, Login, EmailExists } = useContext(UsersContext);
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const scrollRef = useRef(null);

  const HandleInputFocus = () => {
    scrollRef.current.scrollTo({ x: 0, y: 180, animated: true });
  };

  const LoginHandler = async () => {

    if (IsInputValid()) {
      let lowerCaseEmail = email.toLowerCase();

      let user = await Login(lowerCaseEmail, password)

      if (user) {

        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          alert("Welcome back " + user.firstName + " :)");
          navigation.reset({
            index: 0,
            routes: [{ name: 'Navigation' }],
          });
        }
      }
      else if (EmailExists(email)) {
        alert("Incorrect Password")
      }
      else {
        alert("User does not exists")
      }
    }
  };


  const IsInputValid = () => {
    let isValid = true;
    if (!password) {
      alert('Please fill the password in.');
      isValid = false;
    }
    if (!email) {
      alert('Please fill the email in');
      isValid = false;
    }

    return isValid;
  }

  const SignUpBtnHandler = () => {
    navigation.navigate('Register');
  };

  const ForgotPasswordBtnHandler = () => {
    navigation.navigate('ForgotPassword');
  };

  const SkipBtnHandler = () => {
    RemoveToken();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Navigation' }],
    });
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={styles.container} >
        <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={{ flexGrow: 1 }} ref={scrollRef}>
          <View style={styles.container}>
            <View style={styles.imageFrame}>
              <Image
                source={require('../images/Logo.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.informationBox}>
              <Headline style={[styles.headline]}>Welcome back!</Headline>
              <TextInput
                label="Email"
                backgroundColor="white"
                style={[styles.textInput]}
                onChangeText={text => { SetEmail(text); }} keyboardType="email-address"
                onFocus={HandleInputFocus}
              />
              <TextInput
                label="Password"
                backgroundColor="white"
                style={[styles.textInput]}
                onChangeText={text => { SetPassword(text); }}
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
                style={styles.loginButton}
                onPress={LoginHandler}
              >
                <Text style={[{ fontSize: 15, color: 'white', fontFamily: 'Montserrat_Bold' }]}>Sign in</Text>
              </Button>
              <View style={styles.linkTextContainer}>
                <TouchableOpacity style={{ padding: 0, margin: 0 }} onPress={ForgotPasswordBtnHandler}>
                  <Text style={[styles.linkText, styles.default]}>Forgot your password?</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.linkTextContainer}>
                <Text style={[{ color: 'black', fontSize: 15 }, styles.default]}>Don't have an account? </Text>
                <TouchableOpacity style={{ padding: 0, margin: 0 }} onPress={SignUpBtnHandler}>
                  <Text style={[styles.default, styles.linkText]}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.skipBtn} onPress={SkipBtnHandler}>
              <Text style={[styles.skipPrevBtnText]}>Skip</Text>
            </TouchableOpacity>
          </View>
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
    fontSize: 25,
    fontFamily: "Montserrat_Bold"
  },
  textInput: {
    borderRadius: 5,
    marginBottom: 30,
  },
  loginButton: {
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 25,
    backgroundColor: '#1CD995',
    borderColor: 'transparent',
  },
  linkTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  linkText: {
    color: '#007BFF',
    fontSize: 15
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
  errorBorder: {
    borderColor: 'red',
    borderWidth: 1,
  },
});