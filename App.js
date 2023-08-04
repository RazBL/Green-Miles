import { StatusBar, StyleSheet, Text, View, I18nManager, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UsersContextProvider from './src/context/UsersContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import HotelsContextProvider from './src/context/HotelsContext';


//Screens
import Login from './src/screens/Login';
import RegisterStepOne from './src/screens/RegisterStepOne';
import Navigation from './src/screens/Navigation';
import ForgotPassword from './src/screens/ForgotPassword';
import Support from './src/screens/Support';

const Stack = createStackNavigator();

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
      <UsersContextProvider>
        <HotelsContextProvider>
        <NavigationContainer>
          <SafeAreaProvider style={styles.container}>
            <Stack.Navigator>
              <Stack.Screen name="Login" component={Login} options={{headerTransparent: true, headerTitle: '',headerLeft: null }}/>
              <Stack.Screen name="Navigation" component={Navigation} options={{headerTransparent: true, headerTitle: '',headerLeft: null  }}/>
              <Stack.Screen name="Register" component={RegisterStepOne} options={{headerTransparent: true, headerTitle: '', headerLeft: null}}/>
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerTransparent: true, headerTitle: '' ,headerLeft: null}}/>
              <Stack.Screen name="Support" component={Support} options={{headerTransparent: true, headerTitle: '' ,headerLeft: null}}/>
            </Stack.Navigator>
          </SafeAreaProvider>
        </NavigationContainer>
        </HotelsContextProvider>
      </UsersContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }
});
