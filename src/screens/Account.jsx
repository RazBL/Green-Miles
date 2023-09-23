import React, { useState, useEffect, useContext} from 'react';
import { View, Text } from 'react-native';
import { UsersContext } from '../context/UsersContext';

export default function Account() {

  const { currentUser } = useContext(UsersContext);

  return (
    <View>
      {currentUser ? (
        <Text>{currentUser.lastName}</Text>
      ) : (
        <Text>Please log in</Text>
      )}
    </View>
  );
}
