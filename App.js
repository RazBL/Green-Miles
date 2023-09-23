import { StatusBar, StyleSheet, Text, View, I18nManager, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

//Contexts
import UsersContextProvider from './src/context/UsersContext';
import HotelsContextProvider from './src/context/HotelsContext';
import FlightsContextProvider from './src/context/FlightsContext';

//Screens
import Login from './src/screens/Login';
import RegisterStepOne from './src/screens/RegisterStepOne';
import Navigation from './src/screens/Navigation';
import ForgotPassword from './src/screens/ForgotPassword';
import Support from './src/screens/Support';
import OnBoarding from './src/screens/OnBoarding';
import FlightCheckout from './src/screens/FlightCheckout';
// SECRET_KEY=1b56e1a1e49c2bc4ab5bbf3b302040628c20c4e9e3cd3cacc263cf7e0163d6089c5d80837e227a3bcf933219bf7a4d9df2ec0965977be3b9d64da72d527adc9b
// SECRET_KEY=1b56e1a1e49c2bc4ab5bbf3b302040628c20c4e9e3cd3cacc263cf7e0163d6089c5d80837e227a3bcf933219bf7a4d9df2ec0965977be3b9d64da72d527adc9b

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1CD995', //Logo green
    actionText: '#007BFF', // a shade of blue
    logoBackground: '#1E272E', //super dark blue
    inputTextColor: '#2B3A4A', // light grey
    cardBorder: '#949494' //light grey 2
    
  },
};

export default function App() {

  const [loaded] = useFonts({
    Montserrat_Regular: require('./assets/fonts/Montserrat-Regular.ttf'),
    Montserrat_Bold: require('./assets/fonts/Montserrat-Bold.ttf'),
    Montserrat_Medium: require('./assets/fonts/Montserrat-Medium.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <FlightsContextProvider>
        <UsersContextProvider>
          <HotelsContextProvider>
          <SafeAreaProvider style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator>
                <Stack.Screen name="OnBoarding" component={OnBoarding} options={{headerTransparent: true, headerTitle: '',headerLeft: null }}/>
                  <Stack.Screen name="Login" component={Login} options={{headerTransparent: true, headerTitle: '',headerLeft: null }}/>
                  <Stack.Screen name="Navigation" component={Navigation} options={{headerTransparent: true, headerTitle: '',headerLeft: null  }}/>
                  <Stack.Screen name="Register" component={RegisterStepOne} options={{headerTransparent: true, headerTitle: '', headerLeft: null}}/>
                  <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerTransparent: true, headerTitle: '' ,headerLeft: null}}/>
                  <Stack.Screen name="Support" component={Support} options={{headerTransparent: true, headerTitle: '' ,headerLeft: null}}/>
                  <Stack.Screen name="Flight Checkout" component={FlightCheckout} options={{headerTitleAlign: 'center'}}/>
                </Stack.Navigator>
            </NavigationContainer>
            </SafeAreaProvider>            
          </HotelsContextProvider>
        </UsersContextProvider>
      </FlightsContextProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }
});
