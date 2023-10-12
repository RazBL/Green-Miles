import { View, Text, Animated, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from 'react-native-paper';

import slides from '../data/slides';
import OnBoardingElement from '../components/OnBoardingElement';
import Paginator from '../components/Paginator';
import OnboardingButton from '../components/onBoardingButton';
import TabOffsetContext from '../context/TabOffsetContext'

export default function OnBoarding({ navigation }) {
    const theme = useTheme();
    const width = Dimensions.get('window').width;
    const scrollX = useRef(new Animated.Value(0)).current;
    const slideRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const listener = scrollX.addListener(({ value }) => {
            setCurrentIndex(Math.round(value / width));
        });

        return () => {
            scrollX.removeListener(listener);
        };
    }, []);

    const SkipBtnHandler = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }], 
          });
    }

    const NextOrSkipBtnHandler = () => {
        if (currentIndex < slides.length - 1) {
            slideRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }], 
              });
        }
    };

    return (
        //Make bounce stop working.
        <View style={styles(theme).container}>
            <View style={{ flex: 3 }}>
                <Animated.FlatList
                    data={slides}
                    renderItem={({ item }) => <OnBoardingElement item={item} />}
                    horizontal
                    pagingEnabled
                    bounces={false}
                    //scrollEnabled={false}
                    alwaysBounceHorizontal={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={16}
                    ref={slideRef}
                />
            </View >
            <Paginator data={slides} scrollX={scrollX} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <OnboardingButton
                    isLast={currentIndex === slides.length - 1}
                    onPress={NextOrSkipBtnHandler}
                />
            </View>
            <TouchableOpacity style={styles(theme).skipPrevBtn} onPress={SkipBtnHandler}>
                <Text style={[styles(theme).skipPrevBtnText]}>Skip</Text>
            </TouchableOpacity>
            {currentIndex === 0 ? (
                <View></View>
            ) : (
                <TouchableOpacity style={styles(theme).prevBtn} onPress={() => {setCurrentIndex(0)}}>
                <Text style={[styles(theme).skipPrevBtnText]}>Prev</Text>
            </TouchableOpacity>
            )}
        </View>
    )
}

const styles = theme => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    skipPrevBtnText: {
        color: theme.colors.actionText,
        fontSize: 18,
        textDecorationLine: 'underline',
        fontFamily: 'Montserrat_Bold'
    },
    skipPrevBtn: {
        position: "absolute",
        bottom: 30,
        right: 20
    },
    prevBtn: {
        position: "absolute",
        bottom: 30,
        left: 20
    }
});
