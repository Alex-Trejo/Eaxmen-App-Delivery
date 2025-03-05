import React, { useState } from 'react';
import {host} from '../../Host.js';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function ResetPassword(){
    const [email, setEmail] = useState('');

    const handleResetPassword = async () => {
        try{
            await axios.post(`${host}/api/auth/resetPassword`, {email});
            Alert.alert('Exito, se ha enviado el correo de recuperación');
        }catch(error){
            Alert.alert('Error', error.message);
        }
    };

    return(
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                keyboardType = "email-address"
                placeholder="Correo"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TouchableOpacity styles={styles.button} onPress={handleResetPassword}>
                <Text styles={styles.buttonText}>Recuperar Contraseña</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        width: '80%',
        height: 40,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});