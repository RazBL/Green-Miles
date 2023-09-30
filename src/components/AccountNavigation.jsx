import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Screens
import Account from '../screens/Account';
import Support from '../screens/Support';
import ChangePassword from '../screens/ChangePassword';
import DeleteYourAccount from '../screens/DeleteYourAccount';
import EditProfile from '../screens/EditProfile';

export default function AccountNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Account" component={Account} options={{ headerTransparent: true, headerTitle: '', headerLeft: null }} />
            <Stack.Screen name="Support" component={Support} options={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontFamily: 'Montserrat_Bold',
                    fontSize: 20,
                    elevation: 0
                },
            }} />
            <Stack.Screen name="Change Password" component={ChangePassword} options={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontFamily: 'Montserrat_Bold',
                    fontSize: 20,
                    elevation: 0
                },
            }} />
            <Stack.Screen name="Delete Your Account" component={DeleteYourAccount} options={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontFamily: 'Montserrat_Bold',
                    fontSize: 20,
                    elevation: 0
                },
            }} />
            <Stack.Screen name="Edit Profile" component={EditProfile} options={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontFamily: 'Montserrat_Bold',
                    fontSize: 20,
                    elevation: 0
                },
            }} />
        </Stack.Navigator>
    )
}