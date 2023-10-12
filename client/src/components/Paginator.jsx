import { View, StyleSheet, Animated, Dimensions, useWindowDimensions } from 'react-native';
import React from 'react';

const screenWidth = Dimensions.get('window').width;

export default function Paginator({ data, scrollX }) {
    const { width } = useWindowDimensions();

    return (
        <View style={styles.container}>
            {data.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                const scale = scrollX.interpolate({
                    inputRange: inputRange,
                    outputRange: [1, 1.5, 1],
                    extrapolate: 'clamp',
                });

                const dotOpacity = scrollX.interpolate({
                    inputRange: inputRange,
                    outputRange: [0.5, 1, 0.5],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        style={[styles.dot, { transform: [{ scale: scale }], opacity: dotOpacity }]}
                        key={i.toString()}
                    />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 0,
        paddingBottom:25
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#1CD995',
        marginHorizontal: 8,
    },
});