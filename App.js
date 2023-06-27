import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OpeningScreen from './src/screens/OpeningScreen';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import ForgotPassword from './src/screens/ForgotPassword';
import UsersContextProvider from './src/context/UsersContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UsersContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{headerTransparent: true, headerTitle: '',headerLeft: null }}/>
          <Stack.Screen name="Home" component={Home} options={{headerTransparent: true, headerTitle: '' }}/>
          <Stack.Screen name="Register" component={Register} options={{headerTransparent: true, headerTitle: '', headerLeft: null}}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerTransparent: true, headerTitle: '' ,headerLeft: null}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </UsersContextProvider>
  );
}
