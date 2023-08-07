import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { base_api } from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './Login';
import { Searchbar } from 'react-native-paper';

function Profile() {
  const [user, setUser] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        let res = await fetch(`${base_api}/users/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });

        if (!res.ok) {
          console.error('Error fetching profile');
          return;
        }

        let data = await res.json();
        setUser(data.fullUser);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <View>
      {user ? (
        <>
          <Text style={{ fontSize: 24 }}>Profile</Text>
          <Text>Name: {user.firstName}</Text>
          <Text>Last Name: {user.lastName}</Text>
          <Text>Email: {user.email}</Text>
        </>
      ) : (
        <Searchbar />
      )}
    </View>
  );
}

export default Profile;
