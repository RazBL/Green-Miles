import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card, Button, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function FlightCard({ flight }) {

    const theme = useTheme();

    return (
        <Card style={styles(theme).cardContainer}>

            <Card.Content style={styles(theme).topInfoBox}>

                <Card.Content>
                    <Text style={{ fontFamily: 'Montserrat_Bold', fontSize: 15 }}>A123</Text>
                    <Text style={{ fontFamily: 'Montserrat_Boldr', color: theme.colors.cardBorder, fontSize: 12 }}>Delta Airlines</Text>
                </Card.Content>

                <Card.Content>
                    <Text style={{ fontFamily: 'Montserrat_Bold', fontSize: 15 }}>CO₂ Emissions <Text style={{ color: theme.colors.primary }}>1.2</Text></Text>
                </Card.Content>

            </Card.Content>

            <View style={styles(theme).horizontalLine} />

            <Card.Content style={styles(theme).midInfoBox}>

                <Card.Content>
                    <Text style={[styles(theme).textSpacing, { fontFamily: 'Montserrat_Bold', color: '#777777', fontSize: 12 }]}>12-05-2023</Text>
                    <Text style={[styles(theme).textSpacing, { fontFamily: 'Montserrat_Bold', fontSize: 15 }]}>Paris</Text>
                    <Text style={[styles(theme).textSpacing, { fontFamily: 'Montserrat_Bold', fontSize: 30 }]}>CDG</Text>
                    <Text style={[styles(theme).textSpacing, { fontFamily: 'Montserrat_Bold', color: '#49657A', fontSize: 15 }]}>10:30</Text>
                </Card.Content>

                <Card.Content style={{ marginTop: 20 }}>
                    <Image
                        source={require('../images/FlightCardLine.png')}
                    />
                </Card.Content>

                <Card.Content>
                    <Text style={[styles(theme).alignTextRight, styles(theme).textSpacing, { fontFamily: 'Montserrat_Bold', color: '#777777', fontSize: 12 }]}>12-05-2023</Text>
                    <Text style={[styles(theme).alignTextRight, styles(theme).textSpacing, { fontFamily: 'Montserrat_Bold', fontSize: 15 }]}>Atlanta</Text>
                    <Text style={[styles(theme).alignTextRight, styles(theme).textSpacing, { fontFamily: 'Montserrat_Bold', fontSize: 30 }]}>ATL</Text>
                    <Text style={[styles(theme).alignTextRight, styles(theme).textSpacing, { fontFamily: 'Montserrat_Bold', color: '#49657A', fontSize: 15, }]}>22:30</Text>
                </Card.Content>

            </Card.Content>

            <Card.Content style={styles(theme).infoBoxAction}>

                <Card.Content>
                    <Text style={{ fontSize: 15, fontFamily: 'Montserrat_Medium' }}>$420</Text>
                </Card.Content>

                <TouchableOpacity style={styles(theme).bookNowBtn}>
                    <Text style={{ fontFamily: 'Montserrat_Bold', color: 'white', fontSize: 15 }}>
                        Book Now
                    </Text>
                </TouchableOpacity>

                <Card.Actions>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name={'cards-heart-outline'} color={"black"} size={30} />
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





