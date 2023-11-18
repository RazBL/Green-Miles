import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, useIsFocused  } from 'react-native'
import { useTheme, TextInput, Button } from 'react-native-paper';
import React, { useState, useEffect, useContext } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
const cc = require('country-city');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


//Contexts
import { UsersContext } from '../context/UsersContext';

export default function EditProfile({ navigation }) {

    //Context
    const { countries, currentUser, EditProfile, CheckValidEmail, EmailExists } = useContext(UsersContext)

    const theme = useTheme();
    const [countryPicker, SetCountryPicker] = useState(false);
    const [cityPicker, SetCityPicker] = useState(false);
    const [transformedCountries, SetTransformedCountries] = useState([]);
    const [countryCities, SetCountryCities] = useState([]);
    const [firstName, SetFirstName] = useState(currentUser.firstName);
    const [lastName, SetLastName] = useState(currentUser.lastName);
    const [email, SetEmail] = useState(currentUser.email);
    const [phoneNumber, SetPhoneNumber] = useState(currentUser.phoneNumber);
    const [country, SetCountry] = useState(currentUser.country || "");
    const [city, SetCity] = useState(currentUser.city || "");
    const [address, SetAddress] = useState(currentUser.address || "");


    const TransformCountries = () => {

        let data = countries.map(country => (
            {
                label: country,
                value: country
            }
        ));

        SetTransformedCountries(data);

        let cities = cc.getCities(country);

        data = cities.map(city => (
            {
                label: city,
                value: city
            }
        ));

        SetCountryCities(data);

    };


    const EditProfileHandler = async() => {
        if (await InputHandler()) {
            let updatedUser = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                country: country,
                city: city,
                address: address
            }

           await EditProfile(updatedUser);

            alert("Account details were changd successfully");

            navigation.navigate("Account")
        }

    }


    const InputHandler = async() => {
        let valid = true;

        if (firstName == "" || lastName == "" || email == "") {
            alert("Please do no leave first name, last name and email input empty.");
            valid = false;
        }
        else if (!CheckValidEmail(email)) {
            alert("Please enter a valid email.");
            valid = false;
        }
        else if (await EmailExists(email) && email != currentUser.email) {
            alert("Email already exists.");
            valid = false;
        }

        return valid;
    }


    useEffect(() => {
        TransformCountries();
    }, [country, currentUser])

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <KeyboardAwareScrollView
                style={styles(theme).container}
                scrollEnabled
                enableOnAndroid={true}
                extraScrollHeight={150}
            >
            
                <View style={styles(theme).dualInput}>
                    <TextInput
                        label="First name"
                        mode="outlined"
                        style={[styles(theme).textInputHalf]}
                        value={firstName}
                        onChangeText={(text) => SetFirstName(text)}
                    />
                    <TextInput
                        label="Last name"
                        mode="outlined"
                        style={[styles(theme).textInputHalf]}
                        value={lastName}
                        onChangeText={(text) => SetLastName(text)}
                    />

                </View>

                <TextInput
                    label="Email"
                    mode="outlined"
                    style={styles(theme).textInput}
                    value={email}
                    onChangeText={(text) => SetEmail(text)}

                />

                <TextInput
                    label="Phone"
                    mode="outlined"
                    style={styles(theme).textInput}
                    value={phoneNumber}
                    onChangeText={(text) => SetPhoneNumber(text)}

                />

                <DropDownPicker
                    open={countryPicker}
                    onOpen={() => SetCountryPicker(true)}
                    onClose={() => SetCountryPicker(false)}
                    placeholder='Country'
                    items={transformedCountries}
                    value={ country}
                    setValue={SetCountry}
                    searchable={true}
                    textStyle={{ fontSize: 15, color: "#2B3A4A", fontFamily: 'Montserrat_Medium' }}
                    style={[styles(theme).textInput, { borderRadius: 5, borderColor: 'grey' }]}
                    listMode="MODAL"
                />
                <DropDownPicker
                    open={cityPicker}
                    onOpen={() => SetCityPicker(true)}
                    onClose={() => SetCityPicker(false)}
                    placeholder='City'
                    items={countryCities}
                    value={city}
                    setValue={SetCity}
                    searchable={true}
                    textStyle={{ fontSize: 15, color: "#2B3A4A", fontFamily: 'Montserrat_Medium' }}
                    style={[styles(theme).textInput, { borderRadius: 5, borderColor: 'grey', marginBottom: -6 }]}
                    listMode="MODAL"
                />

                <TextInput
                    label="Address"
                    mode="outlined"
                    style={styles(theme).textInput}
                    value={address}
                    onChangeText={(text) => SetAddress(text)}

                />

                <Button
                    mode="contained"
                    style={styles(theme).button}
                    labelStyle={{ fontFamily: 'Montserrat_Bold', color: 'white', fontSize: 15 }}
                    onPress={EditProfileHandler}
                >
                    Edit Profile
                </Button>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
    )
}

const styles = theme => StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 20
    },
    button: {
        marginTop: 20,
        backgroundColor: theme.colors.primary,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        borderRadius: 25
    },
    dualInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    textInputHalf: {
        width: '49%',
        backgroundColor: 'white'
    },
    textInput: {
        marginTop: 20,
        backgroundColor: 'white'
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    imagePlaceholderText: {
        color: '#888',
    },

})