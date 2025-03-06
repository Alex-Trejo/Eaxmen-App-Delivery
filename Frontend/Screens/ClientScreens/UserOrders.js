import React, { useEffect, useState } from 'react';
import { 
    StatusBar, 
    StyleSheet, 
    Text, 
    View, 
    ScrollView, 
    Alert, 
    TouchableOpacity, 
    Linking 
} from 'react-native';
import { host } from '../../Host'; // Asegúrate de tener tu host configurado
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const userId = await AsyncStorage.getItem("userId");
            if (!userId) {
                Alert.alert("Error", "No hay usuario autenticado. Inicia sesión antes de hacer un pedido.");
                return;
            }

            try {
                const response = await fetch(`${host}/api/orders/orders?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los pedidos');
                }
                const data = await response.json();
                console.log(data);

                if (Array.isArray(data) && data.length === 0) {
                    Alert.alert('No hay pedidos', 'Aún no tienes pedidos realizados.');
                }

                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
                Alert.alert('Error', 'No se pudo cargar la información de los pedidos.');
            }
        };

        fetchOrders();
    }, []);

    const handleOrderClick = (order) => {
        if (order.status === "En camino") {
            const encodedAddress = encodeURIComponent(order.direccion);
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
            Linking.openURL(mapsUrl);
        } else if (order.status === "Entregado") {
            Alert.alert("Información", "El pedido ya fue entregado.");
        } else {
            Alert.alert("Información", "El pedido aún no está en camino.");
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.containerBody}>
                {loading ? (
                    <Text style={styles.loadingText}>Cargando pedidos...</Text>
                ) : (
                    orders.map((order, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.containerOrder}
                            onPress={() => handleOrderClick(order)}
                        >
                            <Text style={styles.titleTextMenu}>Pedido ID: {order.id}</Text>

                            <View style={styles.orderDetailContainer}>
                                 <Text style={styles.itemMenu}>
                                                                    <Text style={styles.boldText}>Nombre:</Text> {order.nombre} {order.apellido}
                                                                </Text>
                                                                <View style={styles.separator} />
                                                                <Text style={styles.itemMenu}>
                                                                    <Text style={styles.boldText}>Dirección:</Text>
                                                                    <TouchableOpacity onPress={() => Linking.openURL(order.direccion)}>
                                                                        <Text style={styles.linkText}>Ver en mapa</Text>
                                                                    </TouchableOpacity>
                                                                </Text>
                                                                <View style={styles.separator} />
                                                                <Text style={styles.itemMenuStatus}>
                                                                    <Text style={styles.boldTextEstado}>Estado:</Text> {order.status}
                                                                </Text>
                                                                <View style={styles.separator} />
                                                                <Text style={styles.itemMenu}>
                                                                    <Text style={styles.boldText}>Forma de pago:</Text> {order.formaPago}
                                                                </Text>
                                                                <View style={styles.separator} />
                                                                <Text style={styles.itemMenu}>
                                                                    <Text style={styles.boldTextFactura}>Factura:</Text>
                                                                    {typeof order.factura === 'string' ? (
                                                                        <Text>{order.factura}</Text>
                                                                    ) : (
                                                                        <View style={styles.facturaDetails}>
                                                                            <Text style={styles.facturaItem}><Text style={styles.boldText}>Cédula/RUC:</Text> {order.factura.cedulaRuc}</Text>
                                                                            <Text style={styles.facturaItem}><Text style={styles.boldText}>Correo:</Text> {order.factura.correo}</Text>
                                                                            <Text style={styles.facturaItem}><Text style={styles.boldText}>Dirección:</Text> {order.factura.direccion}</Text>
                                                                            <Text style={styles.facturaItem}><Text style={styles.boldText}>Celular:</Text> {order.factura.numeroCelular}</Text>
                                                                        </View>
                                                                    )}
                                                                </Text>
                                
                                
                                                                <View style={styles.separator} />
                                                                <Text style={styles.itemMenu}>
                                                                    <Text style={styles.boldText}>Comentario:</Text> {order.comentario}
                                                                </Text>
                                                                <Text style={styles.itemMenu}>
                                                                    <Text style={styles.boldText}>Precio:</Text> ${order.precio}
                                                                </Text>
                                                                <Text style={styles.itemMenu}>
                                                                    <Text style={styles.boldText}>Cantidad:</Text> {order.cantidad}
                                                                </Text>
                                                                <Text style={styles.itemMenu}>
                                                                    <Text style={styles.boldText}>Vuelto:</Text> ${order.vuelto}
                                                                </Text>
                                                                <Text style={styles.itemMenu}>
                                                                    <Text style={styles.boldText}>Pago realizado con:</Text> {order.billetePago}
                                                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    containerBody: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    containerOrder: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    titleTextMenu: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    itemMenu: {
        fontSize: 16,
        color: '#555',
        marginBottom: 8,
    },
    itemMenuStatus: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    boldText: {
        fontWeight: 'bold',
    },
    separator: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 10,
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#888',
    },
});

