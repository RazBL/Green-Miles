import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { TextInput, Button, Headline } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CameraComponent from '../components/CameraComponent';
export default function OpeningScreen({ navigation }) {

    const EmailBtnHandler = () => {
        navigation.navigate('Login');
    }

    const SkipBtnHandler = () => {
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.imageFrame}>
                    <View style={styles.logo}>
                        <Text style={{ fontSize: 22 }}>Logo</Text>
                    </View>
                </View>

                <View style={styles.informationBox}>
                    <Headline style={{ marginBottom: 18 }}>Some Text</Headline>
                    <Button
                        icon="email"
                        buttonColor="white"
                        outlined
                        mode="outlined"
                        contentStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            height: 50,
                        }}
                        textColor="black"
                        onPress={EmailBtnHandler}
                        style={{ borderRadius: 25 }}
                    >
                        <Text style={{ fontSize: 15 }}>Continue with email</Text>
                    </Button>
                </View>
            </View>
        
            
            <TouchableOpacity style={styles.skipPrevBtn} onPress={SkipBtnHandler}>
                <Text style={styles.skipPrevBtnText}>Skip</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    imageFrame: {
        backgroundColor: '#D9D9D9',
        height: 180,
        marginTop: 40,
    },
    logo: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    emailBtn: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
    },
    informationBox: {
        marginTop: 50,
        marginLeft: 20,
        marginRight: 20,
    },
    skipPrevBtn: {
        marginLeft: 20,
        marginBottom: 50,
    },
    skipPrevBtnText: {
        fontSize: 18,
        textDecorationLine: 'underline',
        fontWeight: 'bold'
    },
});
