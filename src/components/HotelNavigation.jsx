import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

//Screens
import HotelsSearch from "../screens/HotelsSearch";
import HotelDetails from '../screens/HotelDetails'

export default function HotelNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Hotels" component={HotelsSearch} options={{ headerTransparent: true, headerTitle: '', headerLeft: null }} />
            <Stack.Screen name="HotelDetails" component={HotelDetails}options={{headerTitleAlign: 'center'}}/>
        </Stack.Navigator>
    );
}