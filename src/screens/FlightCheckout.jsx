import { View, Text, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback, } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { Card, useTheme, Headline, TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
const cc = require('country-city');

//Contexts
import { FlightsContext } from '../context/FlightsContext';
import { UsersContext } from '../context/UsersContext';

//Componenets

export default function FlightCheckout({ navigation }) {

    const { currentUser, CheckValidEmail, countries, } = useContext(UsersContext);
    const { FlightBooking, passengersContext, FlightToBook, } = useContext(FlightsContext);

    const [email, SetEmail] = useState("");
    const [country, SetCountry] = useState("Israel");
    const [city, SetCity] = useState("");
    const [Address, SetAddress] = useState("");
    const [cardNumber, SetCardNumber] = useState("");
    const [expirationDate, SetExpirationDate] = useState("");
    const [cvv, SetCvv] = useState("");
    const [cardOwner, SetCardOwner] = useState("");
    const [isModalVisible, SetModalVisible] = useState(false);
    const [transformedCountries, SetTransformedCountries] = useState([]);
    const [countryCities, SetCountryCities] = useState([]);
    const [countryPicker, SetCountryPicker] = useState(false);
    const [cityPicker, SetCityPicker] = useState(false);

    const theme = useTheme();

    const CheckoutHandler = () => {
        if (ValidInput()) {
            let now = new Date();

            let year = now.getFullYear();
            let month = String(now.getMonth() + 1).padStart(2, '0');

            let hours = String(now.getHours()).padStart(2, '0');
            let minutes = String(now.getMinutes()).padStart(2, '0');
            let day = String(now.getDate()).padStart(2, '0');

            let localTime = `${hours}:${minutes}`;
            let localDate = `${year}-${month}-${day}`;

            let data = FlightBooking(currentUser, localTime, localDate, FlightToBook);
            alert(data);
        }
    }

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


    const ValidInput = () => {
        let valid = true;

        if (cardOwner === "" || cvv === "" || expirationDate === "/" || Address === "" ||
            country === "" || email === "" || city === "" || cardNumber === "") {
            alert("Please don't leave any input field empty");
            valid = false;

        }
        else if (!CheckValidEmail(email)) {
            valid = false;
            alert("Please enter a valid email.");
        }
        else


            return valid;
    }

    useEffect(() => {
        TransformCountries();
    }, [])

    useEffect(() => {
        TransformCountries();
    }, [country])

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                scrollEnabled
                enableOnAndroid={true}
                extraScrollHeight={200}
            >


                <View style={styles(theme).container}>
                    <Card style={{ backgroundColor: 'white' }}>
                        <Card.Cover style={styles(theme).imgContainer} source={require("../images/FlightSearch.png")} />

                        <Headline style={[styles(theme).cardTitle, { marginTop: 5 }]}>Airline <Headline style={[styles(theme).cardTitle, styles(theme).montserratBold]} >{FlightToBook.airline}</Headline></Headline>
                        <Headline style={styles(theme).cardTitle}>Flight Number <Headline style={[styles(theme).cardTitle, styles(theme).montserratBold]} >{FlightToBook.flightNumber}</Headline></Headline>

                        <Card.Content style={styles(theme).cardContentInfo}>

                            <View >
                                <Text style={styles(theme).text}>Location <Text style={styles(theme).montserratBold}>{FlightToBook.origin.city}</Text></Text>
                                <Text style={[styles(theme).montserratBold, styles(theme).text]}>Departure</Text>
                                <Text style={styles(theme).text}>{FlightToBook.departure.date}</Text>
                                <Text style={styles(theme).text}>{FlightToBook.departure.time}</Text>
                                <Text style={styles(theme).text}>Passengers <Text style={styles(theme).montserratBold}>{passengersContext}</Text></Text>
                            </View>

                            <View>
                                <Text style={[styles(theme).alignTextRight, styles(theme).text]}>Destination <Text style={styles(theme).montserratBold}>{FlightToBook.destination.city}</Text></Text>
                                <Text style={[styles(theme).alignTextRight, styles(theme).montserratBold, styles(theme).text]}>Arrival</Text>
                                <Text style={[styles(theme).alignTextRight, styles(theme).text]}>{FlightToBook.arrival.date}</Text>
                                <Text style={[styles(theme).alignTextRight, styles(theme).text]}>{FlightToBook.arrival.time}</Text>
                                <Text style={[styles(theme).alignTextRight, styles(theme).text]}>Total price <Text style={styles(theme).montserratBold}>{FlightToBook.price}</Text></Text>
                            </View>

                        </Card.Content>
                    </Card>

                    <View style={styles(theme).billingAddress}>
                        <Headline style={styles(theme).headline} >Billing Address</Headline>
                        <TextInput
                            label="Email"
                            mode='outlined'
                            style={[styles(theme).textInput]}
                            onChangeText={text => SetEmail(text)}
                        />
                        <View >
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
                        </View>
                        <TextInput
                            label="Address"
                            mode='outlined'
                            style={[styles(theme).textInput]}
                            onChangeText={text => SetAddress(text)}
                        />
                    </View>

                    <View style={styles(theme).payment}>
                        <Headline style={styles(theme).headline} >Payment Information</Headline>
                        <TextInput
                            label="Credit Card Number"
                            keyboardType="numeric"
                            mode='outlined'
                            style={[styles(theme).textInput]}
                            onChangeText={(text) => {
                                if (/^[0-9]*$/.test(text)) {
                                    SetCardNumber(text);
                                }
                            }}
                            value={cardNumber}
                            maxLength={16}
                        />
                        <View style={styles(theme).dualInput}>
                            <TextInput
                                label="Expiration Date"
                                mode='outlined'
                                style={[styles(theme).textInputHalf]}
                                pointerEvents="none"
                                value={expirationDate}
                            />
                            
                            <TextInput
                                label="CVV"
                                mode='outlined'
                                keyboardType="numeric"
                                style={[styles(theme).textInputHalf, styles(theme).textInputRight]}
                                onChangeText={(text) => {
                                    if (/^[0-9]*$/.test(text)) {
                                        SetCvv(text);
                                    }
                                }}
                                value={cvv}
                                maxLength={3}
                            />
                        </View>
                        <TextInput
                            label="Credit Card Owner Name"
                            mode='outlined'
                            style={[styles(theme).textInput]}
                            onChangeText={text => SetCardOwner((text))}
                        />
                    </View>

                    <TouchableOpacity style={styles(theme).bookingBtn} onPress={CheckoutHandler}>
                        <Text style={styles(theme).btnText}>Confirm Booking</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>

    )
}

const styles = theme => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        paddingBottom: 30
    },
    headline: {
        fontSize: 17,
        fontFamily: 'Montserrat_Bold',
        alignSelf: 'center',
        color: 'black'
    },
    montserratBold: {
        fontFamily: 'Montserrat_Bold'
    },
    cardContent: {
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 0,
        width: '100%'
    },
    imgContainer: {
        height: 125,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    cardTitle: {
        fontSize: 15,
        marginTop: 0,
        marginBottom: 0,
        alignSelf: 'center',
        fontFamily: 'Montserrat_Medium'
    },
    cardContentInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    alignTextRight: {
        textAlign: 'right',
    },
    text: {
        marginBottom: 5,
        fontSize: 13,
        fontFamily: 'Montserrat_Medium'
    },
    billingAddress: {
        marginTop: 40,
    },
    payment: {
        marginTop: 40,
    },
    dualInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    textInput: {
        marginTop: 20,
        backgroundColor: 'white',
    },
    textInputHalf: {
        width: '48%',
        backgroundColor: 'white'
    },
    textInputRight: {
        marginLeft: 20,
        width: '48%',
    },
    bookingBtn: {
        marginTop: 50,
        borderRadius: 25,
        backgroundColor: 'black',
        height: 50,
        justifyContent: 'center'
    },
    btnText: {
        color: 'white',
        alignSelf: 'center',
        fontFamily: 'Montserrat_Bold',
        fontSize: 20
    }
});
