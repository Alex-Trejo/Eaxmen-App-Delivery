import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons'; 
import { TouchableOpacity, Image } from 'react-native';
import Login from '../Screens/Login.js';
import OrderCard from '../Components/OrdersCard.js';
import HomePageClients from '../Screens/ClientScreens/HomePageClient.js';
import AlmuerzosblancoWidget from '../Screens/ClientScreens/PageLunch.js';
import MetPagoScreen from '../Screens/ClientScreens/MethodOfPayment.js';
import Cart from '../Screens/ClientScreens/Cart.js';
import HomePageAdmin from '../Screens/AdminScreens/HomePageAdmin.js'
import OrderManagment from '../Screens/AdminScreens/OrderManagment.js'
import UserProfile_Client from '../Screens/ClientScreens/UserProfile_Client.js';
import UserProfile_Admin from '../Screens/AdminScreens/UserProfile_Admin.js';
import UserProfile_Motorized from '../Screens/DirverScreens/UserProfle_Motorized.js';
import Contact from '../Screens/ClientScreens/Contact.js'
import OrderMotor from '../Screens/DirverScreens/OrdersMotor.js'
import Location from '../Screens/DirverScreens/Location.js'
import Product_page from '../Screens/ClientScreens/Product_page.js';
import UserGestion from '../Screens/AdminScreens/UsersGestion.js'
import HomePageDriver from '../Screens/DirverScreens/HomePageDriver.js'
import AddRemoveUsers from '../Screens/AdminScreens/AddRemoveUsers.js';
import MenuManagement_Plate from '../Screens/AdminScreens/Menu_managementPlate.js';
import CreateProduct from '../Screens/AdminScreens/CreateProduct.js';
import AddLunchPage from '../Screens/AdminScreens/AddLunchPage.js';
import EditProduct  from '../Screens/AdminScreens/EditProduct.js';
import MenuManagement_Lunch from '../Screens/AdminScreens/Menu_managementLunch.js';

const logo = require('../assets/favicon.png');

const Stack = createStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator>			
            <Stack.Screen
                name='Login'
                component={Login}
                options={{ title: '' }}
			/>
		    <Stack.Screen
                name='HomePageClient'
                component={HomePageClients}
                options={({ navigation }) => ({
                    title: 'Inicio', // Título de la pantalla
                    headerStyle: {
                        backgroundColor: '#B64107', // Color de fondo de la barra de navegación
                        height: 95, // Altura de la barra de navegación
                    },
                    headerTintColor: '#fff', // Color del texto de la barra de navegación
                    headerLeft: () => (
                        <Image source={logo} style={{ marginLeft: 20, width: 50, height: 50, borderRadius: 32, overFlow: 'hidden' }} />
                    ), // Icono de "sabrosura" a la izquierda
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                            <FontAwesome name="shopping-cart" size={24} color="white" style={{ marginRight: 20 }} />
                        </TouchableOpacity>
                    ), // Icono de carrito a la derecha
                })}
            /> 			
        <Stack.Screen
        name='HomePageAdmin'
        component={HomePageAdmin}
        options={{
            title: 'Inicio', // Eliminar el título
            headerStyle: {
                backgroundColor: '#B64107', // Cambiar el color de la barra de navegación
                height: 95, // Ajustar la altura de la barra de navegación
            },
            headerTintColor: '#fff', // Cambiar el color de la flecha de regreso a blanca
        }}
    />
            <Stack.Screen
                name='HomePageDriver'
                component={HomePageDriver}
                options={{
                    title: 'Inicio', // Eliminar el título
                    headerStyle: {
                        backgroundColor: '#B64107', // Cambiar el color de la barra de navegación
                        height: 95, // Ajustar la altura de la barra de navegación
                    },
                    headerTintColor: '#fff', // Cambiar el color de la flecha de regreso a blanca
                }}
            />

            <Stack.Screen
                name='Almuerzosblanco'
                component={AlmuerzosblancoWidget}
                options={{
                    title: '', // Eliminar el título
                    headerStyle: {
                        backgroundColor: '#B64107', // Cambiar el color de la barra de navegación
                        height: 95, // Ajustar la altura de la barra de navegación
                    },
                    headerTintColor: '#fff', // Cambiar el color de la flecha de regreso a blanca
                }}
            />
            <Stack.Screen
                name='MetPagoScreen'
                component={MetPagoScreen}
                options={{
                    title: '', // Eliminar el título
                    headerStyle: {
                        backgroundColor: '#B64107', // Cambiar el color de la barra de navegación
                        height: 95, // Ajustar la altura de la barra de navegación
                    },
                    headerTintColor: '#fff', // Cambiar el color de la flecha de regreso a blanca
                }}
            />

            <Stack.Screen
                name='Cart' // Nombre de la pantalla Cart
                component={Cart} // Componente asociado
                options={{
                    title: 'Carrito', // Título de la pantalla
                    headerStyle: {
                        backgroundColor: '#B64107',
                        height: 95,
                    },
                    headerTintColor: '#fff',
                    headerRight: () => (
                        <FontAwesome name="shopping-cart" size={24} color="white" style={{ marginRight: 20 }} />
                    ), // Agregar el icono de carrito en el lado derecho de la barra de navegación
                }}
            />
            
            <Stack.Screen
                name='OrderManagment'
                component={OrderManagment}
                options={{
                    title: 'Pedidos', // Eliminar el título
                    headerStyle: {
                        backgroundColor: '#B64107', // Cambiar el color de la barra de navegación
                        height: 95, // Ajustar la altura de la barra de navegación
                    },
                    headerTintColor: '#fff', // Cambiar el color de la flecha de regreso a blanca
                }}
            />

            <Stack.Screen
                name='UserProfile_Client' // Nombre de la pantalla UserProfile_Client
                component={UserProfile_Client} // Componente asociado
                options={{
                    title: 'Perfil', // Título de la pantalla
                    headerStyle: { 
                        backgroundColor: '#B64107', 
                        height: 95,
                    },
                    headerTintColor: '#fff',
                    headerRight: () => (
                        <FontAwesome name="user" size={24} color="white" style={{ marginRight: 20 }} />
                    ), 
                }}
            />

            <Stack.Screen
                name='UserProfile_Admin'
                component={UserProfile_Admin}
                options={{
                    title: 'Perfil', // Eliminar el título
                    headerStyle: {
                        backgroundColor: '#B64107', // Cambiar el color de la barra de navegación
                        height: 95, // Ajustar la altura de la barra de navegación
                    },
                    headerTintColor: '#fff', // Cambiar el color de la flecha de regreso a blanca
                }}  
            />

            <Stack.Screen
                name='UserProfile_Motorized'
                component={UserProfile_Motorized}
                options={{
                    title: 'Perfil', // Eliminar el título
                    headerStyle: {
                        backgroundColor: '#B64107', // Cambiar el color de la barra de navegación
                        height: 95, // Ajustar la altura de la barra de navegación
                    },
                    headerTintColor: '#fff', // Cambiar el color de la flecha de regreso a blanca
                }}
            />

            <Stack.Screen
                name='Contact'
                component={Contact}
                options={{
                    title: 'Información', // Eliminar el título
                    headerStyle: {
                        backgroundColor: '#B64107', // Cambiar el color de la barra de navegación
                        height: 95, // Ajustar la altura de la barra de navegación
                    },
                    headerTintColor: '#fff', // Cambiar el color de la flecha de regreso a blanca
                }}
            />
            <Stack.Screen 
                name='OrderMotor'
                component={OrderMotor}
                options={{
                    title: 'Pedidos', // Eliminar el título
                    headerStyle: { 
                        backgroundColor: '#B64107', // Cambiar el color de la barra de navegación
                        height: 95, // Ajustar la altura de la barra de navegación a 95 para que la flecha de regreso sea visible
                    },
                    headerTintColor: '#fff', // Cambiar el color de la flecha de regreso a blanca
                }}
            />

            <Stack.Screen
                name='Location'
                component={Location}
                options={{
                    title: 'Navegación', // Eliminar el título
                    headerStyle: {
                        backgroundColor: '#B64107', // Cambiar el color de la barra de navegación
                        height: 95, // Ajustar la altura de la barra de navegación
                    },
                    headerTintColor: '#fff', // Cambiar el color de la flecha de regreso a blanca
                }}
            />

            <Stack.Screen
                name='Product_page'
                component={Product_page}
                options={({ route }) => ({
                    title: route.params.product.name, // Mostrar el nombre del producto como título
                    headerStyle: {
                        backgroundColor: '#B64107', // Cambiar el color de la barra de navegación
                        height: 95, // Ajustar la altura de la barra de navegación
                    },
                    headerTintColor: '#fff', // Cambiar el color de la flecha de regreso a blanca
                })}
            />

            <Stack.Screen
                name='UserGestion'
                component={UserGestion}
                options={{
                    title: 'UserGestion', // Eliminar el título
                    headerStyle: {
                        backgroundColor: '#B64107', // Cambiar el color de la barra de navegación
                        height: 95, // Ajustar la altura de la barra de navegación
                    },
                    headerTintColor: '#fff', // Cambiar el color de la flecha de regreso a blanca
                }}
            />
             

<Stack.Screen
            name='MenuManagement_Plate'
            component={MenuManagement_Plate}
            options={{
                title: '', // Eliminar el título
                headerStyle: {
                    backgroundColor: '#B64107', // Cambiar el color de la barra de navegación
                    height: 95, // Ajustar la altura de la barra de navegación
                },
                headerTintColor: '#fff', // Cambiar el color de la flecha de regreso a blanca

            }}
            />

<Stack.Screen
            name='CreateProduct'
            component={CreateProduct}
            options={{
                title: 'CreateProduct', // Eliminar el título
                headerStyle: {
                    backgroundColor: '#B64107', // Cambiar el color de la barra de navegación
                    height: 95, // Ajustar la altura de la barra de navegación
                },
                headerTintColor: '#fff', // Cambiar el color de la flecha de regreso a blanca

            }}
            />

<Stack.Screen
            name='AddLunchPage'
            component={AddLunchPage}
            options={{
                title: 'AddLunchPage', // Eliminar el título
                headerStyle: {
                    backgroundColor: '#B64107', // Cambiar el color de la barra de navegación
                    height: 95, // Ajustar la altura de la barra de navegación
                },
                headerTintColor: '#fff', // Cambiar el color de la flecha de regreso a blanca

            }}
            />

<Stack.Screen
            name='EditProduct'
            component={EditProduct}
            options={{
                title: 'EditProduct', // Eliminar el título
                headerStyle: {
                    backgroundColor: '#B64107', // Cambiar el color de la barra de navegación
                    height: 95, // Ajustar la altura de la barra de navegación
                },
                headerTintColor: '#fff', // Cambiar el color de la flecha de regreso a blanca

            }}
            />

            <Stack.Screen
            name='MenuManagement_Lunch'
            component={MenuManagement_Lunch}
            options={{
                title: 'MenuManagement_Lunch', // Eliminar el título
                headerStyle: {
                    backgroundColor: '#B64107', // Cambiar el color de la barra de navegación
                    height: 95, // Ajustar la altura de la barra de navegación
                },
                headerTintColor: '#fff', // Cambiar el color de la flecha de regreso a blanca

            }}
            />

<Stack.Screen
          name="AddRemoveUsers"
          component={AddRemoveUsers}
          options={{
            title: 'Gestión de Usuarios', // Título de la pantalla
            headerStyle: {
              backgroundColor: '#B64107', // Color de fondo de la barra de navegación
              height: 95, // Altura de la barra de navegación
            },
            headerTintColor: '#fff', // Color de la flecha de regreso
          }}
        />
			
        </Stack.Navigator>
    );
}

export default MyStack;