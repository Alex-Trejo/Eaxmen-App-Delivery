import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';

const InProgressDishCard = ({ dishName, user, quantity }) => {
    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <Text style={styles.dishName}>{dishName}</Text>
                <Text style={styles.user}>{user}</Text>
            </View>
            <Text style={styles.quantity}>{quantity}</Text>
            <View style={styles.icons}>
            <Icon  name='check' size={25} color='black' />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    icons: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: 230,
        marginTop: 30,
        justifyContent: 'space-between',
        
    },
    smallerIcon: {
        width: 30,
        height: 30,
        marginLeft: 10,
      },
    column: {
        flexDirection: 'column',
    },
    container: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        height: 90,
        paddingTop: 20,
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
    dishName: {
        marginLeft: 10,
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
    },
    user: {
        marginLeft: 10,
        color: '#000000',
        fontSize: 15,
    },
    quantity: {
        marginLeft: 30,
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
export default InProgressDishCard;