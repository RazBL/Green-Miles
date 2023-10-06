import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet, Image, Dimensions, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Appbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigationState } from '@react-navigation/native';
import TabOffsetContext from '../context/TabOffsetContext'

//screens
import Home from './Home';
import Save from './Save';


//Components
import FlightsNavigator from '../components/FlightNavigation';
import HotelNavigation from '../components/HotelNavigation'
import AccountNavigation from '../components/AccountNavigation';

const Tab = createBottomTabNavigator();

export default function Navigation({route}) {

  const navigationState = useNavigationState(state => state.index - 2);

  const tabOffSetValue = useRef(new Animated.Value(0)).current;

  const GetWidth = () => {
    let width = Dimensions.get("window").width;
    return width / 5;
  }

  const barWidth = 50;
  const singleTabWidth = GetWidth();
  const centerOffset = (singleTabWidth - barWidth) / 2;

  const moveToTab = (index) => {
    Animated.spring(tabOffSetValue, {
      toValue: index * singleTabWidth + centerOffset,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    Animated.spring(tabOffSetValue, {
      toValue: navigationState * singleTabWidth + centerOffset,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, []);


  useEffect(() => {
    if(route.params && route.params.fromBookedMessage){
      moveToTab(0);
      route.params.fromBookedMessage = false;
    }
  }, [route]);
  

  return (
    <TabOffsetContext.Provider value={moveToTab}>
      <View style={styles.container}>

        <Appbar style={styles.upperBar}>
          <Image source={require('../images/Logo.png')} resizeMode="contain" style={styles.image} />
        </Appbar>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#1CD995',
            tabBarInactiveTintColor: 'white',
            tabBarStyle: {
              height: 65,
              backgroundColor: '#1e272e',
            },
            tabBarLabelStyle: {
              fontFamily: 'Montserrat_Regular',
            }
          }}
        >
          {[
            { name: "Home", component: Home, icon: "home" },
            { name: "Flights", component: FlightsNavigator, icon: "airplane" },
            { name: "Hotels", component: HotelNavigation, icon: "bed" },
            { name: "Saved", component: Save, icon: "heart" },
            { name: "Accountt", component: AccountNavigation, icon: "account" }
          ].map((item, i) => (
            <Tab.Screen
              key={i}
              name={item.name}
              component={item.component}
              options={{
                tabBarLabel: ({ color }) => (
                  <Text style={{ color: color, marginBottom: 5, fontSize: 12 }}>
                    {item.name}
                  </Text>
                ),
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name={item.icon} style={{ marginTop: 5 }} color={color} size={24} />
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
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#1CD995',
        backgroundColor: '#1CD995',
        position: 'absolute',
        bottom: 65,
        transform: [{ translateX: tabOffSetValue }]
      }}
      >
      </Animated.View>

    </View>
    </TabOffsetContext.Provider >

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
