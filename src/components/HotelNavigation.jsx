import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

//Screens
import HotelsSearch from "../screens/HotelsSearch";
import HotelsSearchResults from "../screens/HotelsSearchResults"
import HotelDetails from '../screens/HotelDetails'; // וודא שאתה מייבא את מסך ה-HotelDetails
import HotelCheckOut from '../screens/HotelCheckOut'

// ...

import HotelPreviewCard from './HotelPreviewCard';

export default function HotelNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HotelsSearch" component={HotelsSearch} options={{ headerTransparent: true, headerTitle: '', headerLeft: null }} />
            <Stack.Screen
                name="Hotel Search Results"
                component={HotelsSearchResults}
                options={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontFamily: 'Montserrat_Bold',
                        fontSize: 20,
                        elevation: 0
                    },
                }}
            />
            <Stack.Screen name="Hotel" component={HotelDetails}
                options={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontFamily: 'Montserrat_Bold',
                        fontSize: 20,
                        elevation: 0
                    },
                }}
            />
            <Stack.Screen name="HotelCheckOut" component={HotelCheckOut} />

        </Stack.Navigator>


    );
}