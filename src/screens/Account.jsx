import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { UsersContext } from '../context/UsersContext';
import { Button, Headline, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { FlightsContext } from '../context/FlightsContext'

export default function Account() {

  const theme = useTheme();
  const { currentUser, RemoveToken } = useContext(UsersContext);
  const {flightOrders, GetAllFlightOrders} = useContext(FlightsContext)
  const navigation = useNavigation();
  const navigateToSupport = () => {
    navigation.navigate('Support');
  };

  const navigateToChangePassword = () => {
    navigation.navigate('Change Password');
  };

  const navigateToDeleteYourAccount = () => {
    navigation.navigate('Delete Your Account');
  };

  const navigateToEditProfilet = () => {
    navigation.navigate('Edit Profile');
  };

  const ToLoginPage = () => {
    navigation.navigate('Login');
  }

  const ToBookingPage = () => {
    navigation.navigate('Booking History');
  }

  const SignOut = () => {
    RemoveToken();
    ToLoginPage();
  }

  useEffect(() => {
      GetAllFlightOrders();
  }, [flightOrders])
  

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).leftColumn}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Headline style={styles(theme).headerText}>Account</Headline>
          <View style={styles(theme).imageContainer}>
            {
              currentUser ? (<Image
                source={require('../images/Account.png')}
                resizeMode="contain"
                style={{ height: '100%', width: '100%' }}
              />) :
                <View></View>
            }
          </View>
        </View>

        {
          currentUser ?
            (
              <View style={{ marginTop: 40 }}>
                <View style={styles(theme).optionBox}>
                  <TouchableOpacity onPress={navigateToEditProfilet}>
                    <View style={styles(theme).optionContainer}>
                      <MaterialCommunityIcons name="account" size={20} color="black" />
                      <Text style={styles(theme).optionText}>Edit Profile</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles(theme).underline}></View>
                </View>

                <View style={styles(theme).optionBox}>
                  <TouchableOpacity onPress={navigateToChangePassword}>
                    <View style={styles(theme).optionContainer}>
                      <MaterialCommunityIcons name="lock" size={20} color="black" />
                      <Text style={styles(theme).optionText}>Change Password</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles(theme).underline}></View>
                </View>


                <View style={styles(theme).optionBox}>
                <TouchableOpacity onPress={ToBookingPage}>
                  <View style={styles(theme).optionContainer}>
                    <MaterialCommunityIcons name="book" size={20} color="black" />
                    <Text style={styles(theme).optionText}>Booking</Text>
                  </View>
                  <View style={styles(theme).underline}></View>
                  </TouchableOpacity>
                </View>


                <View style={styles(theme).optionBox}>
                  <TouchableOpacity onPress={navigateToSupport}>
                    <View style={styles(theme).optionContainer}>
                      <MaterialCommunityIcons name="lifebuoy" size={20} color="black" />
                      <Text style={styles(theme).optionText}>Support</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles(theme).underline}></View>
                </View>

                <View style={styles(theme).optionBox}>
                  <TouchableOpacity onPress={navigateToDeleteYourAccount}>
                    <View style={styles(theme).optionContainer}>
                      <MaterialCommunityIcons name="delete" size={20} color="black" />
                      <Text style={styles(theme).optionText}>Delete Your Account</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles(theme).underline}></View>
                </View>

              </View>


            ) :
            (
              <View style={styles(theme).loginContainer}>
                <Headline style={styles(theme).loginMessage}>
                  You must be logged in to access this page. Please log in and try again.
                </Headline>
              </View>
            )
        }
      </View>

      {
        !currentUser ? (
          <Button
            mode="contained"
            onPress={ToLoginPage}
            style={{ backgroundColor: 'black', position: 'absolute', bottom: 50, left: 20, right: 20, padding: 5 }}
            labelStyle={{ fontFamily: 'Montserrat_Bold' }}> Sign in
          </Button>
        ) :
          (
            <Button
              mode="contained"
              onPress={SignOut}
              style={styles(theme).buttonStyle}
              labelStyle={{ fontFamily: 'Montserrat_Bold', color: 'black' }}>Sign out</Button>
          )
      }
    </View>
  );
}

const styles = theme => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    fontFamily: 'Montserrat_Bold',
  },
  leftColumn: {
    flex: 1,
    marginRight: 15,
  },
  headerText: {
    fontSize: 22,
    fontFamily: 'Montserrat_Bold',
    color: "black",
  },
  userInfo: {
    alignItems: 'center',
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  loginMessage: {
    fontSize: 18,
    marginBottom: 15,
    fontFamily: 'Montserrat_Bold',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  underline: {
    borderBottomWidth: 1, // רוחב הקו
    borderBottomColor: theme.colors.cardBorder, // צבע הקו
    flex: 1, // כדי שיעמוד עד סוף המסך
  },
  optionBox: {
    marginBottom: 30
  },
  optionText: {
    fontFamily: 'Montserrat_Bold',
    fontSize: 15,
    marginLeft: 15
  },
  buttonStyle: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    padding: 5,
    borderRadius: 25,
    borderWidth: 0.8,
    borderColor: 'black',
  },
  imageContainer: {
    width: 50,
    height: 50
  }
});
