import { KeyboardAvoidingView, ScrollView,Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import { TextInput, Button, Headline } from 'react-native-paper';

export default function ForgotPassword({ navigation }) {
  const [email, SetEmail] = useState('');
  const scrollRef = useRef(null);

  const handleInputFocus = () => {
    scrollRef.current.scrollTo({x: 0, y: 180, animated: true});
  };

  const ResetPasswordHandler = () => {
    // Add your logic for resetting the password
    alert("A reset link has been sent to your email address");
  };

  const PrevBtnHandler = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 20}
    style={styles.container} >
      <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow: 1}} ref={scrollRef}>
        <View style={styles.container}>
          <View style={styles.imageFrame}>
            <Image
              source={require('../images/Logo.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.informationBox}>
            <Headline style={[styles.headline]}>Forgot Password?</Headline>
            <Text style={{ marginBottom: 20, fontSize: 15, fontFamily: 'Montserrat_Medium', textAlign: 'center' }}>
              Enter your user account's verified email address and we will send you a password reset link.
            </Text>
            <TextInput
              label="Email"
              backgroundColor="white"
              style={styles.textInput}
              onChangeText={text => SetEmail(text)}
              keyboardType="email-address"
              onFocus={handleInputFocus}
            />
            <Button
              mode="outlined"
              contentStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
              }}
              style={styles.loginButton}
              onPress={ResetPasswordHandler}
            >
              <Text style={[{ fontSize: 15, color: 'white' }, {fontFamily: 'Montserrat_Medium'}]}>Reset My Password</Text>
            </Button>
          </View>
          <TouchableOpacity style={styles.skipPrevBtn} onPress={PrevBtnHandler}>
            <Text style={[styles.skipPrevBtnText, styles.default]}>Prev</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    paddingTop:50,
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
    fontFamily:"Montserrat_Bold"
  },
  textInput: {
    borderRadius: 5,
    marginBottom: 25,
  },
  loginButton: {
    marginTop:15,
    marginBottom: 25,
    borderRadius: 25,
    backgroundColor: 'black',
    borderColor: 'transparent',
  },
  skipPrevBtn: {
    position: "absolute",
    bottom: 30,
    left:20
  },
  skipPrevBtnText: {
    color: '#007BFF',
    fontSize: 18,
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
});
