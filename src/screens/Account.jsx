import React, { useState, useEffect, useContext} from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { UsersContext } from '../context/UsersContext';

export default function Account() {

  const { GetUserProfile } = useContext(UsersContext);
  const [user, SetUser] = useState(null); 

  
  const GetUser = async () => {
    let checkUser = await GetUserProfile();
    if (checkUser) {
      SetUser(checkUser);
    } else {
      console.log("not logged in");
    }
  }


  useEffect(() => {
    GetUser();
  }, []);

  return (
    <View>
      {user ? (
        <Text>{user.firstName}</Text>
      ) : (
        <Text>Please log in</Text>
      )}
    </View>
  );
}
