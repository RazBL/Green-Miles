import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

//Screens
import Hotels from "../screens/Hotels";
import HotelDetails from '../screens/HotelDetails'

export default function HotelNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Hotels" component={Hotels} options={{ headerTransparent: true, headerTitle: '', headerLeft: null }} />
            <Stack.Screen name="HotelDetails" component={HotelDetails}options={{headerTitleAlign: 'center'}}/>
        </Stack.Navigator>
    );
}