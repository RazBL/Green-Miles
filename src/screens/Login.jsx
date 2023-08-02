import { KeyboardAvoidingView, ScrollView,Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext, useState, useRef } from 'react';
import { TextInput, Button, Headline } from 'react-native-paper';
import { UsersContext } from '../context/UsersContext';

export default function Login({ navigation }) {
  const { IfUserExists } = useContext(UsersContext);
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const scrollRef = useRef(null);

  const handleInputFocus = () => {
    scrollRef.current.scrollTo({x: 0, y: 180, animated: true});
  };

  const LoginHandler = async () => {
    let user = await IfUserExists(email, password)
    console.log(user.firstName);
  };

  const SignUpBtnHandler = () => {
    navigation.navigate('Register');
  };

  const ForgotPasswordBtnHandler = () => {
    navigation.navigate('ForgotPassword');
  };
  
  const SkipBtnHandler = () => {
    navigation.navigate('Home');
  }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 20}
    style={styles.container} >
      <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow: 1}} ref={scrollRef}>
    <View style={styles.container}>
      <View style={styles.imageFrame}>
          <Image
            source={require('../images/LogoPng.png')}
            style={styles.logo}
          />
      </View>

      <View style={styles.informationBox}>
        <Headline style={styles.headline}>Welcome back!</Headline>
        <TextInput
          label="Email"
          backgroundColor="white"
          style={styles.textInput}
          onChangeText={text => SetEmail(text)}
          keyboardType="email-address"
          onFocus={handleInputFocus}
        />
        <TextInput
          label="Password"
          backgroundColor="white"
          style={styles.textInput}
          onChangeText={text => SetPassword(text)}
          secureTextEntry
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
          onPress={LoginHandler}
        >
          <Text style={{ fontSize: 15, color: 'white' }}>Sign in</Text>
        </Button>
        <View style={styles.linkTextContainer}>
          <TouchableOpacity style={{ padding: 0, margin: 0 }} onPress={ForgotPasswordBtnHandler}>
            <Text style={styles.linkText}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.linkTextContainer}>
          <Text style={{color: 'black', fontSize: 15}}>Don't have an account? </Text>
          <TouchableOpacity style={{ padding: 0, margin: 0 }} onPress={SignUpBtnHandler}>
            <Text style={styles.linkText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.skipPrevBtn} onPress={SkipBtnHandler}>
            <Text style={styles.skipPrevBtnText}>Skip</Text>
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
    fontWeight: 'bold'
  },
  textInput: {
    borderRadius: 5,
    marginBottom: 25,
  },
  loginButton: {
    marginBottom: 25,
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: 'black'
  },
  linkTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  linkText: {
    color: 'blue',
    fontSize:15
},
  skipPrevBtn: {
    position: "absolute",
    bottom: 30,
    left:20
  },
  skipPrevBtnText: {
    color: 'black',
    fontSize: 18,
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
});
