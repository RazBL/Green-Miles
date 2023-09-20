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
                    headerStyle: {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 2,
                        elevation: 5,
                    },
                }}
            />
        </Stack.Navigator>
    );
}