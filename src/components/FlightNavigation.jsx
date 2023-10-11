import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

//Screens
import FlightSearch from "../screens/FlightSearch";
import FlightSearchResults from '../screens/FlightSearchResults'

export default function FlightNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="FlightSearch" component={FlightSearch} options={{ headerTransparent: true, headerTitle: '', headerLeft: null }} />
            <Stack.Screen
                name="Flight Search Results"
                component={FlightSearchResults}
                options={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontFamily: 'Montserrat_Bold',
                        fontSize: 20,
                        elevation: 0
                    },
                }}
            />
        </Stack.Navigator>
    );
}