// components/OnBoardingElement.js

import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import { useTheme, Headline } from 'react-native-paper';

export default function OnBoardingElement({ item }) {

    const { width } = useWindowDimensions();
    const theme = useTheme();

    return (
        <View style={[styles(theme).container, { width: width }]}>
            <View style={styles(theme).imageContainer}>
                <Image
                    source={item.image}
                    style={{height: '100%', width: 350}}
                />
            </View>
            <View style={styles(theme).textBox}>
                <Headline style={styles(theme).Header}>
                    {item.titleNormal}
                    <Headline style={[{ color: theme.colors.primary }, styles(theme).Header]}> {item.titleHighlighted}</Headline>
                </Headline>
                <Text style={styles(theme).description}>{item.description}</Text>
            </View>
        </View>
    )
}

const styles = theme => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',  
    alignItems: 'center',     
  },
  imageContainer: {
    height: 340,
    marginBottom: 30,
    backgroundColor: 'black'
  },
  Header: {
    fontFamily: 'Montserrat_Bold',
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
  },
  onBoardingInfoBox: {
    paddingHorizontal: 20,
    alignItems: 'center',  
  },
  description: {
    fontFamily: 'Montserrat_Medium',
    fontSize: 15,
    maxWidth: '80%',
    textAlign: 'center',
    color: '#656565',
    marginTop: 10,   
  },
  textBox: {
    flexDirection: 'column',
    alignItems: 'center',  
},
});