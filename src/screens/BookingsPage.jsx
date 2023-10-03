import { View, StyleSheet, FlatList } from 'react-native';
import React, { useContext } from 'react';
import { Headline } from 'react-native-paper';

// Component
import BookingCard from '../components/BookingCard';
import { FlightsContext } from '../context/FlightsContext';

export default function BookingsPage() {
    const { flightOrders } = useContext(FlightsContext);

    // Check if flightOrders is defined and has a length of zero
    const isEmpty = !flightOrders || flightOrders.length === 0;

    return (
        <View style={styles.container}>
            {
                isEmpty ? 
                (<Headline>No bookings were made..</Headline>) :
                (
                    <FlatList
                        data={flightOrders.slice(-5).reverse()}
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={({ item }) => <BookingCard item={item} />}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 65 }}
                    />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    }
});
