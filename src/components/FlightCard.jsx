import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, {useContext, useState, useEffect}from 'react'
import { Card, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlightsContext } from '../context/FlightsContext';
import { UsersContext } from '../context/UsersContext';

export default function FlightCard({ flight, navigation }) {

    const { BookFlightPage} = useContext(FlightsContext);
    const { SaveFlight, CheckIfFlightSaved, RemoveSavedFlight} = useContext(UsersContext);
    const [saved, SetSaved] = useState(false);

    const FlightSaveHandler = () => {
        if(!saved){
            SaveFlight(flight, navigation);
            SetSaved(true);
        }
        else{
            RemoveSavedFlight(flight, navigation);
            SetSaved(false);
        }
    }

    const IsFlightSaved = () => {
        let foundFlight = CheckIfFlightSaved(flight._id);
        if(foundFlight != undefined)
            SetSaved(true);
        else
            SetSaved(false);
    }
    
    const theme = useTheme();

    const CheckOutPageHandler = () => {
        BookFlightPage(navigation);
    }

    useEffect(() => {
        IsFlightSaved()
        console.log(saved);
    }, [])
    

    return (
        <Card style={styles(theme).cardContainer}>

            <Card.Content style={styles(theme).topInfoBox}>

                <Card.Content>
                    <Text style={{ fontFamily: 'Montserrat_Bold', fontSize: 15 }}>{flight.flightNumber}</Text>
                    <Text style={{ fontFamily: 'Montserrat_Bold', color: theme.colors.cardBorder, fontSize: 12 }}>{flight.airline}</Text>
                </Card.Content>

                <Card.Content>
                    <Text style={{ fontFamily: 'Montserrat_Bold', fontSize: 15 }}>CO₂ Emissions <Text style={{ color: theme.colors.primary }}>{flight.co2}</Text></Text>
                </Card.Content>

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
                    <Text style={{ fontSize: 15, fontFamily: 'Montserrat_Medium' }}>${flight.price}</Text>
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
                            <MaterialCommunityIcons name={'heart'} color={theme.colors.primary} size={30}/> :
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
        borderBottomWidth: 0.5,
        marginBottom: 15
    },
    midInfoBox: {
        flexDirection: 'row',
        justifyContent: 'right',
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
    }
});





