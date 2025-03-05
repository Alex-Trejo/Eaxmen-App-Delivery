import React, { useContext, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import ProductContext from '../../context/ProductContext';

const iconUser = require('../../assets/user.png');
const iconArrow = require('../../assets/right-arrow.png');

export default function MenuManagement_Lunch() {
    const navigation = useNavigation();
    const { products, toggleProductStatus, removeProduct } = useContext(ProductContext);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showButtons, setShowButtons] = useState(false);

    const handleIconClick = (product) => {
        setSelectedProduct(product);
        setShowButtons(!showButtons);
    };

    const handleEditClick = (product) => {
        console.log('Edit pressed for:', product.name);
        navigation.navigate('EditProduct', { 
            product: { 
                ...product, 
                image: product.image 
            } 
        });
        
        };

    const handleCancelClick = (product) => {
        removeProduct(product.id);
        setSelectedProduct(null); // Deseleccionar el producto
        setShowButtons(false); // Ocultar los botones
    };

    const handleDomainClick = (product) => {
        toggleProductStatus(product.id);
    };

    const handleCancelAndEditClick = (product) => {
        handleCancelClick(product);
        
    };

    return (
        <View style={styles.container}>
            {/* Encabezado */}
            <View style={styles.containerRow}>
                <Text style={styles.titleText}>Gestión de Almuerzos</Text>
                <Image source={iconUser} style={styles.icon} />
            </View>

            {/* Contenido */}
            <View style={styles.containerBody}>
                <ScrollView>
                    {/* Botones */}
                    <View style={styles.buttonContainer}>
                        

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                console.log('Button pressed añadir platillo...');
                                // navigation.navigate('CreateProduct....');
                            }}
                        >
                            <Text style={styles.buttonText}>Añadir Almuerzo</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Lista de productos */}
                    <View style={styles.containerListView}>
                        <View style={styles.container20padding}>
                            <Text style={styles.titleTextMenu}>Menú</Text>
                        </View>

                        {products.map((product, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.containerProduct}
                            >
                                <Image source={product.image} style={styles.menuComida} />
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
                                            onPress={() => handleCancelAndEditClick(product)}

                                            
                                            

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
                        ))}
                    </View>
                </ScrollView>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10.84,
    },
    containerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    titleText: {
        color: '#000',
        fontSize: 25,
    },
    icon: {
        width: 35,
        height: 35,
    },
    iconSelect: {
        width: 25,
        height: 25,
        tintColor: '#57636C',
    },
    containerBody: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#f1f4f8',
    },
    buttonContainer: {
        marginTop: 20,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center',
        backgroundColor: '#ffff',
        marginHorizontal: 20,
    },
    button: {
        marginTop: 10,
        height: 58,
        paddingHorizontal: 36,
        backgroundColor: '#FEA921',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginBottom: 15,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    containerListView: {
        margin: 15,
        borderRadius: 10,
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10.84,
        elevation: 10,
    },
    container20padding: {
        padding: 20,
    },
    titleTextMenu: {
        alignSelf: 'flex-start',
        color: '#000',
        fontSize: 25,
    },
    containerProduct: {
        flexDirection: 'row',
        marginLeft: 25,
        padding: 10,
        borderBottomColor: '#E0E3E7',
        borderBottomWidth: 0.5,
        borderLeftWidth: 2,
        borderLeftColor: '#ee8b60',
        width: '100%',
        position: 'relative',
    },
    menuComida: {
        width: 95,
        height: 75,
        borderRadius: 10,
        marginRight: 10,
        marginBottom: 30,
    },
    containerProductColumn: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        paddingVertical: 10,
        width: '50%',
    },
    secondaryText: {
        color: '#57636C',
        fontSize: 15,
    },
    itemMenu: {
        marginBottom: 10,
    },
    smallerIcon: {
        marginTop: 30,
        width: 30,
        height: 30,
    },
    buttonsContainer: {
        position: 'absolute',
        borderRadius: 0,
        top: '100%',
        right: 28,
        bottom: 15,
        left: 5,
        backgroundColor: '#E0E3E7',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 1,
    },
    buttonIcon: {
        padding: 10,
        tintColor: '#57636C',
    },
});
