import { StatusBar, StyleSheet, Text, View, I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import RegisterStepOne from './src/screens/RegisterStepOne';
import Home from './src/screens/Home';
import ForgotPassword from './src/screens/ForgotPassword';
import UsersContextProvider from './src/context/UsersContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Support from './src/screens/Support';


const Stack = createStackNavigator();

export default function App() {
  return (
    <UsersContextProvider>
      <NavigationContainer>
      <SafeAreaProvider style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{headerTransparent: true, headerTitle: '',headerLeft: null }}/>
          <Stack.Screen name="Home" component={Home} options={{headerTransparent: true, headerTitle: '' }}/>
          <Stack.Screen name="Register" component={RegisterStepOne} options={{headerTransparent: true, headerTitle: '', headerLeft: null}}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerTransparent: true, headerTitle: '' ,headerLeft: null}}/>
          <Stack.Screen name="Support" component={Support} options={{headerTransparent: true, headerTitle: '' ,headerLeft: null}}/>
        </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </UsersContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }})