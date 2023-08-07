import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

//Screens
import HotelsSearch from "../screens/HotelsSearch";
import HotelDetails from '../screens/HotelDetails'

export default function HotelNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HotelsSearch" component={HotelsSearch} options={{ headerTransparent: true, headerTitle: '', headerLeft: null }} />
            <Stack.Screen name="HotelDetails" component={HotelDetails} options={{
                headerStyle: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 5,
                },
            }} />
        </Stack.Navigator>
    );
}