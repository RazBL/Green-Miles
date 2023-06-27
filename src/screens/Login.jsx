import {
    View, Text, StyleSheet, TouchableOpacity
} from 'react-native'
import React, { useContext, useState } from 'react'
import { TextInput, Button, Headline } from 'react-native-paper';
import { UsersContext } from '../context/UsersContext';

export default function Login({navigation}) {

    const {IfUserExists} = useContext(UsersContext);

    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');

    const PrevBtnHandler = () => {
        navigation.goBack()
    }

    const LoginHandler = () => {
        if(IfUserExists(email, password)){
            navigation.navigate('Home');
        }
        else{
            alert("User does not exists")
        }
    }

    const ForgotPasswordBtnHandler = () => {
        navigation.navigate('ForgotPassword')
    }

    const SignUpBtnHandler = () => {
        navigation.navigate('Register');
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
                    <Headline style={{ marginBottom: 20 }}>Sign in</Headline>
                    <TextInput
                        label="Email"
                        backgroundColor="white"
                        style={{ marginBottom: 20, height: 50 }}
                        onChangeText={text => SetEmail(text)}
                        keyboardType="email-address"
                    />
                    <TextInput
                        label="Password"
                        backgroundColor="white"
                        style={{ marginBottom: 20, height: 50 }}
                        onChangeText={text => SetPassword(text)}
                        secureTextEntry
                    />
                    <Button
                        buttonColor="black"
                        outlined
                        mode="outlined"
                        contentStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            height: 50,
                        }}
                        textColor="white"
                        style={{ borderRadius: 25, marginBottom: 20 }}
                        onPress={LoginHandler}
                        >
                        <Text style={{ fontSize: 15 }}>Sign in</Text>
                    </Button>
                    <View style={{ flexDirection: 'row', marginBottom: 20}}>
                        <TouchableOpacity onPress={ForgotPasswordBtnHandler}>
                            <Text style={styles.linkText}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line} />
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <Text>Don't have an account? </Text>
                        <TouchableOpacity style={{ padding: 0, margin: 0 }}  onPress={SignUpBtnHandler}>
                            <Text style={styles.linkText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.skipPrevBtn} onPress={PrevBtnHandler}>
                <Text style={styles.skipPrevBtnText}>Prev</Text>
            </TouchableOpacity>
        </View>
    )
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
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#D9D9D9',
        marginBottom: 18
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline'
    }

});