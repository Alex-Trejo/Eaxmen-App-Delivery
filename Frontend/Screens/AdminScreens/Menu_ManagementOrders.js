import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Linking, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { host } from '../../Host';

const iconArrow = require('../../assets/right-arrow.png');

export default function Menu_ManagementOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showButtons, setShowButtons] = useState(false);
    const [motorizedList, setMotorizedList] = useState([]);
    const [selectedMotorized, setSelectedMotorized] = useState(null);
    const [showModal, setShowModal] = useState(false);



    // Función para obtener todos los pedidos
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${host}/api/orders/orders/all`);
                if (!response.ok) {
                    throw new Error('Error al obtener los pedidos');
                }
                const data = await response.json();
                console.log(data);
    
                // Verificar si los datos están vacíos
                if (Array.isArray(data) && data.length === 0) {
                    Alert.alert('No hay pedidos', 'Actualmente no hay pedidos disponibles.');
                }
    
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        };
    
        fetchOrders();
    }, []);

    


    // Obtener motorizados disponibles
    useEffect(() => {
        const fetchMotorized = async () => {
            try {
                const response = await fetch(`${host}/api/motorized/`);
                if (!response.ok) throw new Error('Error al obtener motorizados');
    
                const data = await response.json();
                console.log("motorizados", data);
                setMotorizedList(data);
            } catch (error) {
                console.error('Error fetching motorized:', error);
            }
        };
    
        fetchMotorized();
    }, []);

    

    // Función para asignar motorizado
    const assignMotorized = async (orderId) => {
        if (!selectedMotorized) {
            Alert.alert('Error', 'Seleccione un motorizado');
            return;
        }

        // Verificar que el estado del pedido sea "En camino"
    const selectedOrderData = orders.find(order => order.id === orderId); // Obtener el pedido correspondiente
    if (selectedOrderData.status !== 'En camino') {
        Alert.alert('Error', 'El pedido debe estar en estado "En camino" para asignar un motorizado');
        return;
    }
    
        console.log("Asignando motorizado con ID:", selectedMotorized, "a pedido ID:", orderId); // Verificar valores
    
        try {
            const response = await fetch(`${host}/api/orders/order/${orderId}/assignMotorized`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: orderId,  // Asegúrate de enviar orderId también
                    motorizedId: selectedMotorized,  // Asegúrate de enviar motorizedId
                }),
            });
    
            const responseBody = await response.json();  // Captura la respuesta JSON
    
            if (!response.ok) {
                throw new Error(`Error al asignar motorizado: ${responseBody.message || 'Desconocido'}`);
            }
    
            Alert.alert('Éxito', 'Motorizado asignado correctamente');
        } catch (error) {
            console.error('Error assigning motorized:', error);
            Alert.alert('Error', `No se pudo asignar el motorizado: ${error.message}`);
        }
    };
    
    
    

    const handleIconClick = (order) => {
        setSelectedOrder(order);
        setShowButtons(!showButtons);
    };

    const handleMotorizedSelect = (motorizedId) => {
        setSelectedMotorized(motorizedId);
        setShowModal(false); // Close modal after selection
    };
    // Función para actualizar el estado de un pedido
    const handleUpdateStatus = async (order) => {
        const newStatus = order.status === 'Recibido' ? 'Preparación' : order.status === 'Preparación' ? 'En camino' : 'Entregado';
        try {
            const response = await fetch(`${host}/api/orders/order/${order.id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Actualizar el estado local
            setOrders(prevOrders =>
                prevOrders.map(o => o.id === order.id ? { ...o, status: newStatus } : o)
            );
        } catch (error) {
            console.error('Error updating order status:', error);
            Alert.alert('Error', 'No se pudo actualizar el estado del pedido.');
        }
    };

    // Función para eliminar un pedido
    const handleDeleteOrder = (order) => {
        Alert.alert(
            "Eliminar pedido",
            "¿Estás seguro de que deseas eliminar este pedido?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Eliminar", onPress: () => deleteOrder(order.id), style: "destructive" }
            ]
        );
    };

    const deleteOrder = async (orderId) => {
        try {
            const response = await fetch(`${host}/api/orders/order/${orderId}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Error eliminando pedido');
            
            setOrders(prevOrders => prevOrders.filter(o => o.id !== orderId));
            setSelectedOrder(null);
            setShowButtons(false);
        } catch (error) {
            console.error('Error deleting order:', error);
            Alert.alert('Error', 'No se pudo eliminar el pedido.');
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
                            onPress={() => handleIconClick(order)}
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

                            {selectedOrder === order && showButtons && (
                                <View style={styles.buttonsContainer}>
                                     <TouchableOpacity
                                        style={[styles.buttonIcon, styles.updateButton]}
                                        onPress={() => handleUpdateStatus(order)}
                                    >
                                        <MaterialIcons name="update" style={styles.icon} size={30} color='#fff' />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.buttonIcon, styles.deleteButton]}
                                        onPress={() => handleDeleteOrder(order)}
                                    >
                                        <MaterialIcons name="delete" style={styles.icon} size={30} color='#fff' />
                                    </TouchableOpacity>

                                    {/* Button to show modal for selecting motorized */}
                                    <TouchableOpacity
                                        style={styles.selectMotorizedButton}
                                        onPress={() => setShowModal(true)}
                                    >
                                        <MaterialIcons name="motorcycle" size={30} color="#fff" />
                                        <Text style={styles.buttonText}>Seleccionar Motorizado</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.assignButton}
                                        onPress={() => assignMotorized(order.id)}
                                    >
                                        <Text style={styles.assignButtonText}>Asignar</Text>
                                    </TouchableOpacity>

                                    

                    
                                    
                                    
                                    

                                </View>
                            )}

                            
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
             {/* Modal for motorized selection */}
             <Modal
    visible={showModal}
    animationType="slide"
    transparent={true}
    onRequestClose={() => setShowModal(false)}
>
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar Motorizado</Text>
            {/* Verifica que los datos estén correctamente */}
            {motorizedList && motorizedList.length === 0 ? (
                <Text>No hay motorizados disponibles</Text>
            ) : (
                motorizedList.map((motorized) => {
                    // Sanitizar los datos
                    const username = motorized.username.trim(); // Elimina posibles espacios extra
                    const id = motorized.id.trim(); // Elimina posibles espacios extra

                    return (
                        <TouchableOpacity
                            key={id}
                            style={styles.modalItem}
                            onPress={() => handleMotorizedSelect(id)}
                        >
                            <Text style={styles.modalItemText}>{username}</Text>
                        </TouchableOpacity>
                    );
                })
            )}
            <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setShowModal(false)}
            >
                <Text style={styles.closeModalText}>Cerrar</Text>
            </TouchableOpacity>
        </View>
    </View>
</Modal>


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
        flexDirection: 'column',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        marginTop: 25,
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
    orderDetailContainer: {
        marginBottom: 15,
    },
    itemMenu: {
        fontSize: 16,
        color: '#555',
        marginBottom: 8,
    },
    facturaDetails: {
        marginTop: 5,
        paddingLeft: 10, // Añadimos un poco de margen a la izquierda para que los datos se vean bien alineados
        paddingVertical: 5, // Añadimos un poco de padding vertical para separar los datos de la factura
        paddingBottom: 5, // Añadimos un poco de padding en la parte inferior para separar los datos de la factura
    },
    facturaItem: {
        fontSize: 16,
        color: '#555', // Color más suave para el texto de los detalles
        marginBottom: 5,
    },
    itemMenuStatus: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#e74c3c',
        marginBottom: 8,
    },
    boldText: {
        fontWeight: 'bold',
    },
    boldTextFactura: {
        fontWeight: 'bold',
        color: '#333',
        paddingVertical: -35, // Añadimos un poco de padding vertical para separar los datos de la factura

    },
    boldTextEstado: {
        fontWeight: 'bold',
        color: '#e74c3c',
    },
    linkText: {
        color: '#3498db',
        textDecorationLine: 'underline',
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginVertical: 8,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    buttonIcon: {
        padding: 10,
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectMotorizedButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    assignButton: {
        backgroundColor: '#2ecc71',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    assignButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalItem: {
        padding: 10,
        backgroundColor: '#f2f2f2',
        marginBottom: 10,
        borderRadius: 5,
    },
    modalItemText: {
        fontSize: 16,
    },
    closeModalButton: {
        backgroundColor: '#e74c3c',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    closeModalText: {
        color: '#fff',
        textAlign: 'center',
    },
    updateButton: {
        backgroundColor: '#2ecc71',
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
    },
    icon: {
        fontSize: 24,
        color: '#fff',
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#888',
    },
    additionalInfo: {
        fontSize: 16,
        color: '#333',
        fontStyle: 'italic',
        marginTop: -25,
        textAlign: 'center',
    },
});
