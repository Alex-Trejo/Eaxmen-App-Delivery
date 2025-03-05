import React from 'react';
import { StyleSheet, View, Button, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const AppNavigator = ({ }) => {

    const navigation = useNavigation();

    return (

        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}>
                <View style={styles.categories}>
                    {/* <Text style={styles.item}>Especialidades</Text>
                <Text style={styles.item}>Combos</Text>
                <Text style={styles.item}>Bebidas</Text>
                <Text style={styles.item}>Fast Food</Text>
                <Text style={styles.item}>Porciones</Text> */}
                    <Button
                        title='HomePage'
                        onPress={() => {
                            console.log('Se presionó HomePageClient');
                            navigation.navigate('HomePageClient');
                        }}


                    />
                    <Button
                        title='Inicio Sesión'
                        onPress={() => {
                            console.log('Se presionó Inicio de sesion');
                            navigation.navigate('Login')
                        }}
                    />
					<Button
                        title='Pedidos'
                        onPress={() => {
                            console.log('Se presionó OrdersCard');
                            navigation.navigate('OrdersCard')
                        }
                        }
                    />
                    <Button
                        title='Almuerzos Blanco'
                        onPress={() => {
                            console.log('Se presionó Almuerzosblanco');
                            navigation.navigate('Almuerzosblanco');
                        }}
                    />
                    <Button
                        title='Carrito'
                        onPress={() => {
                            console.log('Se presionó Carrito');
                            navigation.navigate('Cart');
                        }}
                    />
                    <Button
                        title='HomePageAdmin'
                        onPress={() => {
                            console.log('Se presionó HomePageAdmin');
                            navigation.navigate('HomePageAdmin');
                        }}
                    />
                    <Button
                        title='Contact'
                        onPress={() => {
                            console.log('Se presionó Contact');
                            navigation.navigate('Contact');
                        }}
                    />

                    <Button
                    title='UserProfile_Client'
                    onPress={() => {
                        console.log('Se presionó UserProfile_Client');
                        navigation.navigate('UserProfile_Client');
                    }}  
                    />

                    <Button
                        title='UserProfile_Admin'
                        onPress={() => {
                            console.log('Se presionó UserProfile_Admin');
                            navigation.navigate('UserProfile_Admin');
                        }}
                    />

                    <Button
                        title='UserProfile_Motorized'
                        onPress={() => {
                            console.log('Se presionó UserProfile_Motorized');
                            navigation.navigate('UserProfile_Motorized');
                        }}  
                    />

                    <Button
                        title='OrderMotor'
                        onPress={() => {
                            console.log('Se presionó OrderMotor');
                            navigation.navigate('OrderMotor');
                        }}
                    />
                    <Button
                        title='Navegación'
                        onPress={() => {
                            console.log('Se presionó Navegación');
                            navigation.navigate('Location');
                        }}
                    />
                     <Button
                        title='Gestión Usuario'
                        onPress={() => {
                            console.log('Se presionó User Gestion');
                            navigation.navigate('UserGestion');
                        }}
                    />
					<Button
                        title='HomePageDriver'
                        onPress={() => {
                            console.log('Se presionó HomePageDriver');
                            navigation.navigate('HomePageDriver');
                        }}
                    />
                    {/* Agrega más elementos según sea necesario */}
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    categories: {
        padding: 10,
        alignItems: 'flex-start',
        flex: 1,
        flexDirection: 'row',
        padding: 20,
    }
});

export default AppNavigator;