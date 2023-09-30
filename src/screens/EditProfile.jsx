import { View, Text, StyleSheet } from 'react-native'
import { useTheme, TextInput, Button } from 'react-native-paper';
import React, { useState, useEffect, useContext } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
const cc = require('country-city');

//Contexts
import { UsersContext } from '../context/UsersContext';

export default function EditProfile() {

    //Context
    const {countries, currentUser, EditProfile} = useContext(UsersContext)

    const theme = useTheme();
    const [countryPicker, SetCountryPicker] = useState(false);
    const [cityPicker, SetCityPicker] = useState(false);
    const [transformedCountries, SetTransformedCountries] = useState([]);
    const [countryCities, SetCountryCities] = useState([]);
    const [firstNmae, SetFirstName] = useState("");
    const [lastName, SetLastName] = useState("");
    const [email, SetEmail] = useState("");
    const [phoneNumber, SetPhoneNumber] = useState("");
    const [country, SetCountry] = useState("");
    const [city, SetCity] = useState("");
    const [address, SetAddress] = useState("");


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


    const EditProfileHandler = () => {

        let updatedUser = {
            firstNmae: firstNmae,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            country: country,
            city: city,
            address: address
        }

        console.log(updatedUser);


        EditProfile(updatedUser);

    }

    
    
    useEffect(() => {
        TransformCountries();
    }, [])

    useEffect(() => {
        TransformCountries();
    }, [country])


    return (
        <View style={styles(theme).container}>
            <View style={styles(theme).dualInput}>
                <TextInput
                    label="First name"
                    mode="outlined"
                    secureTextEntry={true}
                    style={[styles(theme).textInputHalf]}
                    onChange={(text) => SetFirstName(text)}
                />
                <TextInput
                    label="Last name"
                    mode="outlined"
                    secureTextEntry={true}
                    style={[styles(theme).textInputHalf]} 
                    onChange={(text) => SetLastName(text)}
                    />
                    
            </View>

            <TextInput
                label="Email"
                mode="outlined"
                secureTextEntry={true}
                style={styles(theme).textInput}
                onChange={(text) => SetEmail(text)}

            />

            <TextInput
                label="Phone"
                mode="outlined"
                secureTextEntry={true}
                style={styles(theme).textInput}
                onChange={(text) => SetPhoneNumber(text)}

            />

            <DropDownPicker
                open={countryPicker}
                onOpen={() => SetCountryPicker(true)}
                onClose={() => SetCountryPicker(false)}
                placeholder='Country'
                items={transformedCountries}
                value={country}
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
                secureTextEntry={true}
                style={styles(theme).textInput}
                onChange={(text) => SetAddress(text)}

            />

            <Button
                mode="contained"
                style={styles(theme).button}
                labelStyle={{ fontFamily: 'Montserrat_Bold', color: 'white', fontSize: 15 }}
                onPress={EditProfileHandler}
            >
                Edit Profile
            </Button>

        </View>
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
    }

})