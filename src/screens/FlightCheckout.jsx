import { View, Text, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useContext } from 'react'
import { Card, useTheme, Headline, TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//Contexts
import { FlightsContext } from '../context/FlightsContext';
import { UsersContext } from '../context/UsersContext';


export default function FlightCheckout({ passangers, flight, navigation }) {

    const { currentUser } = useContext(UsersContext);
    const { FlightBooking, passangersContext} = useContext(FlightsContext);
    const [email, SetEmail] = useState("");
    const [country, SetCountry] = useState("");
    const [city, SetCity] = useState("");
    const [Address, SetAddress] = useState("");
    const [cardNumber, SetCardNumber] = useState("");
    const [expirationDate, SetExpirationDate] = useState(Date);
    const [cvv, SetCvv] = useState("");
    const [cardOwner, SetCardOwner] = useState("");
    const theme = useTheme();

    const CheckoutHandler = () => {
        let currentDate = new Date().toLocaleDateString();
        let currentTime = new Date().toLocaleTimeString();

        FlightBooking(currentUser, currentTime, currentDate, flight)
    }

    const ValidINput = () => {

    }

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

                        <Headline style={[styles(theme).cardTitle, { marginTop: 5 }]}>Airline <Headline style={[styles(theme).cardTitle, styles(theme).montserratBold]} >Atlanta</Headline></Headline>
                        <Headline style={styles(theme).cardTitle}>Flight Number <Headline style={[styles(theme).cardTitle, styles(theme).montserratBold]} >A123</Headline></Headline>

                        <Card.Content style={styles(theme).cardContentInfo}>

                            <View >
                                <Text style={styles(theme).text}>Location <Text style={styles(theme).montserratBold}>Paris</Text></Text>
                                <Text style={[styles(theme).montserratBold, styles(theme).text]}>Departure</Text>
                                <Text style={styles(theme).text}>12-05-2023</Text>
                                <Text style={styles(theme).text}>10:30</Text>
                                <Text style={styles(theme).text}>Passangers <Text style={styles(theme).montserratBold}>2</Text></Text>
                            </View>

                            <View>
                                <Text style={[styles(theme).alignTextRight, styles(theme).text]}>Destination <Text style={styles(theme).montserratBold}>Atlanta</Text></Text>
                                <Text style={[styles(theme).alignTextRight, styles(theme).montserratBold, styles(theme).text]}>Arrival</Text>
                                <Text style={[styles(theme).alignTextRight, styles(theme).text]}>12-05-2023</Text>
                                <Text style={[styles(theme).alignTextRight, styles(theme).text]}>20:00</Text>
                                <Text style={[styles(theme).alignTextRight, styles(theme).text]}>Total price <Text style={styles(theme).montserratBold}>$420</Text></Text>
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
                        <View style={styles(theme).dualInput}>
                            <TextInput
                                label="Country"
                                mode='outlined'
                                style={[styles(theme).textInputHalf]}
                                onChangeText={text => SetCountry(text)}
                            />
                            <TextInput
                                label="City"
                                mode='outlined'
                                style={[styles(theme).textInputHalf, styles(theme).textInputRight]}
                                onChangeText={text => SetCity(text)}
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
                                onChangeText={text => SetExpirationDate(text)}
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
        marginTop: 20
    },
    textInput: {
        marginTop: 20,
        backgroundColor: 'white'
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
