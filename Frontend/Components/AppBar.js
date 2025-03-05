import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
const iconArrow = require('./assets/left-arrow.png');

const AppBar = ({ title }) => {
    return (
        <View style={styles.container}>
            <Image source={iconArrow} style={styles.smallerIcon} />
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    smallerIcon: {
        marginTop: 7,
        width: 15,
        height: 15,

    },
    container: {
        flexDirection: 'row',
        backgroundColor: '#b64107',
        height: 90,
        paddingTop: 40,
        paddingLeft: 20,
        alignItems: 'flex-start',
        elevation: 4, // Elevación para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    title: {
        marginLeft: 10,
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default AppBar;
