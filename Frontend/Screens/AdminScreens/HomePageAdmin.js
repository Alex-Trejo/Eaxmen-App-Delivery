import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { host } from '../../Host'; // Asegúrate de que la variable host esté definida correctamente en el archivo Host.js

const iconUser = require('../../assets/user.png');
const iconArrow = require('../../assets/right-arrow.png');

const HomePageAdmin = () => {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showButtons, setShowButtons] = useState(false);

    const fetchProducts = async () => {
        try {
            const url = `${host}/api/lunches`;
            console.log('Fetching products from:', url);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchProducts();
        }, [])
    );

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchProducts().then(() => setRefreshing(false));
    }, []);

    const handleIconClick = (product) => {
        setSelectedProduct(product);
        setShowButtons(!showButtons);
    };

    const handleEditClick = (product) => {
        console.log('Edit pressed for:', product.name);
        navigation.navigate('EditProduct', { product });
    };

    const handleCancelClick = async (product) => {
        try {
            const response = await fetch(`${host}/api/lunches/${product.id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
            setProducts(products.filter(p => p.id !== product.id));
            setSelectedProduct(null);
            setShowButtons(false);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleDomainClick = async (product) => {
        try {
            const updatedProduct = { ...product, status: product.status === 'disponible' ? 'no disponible' : 'disponible' };
            const response = await fetch(`${host}/api/lunches/${product.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: updatedProduct.status }),
            });
            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
            setProducts(products.map(p => p.id === product.id ? updatedProduct : p));
        } catch (error) {
            console.error('Error updating product status:', error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Encabezado */}
            <View style={styles.header}>
                <Text style={styles.titleText}>Bienvenido</Text>
                {/*<TouchableOpacity onPress={() => {
                    console.log('User icon clicked');
                    navigation.navigate('UserProfile_Admin');
                }}>
                    <Image source={iconUser} style={styles.icon} />
                </TouchableOpacity>*/}
            </View>

            {/* Contenido */}
            <View style={styles.containerBody}>
                <ScrollView contentContainerStyle={styles.scrollViewContent} refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    {/* Botones */}
                    <View style={styles.buttonContainer}>
                    <ScrollView
                contentContainerStyle={styles.buttonScrollView}
                horizontal
                showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento horizontal
            >

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                console.log('Button pressed Menu');
                                navigation.navigate('MenuManagement_Plate');
                            }}
                        >
                            <Text style={styles.buttonText}>Menú</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                console.log('Button pressed ClientList');
                                navigation.navigate('AddRemoveUsers');
                            }}
                        >
                            <Text style={styles.buttonText}>Gestionar Usuarios</Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                console.log('Button pressed ClientList');
                                navigation.navigate('MenuManagementOrders');
                            }}
                        >
                            <Text style={styles.buttonText}>Gestionar Pedidos</Text>
                        </TouchableOpacity>

                        </ScrollView>



                    </View>

                    {/* Lista de Productos */}
                    <View style={styles.containerListView}>
                        <View style={styles.container20padding}>
                            <Text style={styles.titleTextMenu}>Menú</Text>
                            <Text style={styles.secondaryText}>Elige tu plato deseado</Text>
                        </View>
                        {loading ? (
                            <Text>Loading...</Text>
                        ) : (
                            products.map((product, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.containerProduct}
                                >
                                    <Image source={{ uri: product.image.uri }} style={styles.menuImage} />
                                    <View style={styles.containerProductColumn}>
                                        <Text style={styles.secondaryText}>{product.name}</Text>
                                        <Text style={styles.itemMenu}>{product.description}</Text>
                                        <Text style={styles.itemMenu}>${product.price}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => handleIconClick(product)}
                                    >
                                        <Image source={iconArrow} style={styles.smallerIcon} size={44} />
                                    </TouchableOpacity>
                                    {selectedProduct === product && showButtons && (
                                        <View style={styles.buttonsContainer}>
                                            <TouchableOpacity
                                                style={styles.buttonIcon}
                                                onPress={() => handleEditClick(product)}
                                            >
                                                <MaterialIcons name="edit" style={styles.icon} size={30} color='#57636C' />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.buttonIcon}
                                                onPress={() => handleCancelClick(product)}
                                            >
                                                <MaterialIcons name="cancel" style={styles.icon} size={30} color='#57636C' />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.buttonIcon}
                                                onPress={() => handleDomainClick(product)}
                                            >
                                                <MaterialIcons name="domain-verification" style={styles.icon} size={30} color={product.status === 'disponible' ? '#A1D99B' : 'red'} />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))
                        )}
                    </View>
                </ScrollView>
            </View>

            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    icon: {
        width: 30,
        height: 30,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    containerBody: {
        flex: 1,
        padding: 10,
    },
    scrollViewContent: {
        paddingVertical: 20,
        
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap',
        marginTop: 10,
       
    },
    buttonScrollView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'nowrap', // Asegura que los botones no se envuelvan
    },

    button: {
        backgroundColor: '#ffffff',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 35,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 10,
        width: 170,
        marginRight: 20,
        borderWidth: 0,
        borderColor: '#ffffff',
        marginBottom: 25,
    },
    buttonText: {
        color: '#777',
        fontSize: 18,
        textAlign: 'center',
    },
    containerListView: {
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    container20padding: {
        padding: 20,
    },
    titleTextMenu: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    secondaryText: {
        fontSize: 16,
        color: '#777',
    },
    containerProduct: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center',
    },
    menuImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    containerProductColumn: {
        flex: 1,
    },
    itemMenu: {
        fontSize: 14,
        color: '#777',
    },
    smallerIcon: {
        width: 20,
        height: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonIcon: {
        marginHorizontal: 5,
    },
});

export default HomePageAdmin;
