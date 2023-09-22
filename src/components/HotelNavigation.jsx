import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

//Screens
import HotelsSearch from "../screens/HotelsSearch";
import HotelsSearchResults from "../screens/HotelsSearchResults"
import HotelDetails from '../screens/HotelDetails'; // וודא שאתה מייבא את מסך ה-HotelDetails
import HotelCheckOut from '../screens/HotelCheckOut'

// ...


export default function HotelNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HotelsSearch" component={HotelsSearch} options={{ headerTransparent: true, headerTitle: '', headerLeft: null }} />
            <Stack.Screen
                name="Hotel Search Results"
                component={HotelsSearchResults}
                options={{
                    headerTitleAlign: 'center',
                    headerStyle: {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 2,
                        elevation: 5,
                    },
                }}
            />
            <Stack.Screen name="HotelDetails" component={HotelDetails} />
            <Stack.Screen name="HotelCheckOut" component={HotelCheckOut} />

        </Stack.Navigator>


    );
}