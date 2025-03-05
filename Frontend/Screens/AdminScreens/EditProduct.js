import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { host } from '../../Host'; // Asegúrate de importar correctamente la variable host con la URL de tu servidor backend

const EditProduct = ({ route }) => {
    const navigation = useNavigation();
    const { product } = route.params;

    // Estados locales para editar el producto
    const [productName, setProductName] = useState(product.name);
    const [productDescription, setProductDescription] = useState(product.description);
    const [productPrice, setProductPrice] = useState(`${product.price}`);

    // Función para guardar los cambios realizados en el producto
    const handleSave = async () => {
        try {
            const updatedProduct = {
                name: productName,
                description: productDescription,
                price: parseFloat(productPrice),
            };

            const response = await fetch(`${host}/api/lunches/${product.id}`, {
                method: 'PATCH', // Utiliza PATCH para actualizar el producto
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Navegar de regreso a la pantalla anterior después de guardar
            navigation.goBack();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {/* Campos editables para nombre, descripción y precio */}
                <View style={styles.card}>
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput
                        style={styles.input}
                        value={productName}
                        onChangeText={setProductName}
                        placeholder="Escribe el nombre del platillo"
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Descripción</Text>
                    <TextInput
                        style={styles.input}
                        value={productDescription}
                        onChangeText={setProductDescription}
                        placeholder="Escribe la descripción del platillo"
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Precio</Text>
                    <TextInput
                        style={styles.input}
                        value={productPrice}
                        onChangeText={setProductPrice}
                        keyboardType="numeric"
                        placeholder="Ingrese el precio"
                    />
                </View>

                {/* Botón para guardar los cambios */}
                <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
                    <Text style={styles.submitButtonText}>Guardar Cambios</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#F5F5F5',
    },
    container: {
        flex: 1,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#FEA921',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default EditProduct;
