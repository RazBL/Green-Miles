import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Card, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlightsContext } from '../context/FlightsContext';
import { UsersContext } from '../context/UsersContext';

export default function FlightCard({ flight, navigation }) {

    const { SaveFlight, CheckIfFlightSaved, RemoveSavedFlight, currentUser } = useContext(UsersContext);
    const { BookFlightPage, passengersContext } = useContext(FlightsContext);
    const [saved, SetSaved] = useState(false);

    const [tooltipVisible, SetTooltipVisible] = useState(false);


    const FlightSaveHandler = () => {
        if (!currentUser) {
            alert("You must login in order to save");
            return;
        }

        let isSaved = currentUser.savedFlights.find(item => item._id == flight._id && item.passengers == passengersContext);

        if (!isSaved) {
            SaveFlight(flight, passengersContext, navigation);
            SetSaved(true)
        }
        else {
            RemoveSavedFlight(flight, passengersContext, navigation);
            SetSaved(false);
        }
    }

    //Saved Button First time viewing page.
    const IsFlightSaved = () => {
        let foundFlight = CheckIfFlightSaved(flight._id);
        if (foundFlight)
            SetSaved(true);
        else
            SetSaved(false);
    }

    const theme = useTheme();

    const CheckOutPageHandler = () => {
        BookFlightPage(navigation, flight);
    }

    useEffect(() => {
        IsFlightSaved();
    }, [currentUser, currentUser.savedFlights]);


    return (
        <Card style={styles(theme).cardContainer}>

            <Card.Content style={styles(theme).topInfoBox}>

                <Card.Content>
                    <Text style={{ fontFamily: 'Montserrat_Bold', fontSize: 15 }}>{flight.flightNumber}</Text>
                    <Text style={{ fontFamily: 'Montserrat_Bold', color: theme.colors.cardBorder, fontSize: 12 }}>{flight.airline}</Text>
                </Card.Content>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'Montserrat_Bold', fontSize: 15 }}>
                        CO₂ Emissions
                        <Text style={{ color: theme.colors.primary }}> {flight.co2}</Text>
                    </Text>
                    <TouchableOpacity onPress={() => SetTooltipVisible(true)} style={{ marginLeft: 5 }}>
                        <MaterialCommunityIcons name="help-circle-outline" size={20} color="black" />
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={tooltipVisible}
                    onRequestClose={() => SetTooltipVisible(false)}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles(theme).modalContainer}>
                            <Text style={{ fontFamily: 'Montserrat_Bold', fontSize: 16, textAlign: 'center' }}>
                                CO₂ Emissions
                            </Text>
                            <Text style={styles(theme).modalText}>
                            CO₂ emissions indicate the carbon dioxide produced during a flight from burning fuel. The value, in tons, helps travelers gauge their flight's environmental impact.
                            </Text>

                            <TouchableOpacity
                                style={styles(theme).closeButton}
                                onPress={() => SetTooltipVisible(false)}
                            >
                                <Text style={styles(theme).closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </Card.Content>

            <View style={styles(theme).horizontalLine} />

            <Card.Content style={styles(theme).midInfoBox}>

                <Card.Content>
                    <Text style={[styles(theme).textSpacing, { fontFamily: 'Montserrat_Bold', color: '#777777', fontSize: 12 }]}>{flight.departure.date}</Text>
                    <Text style={[styles(theme).textSpacing, { fontFamily: 'Montserrat_Bold', fontSize: 15 }]}>{flight.origin.city}</Text>
                    <Text style={[styles(theme).textSpacing, { fontFamily: 'Montserrat_Bold', fontSize: 30 }]}>{flight.origin.airport}</Text>
                    <Text style={[styles(theme).textSpacing, { fontFamily: 'Montserrat_Bold', color: '#49657A', fontSize: 15 }]}>{flight.departure.time}</Text>
                </Card.Content>

                <Card.Content style={{ marginTop: 20 }}>
                    <Image
                        source={require('../images/FlightCardLine.png')}
                    />
                </Card.Content>

                <Card.Content>
                    <Text style={[styles(theme).alignTextRight, styles(theme).textSpacing, { fontFamily: 'Montserrat_Bold', color: '#777777', fontSize: 12 }]}>{flight.arrival.date}</Text>
                    <Text style={[styles(theme).alignTextRight, styles(theme).textSpacing, { fontFamily: 'Montserrat_Bold', fontSize: 15 }]}>{flight.destination.city}</Text>
                    <Text style={[styles(theme).alignTextRight, styles(theme).textSpacing, { fontFamily: 'Montserrat_Bold', fontSize: 30 }]}>{flight.destination.airport}</Text>
                    <Text style={[styles(theme).alignTextRight, styles(theme).textSpacing, { fontFamily: 'Montserrat_Bold', color: '#49657A', fontSize: 15, }]}>{flight.arrival.time}</Text>
                </Card.Content>

            </Card.Content>

            <Card.Content style={styles(theme).infoBoxAction}>

                <Card.Content>
                    <Text style={{ fontSize: 15, fontFamily: 'Montserrat_Medium' }}>${flight.price * passengersContext}</Text>
                </Card.Content>

                <TouchableOpacity style={styles(theme).bookNowBtn} onPress={CheckOutPageHandler}>
                    <Text style={{ fontFamily: 'Montserrat_Bold', color: 'white', fontSize: 15 }}>
                        Book Now
                    </Text>
                </TouchableOpacity>

                <Card.Actions>
                    <TouchableOpacity onPress={FlightSaveHandler}>
                        {
                            saved ?
                                <MaterialCommunityIcons name={'heart'} color={theme.colors.primary} size={30} /> :
                                <MaterialCommunityIcons name={'cards-heart-outline'} color={"black"} size={30} />

                        }
                    </TouchableOpacity>
                </Card.Actions>

            </Card.Content>

        </Card>
    )
}


const styles = theme => StyleSheet.create({
    cardContainer: {
        marginBottom: 30,
        padding: 0,
        margin: 0,
        backgroundColor: 'white',
        borderColor: theme.colors.cardBorder,
        borderWidth: 0.5
    },
    topInfoBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    horizontalLine: {
        borderBottomColor: theme.colors.cardBorder,
        borderBottomWidth: 1,
        marginBottom: 15
    },
    midInfoBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    alignTextRight: {
        textAlign: 'right',
    },
    textSpacing: {
        marginBottom: 5
    },
    infoBoxAction: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bookNowBtn: {
        backgroundColor: theme.colors.primary,
        borderColor: 'transparent',
        width: '50%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    modalContainer: {
        width: 300,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    },
    modalText: {
        fontFamily: 'Montserrat_Medium',
        fontSize: 15,
        textAlign: 'center',
        marginVertical: 20,
    },
    closeButton: {
        backgroundColor: theme.colors.primary,
        borderColor: 'transparent',
        width: '50%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    closeButtonText: {
        fontFamily: 'Montserrat_Bold',
        color: 'white',
        fontSize: 15
    }
});





