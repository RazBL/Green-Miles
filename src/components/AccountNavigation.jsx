import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Screens
import Account from '../screens/Account';
import Support from '../screens/Support';
import ChangePassword from '../screens/ChangePassword';
import DeleteYourAccount from '../screens/DeleteYourAccount';

export default function AccountNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Account" component={Account} options={{ headerTransparent: true, headerTitle: '', headerLeft: null }} />
            <Stack.Screen name="Support" component={Support} options={{ headerTransparent: true, headerTitle: '', headerLeft: null }} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerTransparent: true, headerTitle: '', headerLeft: null }} />
            <Stack.Screen name="DeleteYourAccount" component={DeleteYourAccount} options={{ headerTransparent: true, headerTitle: '', headerLeft: null }} />
        </Stack.Navigator>
    )
}