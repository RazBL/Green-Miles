import { View, StyleSheet, FlatList } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { Headline } from 'react-native-paper';

// Component
import BookingCard from '../components/BookingCard';
import { FlightsContext } from '../context/FlightsContext';
import {HotelsContext} from '../context/HotelsContext';

export default function BookingsPage() {
    const { flightOrders } = useContext(FlightsContext);
    const { hotelBookings } = useContext(HotelsContext);

    // יצירת מערך שמכיל את ההזמנות משני המקורות
    const allBookings = [...flightOrders, ...hotelBookings];

    // סדרה לפי תאריך ההזמנה
    
    allBookings.sort((a, b) => {
        const dateA = new Date(`${a.bookingTime.date} ${a.bookingTime.time}`);
        const dateB = new Date(`${b.bookingTime.date} ${b.bookingTime.time}`);
        return dateB - dateA;
    });

    
    // הצגת חמש ההזמנות האחרונות
    const displayedBookings = allBookings.slice(0, 5);

    const isEmpty = !displayedBookings || displayedBookings.length === 0;

    return (
        <View style={styles.container}>
            {
                isEmpty ? 
                (<Headline style={{alignSelf: 'center'}}>No booking were made..</Headline>) :
                (
                    <FlatList
                        data={displayedBookings}
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
