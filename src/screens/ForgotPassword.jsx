import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React, { useContext, useState } from 'react'
import { TextInput, Button, Headline } from 'react-native-paper';
import { UsersContext } from '../context/UsersContext';

export default function ForgotPassword({navigation}) {
  
  const PrevBtnHandler = () => {
    navigation.goBack()
}

const SignInBtnHandler = () => {
  navigation.navigate('Login');
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
                    <Headline style={{ marginBottom: 20 }}>Forgot Password?</Headline>
                    <View>
                        <Text style={{ fontSize: 13, marginBottom: 20 }}>Enter your user account's verified email address and we will send you a password reset link.</Text>
                    </View>
                    <TextInput
                        label="Email"
                        backgroundColor="white"
                        style={{ marginBottom: 20, height: 50 }}
                        keyboardType="email-address"
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
                        >
                        <Text style={{ fontSize: 15 }}>Reset My assword</Text>
                    </Button>
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