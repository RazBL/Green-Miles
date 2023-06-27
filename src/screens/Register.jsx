import {View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { TextInput, Button, Headline } from 'react-native-paper';
import { UsersContext } from '../context/UsersContext';

export default function Register({ navigation }) {

  const { EmailExists, SetUsers, CheckValidEmail } = useContext(UsersContext);
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');

  const PrevBtnHandler = () => {
    navigation.goBack()
  }

  const SignInBtnHandler = () => {
    navigation.navigate('Login');
  }

  const RegisterHandler = () => {
    if (EmailExists(email)) {
      alert('Email already exist')
    }
    else if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Input is required!');
    }
    else if (!CheckValidEmail(email)) {
      alert('Invalid email')
    }
    else {
      let user = {
        id: 4,
        email: email,
        password: password
      }
      SetUsers((prev) => [...prev, user])
      navigation.navigate('Login')
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.imageFrame}>
          <View style={styles.logo}>
            <Text style={{ fontSize: 22 }}>Logo</Text>
          </View>
        </View>

        <View style={styles.informationBox}>
          <Headline style={{ marginBottom: 20 }}>Sign up</Headline>
          <TextInput
            label="Email"
            backgroundColor="white"
            style={{ marginBottom: 20, height: 50 }}
            onChangeText={text => SetEmail(text)}
            keyboardType="email-address"
          />
          <TextInput
            label="Password"
            backgroundColor="white"
            style={{ marginBottom: 20, height: 50 }}
            onChangeText={text => SetPassword(text)}
            secureTextEntry
          />
          <Button
            buttonColor="white"
            outlined
            mode="outlined"
            contentStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              height: 50,
            }}
            textColor="black"
            style={{ borderRadius: 25, marginBottom: 20 }}
            onPress={RegisterHandler}
          >
            <Text style={{ fontSize: 15 }}>Sign up</Text>
          </Button>
          <View style={styles.line} />
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <Text>Already have an account? </Text>
            <TouchableOpacity style={{ padding: 0, margin: 0 }} onPress={SignInBtnHandler}>
              <Text style={styles.linkText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.skipPrevBtn} onPress={PrevBtnHandler}>
        <Text style={styles.skipPrevBtnText}>Prev</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageFrame: {
    backgroundColor: '#D9D9D9',
    height: 180,
    marginTop: 40,
  },
  logo: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  emailBtn: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  informationBox: {
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
  },
  skipPrevBtn: {
    marginLeft: 20,
    marginBottom: 50,
  },
  skipPrevBtnText: {
    fontSize: 18,
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    marginBottom: 18
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline'
  }
});