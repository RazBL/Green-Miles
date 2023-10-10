import { Text, StyleSheet } from 'react-native'
import { Card, useTheme } from 'react-native-paper'
import React from 'react'


export default function BookingCard({ item }) {
    const theme = useTheme();
    console.log(item.image);
    return (
        <Card style={styles(theme).cardContainer}>
           <Card.Cover
                 style={styles(theme).imgContainer}
                  source={item.passangers ? require('../images/flight2.jpg') : { uri: item.image }}
            />

            <Card.Content style={{ margin: 10 }}>
                <Text style={styles(theme).headline}>Order Number: <Text style={styles(theme).boldText}>{item._id}</Text></Text>
                <Text style={styles(theme).text}>Status: <Text style={styles(theme).boldText}>{item.bookingStatus}</Text></Text>
                <Text style={styles(theme).text}>Date Booked: <Text style={styles(theme).boldText}>{item.bookingTime.date}</Text></Text>
                <Text style={styles(theme).text}>Time Booked: <Text style={styles(theme).boldText}>{item.bookingTime.time}</Text></Text>
                <Text style={styles(theme).text}>Total Price: <Text style={styles(theme).boldText}>${item.price}</Text></Text>
            </Card.Content>
        </Card>
    )
}

const styles = theme => StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        marginVertical: 15,
    },
    image: {
        height: 100
    },
    headline: {
        fontSize: 15,
        fontFamily: 'Montserrat_Medium'
    },
    text: {
        fontFamily: 'Montserrat_Medium',
        marginTop: 5
    },
    boldText: {
        fontFamily: 'Montserrat_Bold'
    }
})