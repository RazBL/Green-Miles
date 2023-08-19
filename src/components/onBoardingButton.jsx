import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

export default function OnboardingButton({ isLast, onPress }) {
    const backgroundColor = isLast ? '#1CD995' : 'white';
    const borderColor = isLast ? 'transparent' : '#1CD995';
    const textColor = isLast ? 'white' : '#1CD995';
    const buttonText = isLast ? 'Get Started' : 'Continue';
    
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor, borderColor }]}
            onPress={onPress}
        >
            <Text style={{ color: textColor, fontFamily: 'Montserrat_Bold', fontSize: 18 }}>{buttonText}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: width - 40,  
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        marginTop: -50,
    },
});
