import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet, Image, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Appbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//screens
import Home from './Home';
import Flights from './FlightSearch';
import Hotels from './Hotels';
import Save from './Save';
import Account from './Account';

const Tab = createBottomTabNavigator();

export default function Navigation() {

  const tabOffSetValue = useRef(new Animated.Value(0)).current;

  const GetWidth = () => {
    let width = Dimensions.get("window").width;
    return width / 5;
  }

  const barWidth = 50;
  const singleTabWidth = GetWidth();
  const centerOffset = (singleTabWidth - barWidth) / 2;

  return (

      <View style={styles.container}>

        <Appbar style={styles.upperBar}>
          <Image source={require('../images/LogoPng.png')} resizeMode="contain" style={styles.image} />
        </Appbar>

        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#1CD995',
            tabBarInactiveTintColor: 'white',
            tabBarStyle: {
              height: 60,
              backgroundColor: '#1e272e',
            },
          }}
        >
          {[
            { name: "Home", component: Home, icon: "home" },
            { name: "Flights", component: Flights, icon: "airplane" },
            { name: "Hotels", component: Hotels, icon: "home" },
            { name: "Save", component: Save, icon: "heart" },
            { name: "Account", component: Account, icon: "account" }
          ].map((item, i) => (
            <Tab.Screen
              key={i}
              name={item.name}
              component={item.component}
              options={{
                tabBarLabel: () => null,
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name={item.icon} color={color} size={size} />
                ),
              }}
              listeners={() => ({
                tabPress: e => {
                  Animated.spring(tabOffSetValue, {
                    toValue: i * singleTabWidth + centerOffset,
                    duration: 500,
                    useNativeDriver: true
                  }).start();
                },
              })}
            />
          ))}
        </Tab.Navigator>

        <Animated.View style={{
          width: barWidth,
          height: 2,
          backgroundColor: '#1CD995',
          position: 'absolute',
          bottom: 60,
          transform: [{ translateX: tabOffSetValue }]
        }}
        >
        </Animated.View>

      </View>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  upperBar: {
    backgroundColor: '#1e272e',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  image: {
    width: 70,
  },
});
