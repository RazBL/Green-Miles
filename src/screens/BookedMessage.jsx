import { View, Text, StyleSheet } from 'react-native';
import { useTheme, Card, Button } from 'react-native-paper';
import React, { useContext } from 'react';
import { UsersContext } from '../context/UsersContext';
import { FlightsContext } from '../context/FlightsContext';

export default function BookedMessage({navigation}) {
    const theme = useTheme();

    const {currentUser} = useContext(UsersContext);
    const {flightOrders} = useContext(FlightsContext);

    const BtnHandler = () => {
        navigation.navigate("Navigation");
    }

    return (
        <View style={styles(theme).container}>
            <Card style={styles(theme).card}>
                <Card.Content>
                    <Text style={styles(theme).title}>Booking Pending</Text>
                    <Text style={styles(theme).message}>
                        Hello {currentUser.firstName} {currentUser.lastName},
                    </Text>
                    <Text style={styles(theme).message}>
                        Thank you for your booking. Your booking is currently pending and will be confirmed shortly.
                    </Text>
                    <Text style={styles(theme).message}>
                        Booking Reference: <Text style={[styles(theme).message, {fontFamily: 'Montserrat_Bold', color: theme.colors.primary}]}>{flightOrders[flightOrders.length -1]._id}</Text>
                    </Text>
                    <Text style={styles(theme).message}>
                        Once your booking is confirmed, you will receive a confirmation notification.
                    </Text>
                    <Text style={styles(theme).footer}>
                        Safe travels and thank you for choosing <Text style={{color: theme.colors.primary, fontFamily: 'Montserrat_Bold'}}>Green</Text><Text style={{fontFamily: 'Montserrat_Bold'}}> Miles!</Text>
                    </Text>
                </Card.Content>
                <Button
                    style={styles(theme).button}
                    labelStyle={{color: 'white', fontFamily: 'Montserrat_Bold', fontSize: 15}}
                    onPress={BtnHandler}>
                    Back to Home
                </Button>
            </Card>
        </View>
    );
}

const styles = theme => StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    card: {
        padding: 20,
        backgroundColor: theme.colors.logoBackground,

    },
    title: {
        fontSize: 20,
        fontFamily: 'Montserrat_Bold',
        marginBottom: 15,
        color: 'white'
    },
    message: {
        marginBottom: 10,
        fontFamily: 'Montserrat_Medium',
        color: 'white'

    },
    footer: {
        marginTop: 20,
        fontFamily: 'Montserrat_Medium',
        color: 'white'

    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        backgroundColor: '#38DDA2',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        borderRadius: 25
      },
});
