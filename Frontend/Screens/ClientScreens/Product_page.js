import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importar FontAwesome
import { CartContext } from '../../context/CartContext'; // Ajusta la ruta según tu estructura de archivos

const Producto_page = ({ route, navigation }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { addToCart, getCartCount } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    Alert.alert('Producto agregado al carrito');
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleCartIconPress = () => {
    navigation.navigate('Cart'); // Navega a la pantalla 'Cart'
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.cartIconContainer} onPress={handleCartIconPress}>
          <FontAwesome name="shopping-cart" size={24} color="white" />
          <View style={styles.cartItemCountContainer}>
            <Text style={styles.cartItemCount}>{getCartCount()}</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation, getCartCount]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.upperContainer}>
          <View style={styles.imageContainer}>
            <Image source={product.image} style={styles.image} />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <View style={styles.row}>
              <Text style={styles.price}>${product.price}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityValue}>{quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.lowerContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
            <Text style={styles.addButtonText}>Agregar al carrito</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f4f8', // Color de fondo general para el contenedor
  },
  upperContainer: {
    backgroundColor: '#fff', // Color de fondo blanco para la parte superior
    paddingBottom: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: '0%',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 430,
  },
  detailsContainer: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#14181B',
  },
  description: {
    fontSize: 14,
    color: '#57636C',
    marginTop: 12,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    color: '#14181B',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 55,
  },
  quantityButton: {
    paddingHorizontal: 17,
    paddingVertical: 8,
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#000',
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
  },
  lowerContainer: {
    backgroundColor: '#f1f4f8', // Color de fondo gris claro para la parte inferior
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
  },
  addButton: {
    backgroundColor: '#FEBD3D',
    borderRadius: 27,
    paddingVertical: 10,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  cartIconContainer: {
    position: 'relative',
    paddingRight: 25, // Ajuste aquí
  },
  cartItemCountContainer: {
    position: 'absolute',
    right: 0,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItemCount: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Producto_page;
