import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert, Linking, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CartContext } from '../../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { host } from '../../Host';

const Cart = () => {
  const navigation = useNavigation();
  const { cartItems, removeFromCart, getTotalPrice, addToCart, setCartItemsWithComment, setCartItems } = useContext(CartContext);
  const [comment, setComment] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [newQuantity, setNewQuantity] = useState('');
  const [wantInvoice, setWantInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    cedulaRuc: '',
    numeroCelular: '',
    correo: '',
    direccion: '',
  });
  const [name, setName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('efectivo');
  const [billAmount, setBillAmount] = useState('');
  const [location, setLocation] = useState(null);

  // Función para limpiar los campos
  const resetFields = () => {
    setComment("");
    setEditingItemId(null);
    setNewQuantity("");
    setWantInvoice(false);
    setInvoiceData({
      cedulaRuc: '',
      numeroCelular: '',
      correo: '',
      direccion: '',
    });
    setName("");
    setPaymentMethod('efectivo');
    setBillAmount('');
    setLocation(null);
  };


  useEffect(() => {
    if (cartItems.length === 0) {
      Alert.alert(
        "Carrito Vacío",
        "Debe agregar productos al carrito antes de proceder.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert("Permiso denegado", "No se pudo obtener la ubicación.");
          return;
        }
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      })();
    }
  }, [cartItems]);

  const handleVerification = async () => {
    console.log("Iniciando verificación de pedido...");
    //Validar campos obligatorios de nombre y apellido
    if (!name) {
      Alert.alert(
        "Campo Obligatorio",
        "Por favor ingresa tu nombre y apellido.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      return;
    }
    // Manejo de factura habilitada
    if (wantInvoice) {
      if (!invoiceData.cedulaRuc || !invoiceData.numeroCelular || !invoiceData.correo || !invoiceData.direccion) {
        Alert.alert(
          "Campos Obligatorios",
          "Por favor completa todos los campos de la factura.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        return;
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(invoiceData.correo)) {
        Alert.alert(
          "Formato Inválido",
          "Por favor ingresa un correo electrónico válido.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        return;
      }

      // Validar formato de teléfono
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(invoiceData.numeroCelular)) {
        Alert.alert(
          "Formato Inválido",
          "Por favor ingresa un número de teléfono válido (10 dígitos).",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        return;
      }

      // Validar longitud de Cédula/RUC
      if (invoiceData.cedulaRuc.length > 13) {
        Alert.alert(
          "Formato Inválido",
          "La Cédula/RUC no puede tener más de 13 dígitos.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        return;
      }
    }

      // Manejo de pagos sin factura
      if (!wantInvoice) {
        if (paymentMethod === 'efectivo') {
          facturaInfo = "efectivo";
        } else if (paymentMethod === 'transferencia') {
          facturaInfo = "transferencia";
          billetePago = "Pago con transferencia";
        }
      }
      

    

    const totalPrice = getTotalPrice(wantInvoice);
    let facturaInfo = wantInvoice ? invoiceData : null;
    let billetePago = paymentMethod === 'efectivo' ? billAmount : 'N/A';
    
    // Manejo del vuelto
    let vuelto = paymentMethod === 'efectivo' ? billAmount - totalPrice : 0;

      // Manejo de pago en efectivo
    if (paymentMethod === 'efectivo') {
      if (!billAmount) {
        Alert.alert("Campo Obligatorio", "Por favor selecciona el billete con el que pagarás.", [{ text: "OK" }]);
        return;
      }

       // Validar que el billete sea múltiplo de 5
       if (billAmount % 5 !== 0) {
        Alert.alert("Billete Inválido", "El billete debe ser un múltiplo de 5.", [{ text: "OK" }]);
        return;
      }

      // Validar que el billete sea mayor o igual al total
      if (parseFloat(billAmount) < parseFloat(totalPrice)) {
        Alert.alert("Billete Insuficiente", "El billete debe ser mayor o igual al total.", [{ text: "OK" }]);
        return;
      }

    }

    // Validar campo de cambio
    if (paymentMethod === 'efectivo' && !billAmount) {
      Alert.alert(
        "Campo Obligatorio",
        "Por favor selecciona el billete con el que pagarás.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      return;
    }
    
    





    if (totalPrice > 0) {
      const orderData = {
      //   items: cartItems.map(item => ({
      //     id: item.id,
      //     name: item.name,
      //     price: item.price,
      //     quantity: item.quantity
      //   })),
      //   total: totalPrice,
      //   comment: comment,
      //   wantInvoice: wantInvoice ? "Sí" : "No",
      //   invoiceData: wantInvoice ? invoiceData : null,
      //   paymentMethod: paymentMethod,
      //   changeFor: paymentMethod === 'efectivo' ? changeFor : 'N/A',
      //   location: location ? `https://www.google.com/maps/search/?api=1&query=${location.coords.latitude},${location.coords.longitude}` : 'Ubicación no disponible'
            direccion: location ? `https://www.google.com/maps/search/?api=1&query=${location.coords.latitude},${location.coords.longitude}` : '', // Ubicación
            nombre: name.split(' ')[0], // Extrae el primer nombre
            apellido: name.split(' ')[1] || '', // Extrae el apellido si lo hay
            pedido: cartItems.map(item => ({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity
                })), // Lista de productos
            cantidad: cartItems.reduce((total, item) => total + item.quantity, 0), // Cantidad total
            precio: totalPrice, // Precio total
            comentario: comment, // Comentarios del usuario
            factura: facturaInfo, // Puede ser objeto de factura o "Pago con transferencia"/"Pago en efectivo"

            formaPago: paymentMethod, // Método de pago
            billetePago: billetePago, 
            vuelto: paymentMethod === 'efectivo' ? vuelto : 'N/A'

      };
      console.log("Datos del pedido a enviar:", JSON.stringify(orderData, null, 2));

      try {
        const response = await axios.post('https://eaxmen-app-delivery.vercel.app/api/orders/order', orderData);
        if (response.status === 201) {
          Alert.alert("Éxito", "Pedido realizado con éxito", [{ text: "OK" ,
            onPress: () => {
              setCartItems([]);

              // limpiar los campos
              
              navigation.navigate('HomePageClient');
            }
          }]);
          console.log("Pedido creado exitosamente:", response.data);
          
          // Limpiar el carrito o redirigir
          
        }
      } catch (error) {
        console.error("Error al crear el pedido", error);
        if (error.response) {
          console.log("Detalles del error:", error.response.data);
        }
        Alert.alert("Error", "No se pudo realizar el pedido", [{ text: "OK" }]);
      }
      

      // const itemsList = cartItems.map(item => `- ${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n');
      // let invoiceInfo = "";
      // if (cartSummary.wantInvoice === "Sí") {
      //   invoiceInfo = `Cédula/RUC: ${cartSummary.invoiceData.id}\nNúmero de celular: ${cartSummary.invoiceData.phone}\nCorreo electrónico: ${cartSummary.invoiceData.email}\nDireccion: ${cartSummary.invoiceData.direccion}\n`;
      // }
      // const totalPriceMessage = `\nPrecio total: $${totalPrice}\n\nComentario: ${comment}\nFactura: ${cartSummary.wantInvoice}\n${cartSummary.wantInvoice === "Sí" ? `Datos de Factura:\n${invoiceInfo}` : ``}Forma de pago: ${paymentMethod}\nCambio de: ${cartSummary.changeFor}\nUbicación: ${cartSummary.location}`;

      // const whatsappMessage = `${name.toUpperCase()}\n\n${itemsList}\n\n${totalPriceMessage}\n\nGracias!`;

      // const phoneNumber = '+593999095409'; // Reemplaza con el número al que quieres enviar el mensaje
      // const url = `whatsapp://send?phone=${encodeURIComponent(phoneNumber)}&text=${encodeURIComponent(whatsappMessage)}`;

      // Linking.openURL(url).then(() => {
      //   console.log("Mensaje de WhatsApp enviado.");
      // }).catch((err) => {
      //   console.log("Error al abrir WhatsApp: ", err);
      //   Alert.alert(
      //     "Error",
      //     "No se pudo abrir WhatsApp. Asegúrate de tener la aplicación instalada.",
      //     [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      //     { cancelable: false }
      //   );
      // });
    } else {
      Alert.alert(
        "Carrito Vacío",
        "No se puede realizar el pago porque el carrito está vacío.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  const handleDeleteItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleEditItem = (itemId) => {
    setEditingItemId(itemId);
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      setNewQuantity(item.quantity.toString());
    }
  };

  const handleSaveQuantity = (itemId) => {
    const quantity = parseInt(newQuantity, 10);
    if (!isNaN(quantity) && quantity > 0) {
      const item = cartItems.find(item => item.id === itemId);
      if (item) {
        addToCart(item, quantity - item.quantity);
      }
      setEditingItemId(null);
      setNewQuantity('');
    }
  };

  const handleInvoiceInputChange = (key, value) => {
    setInvoiceData(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Elementos de su pedido</Text>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <View style={styles.itemBox}>
                <Image source={item.image} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                  {editingItemId === item.id ? (
                    <View style={styles.quantityInputContainer}>
                      <TouchableOpacity style={styles.quantityButton} onPress={() => setNewQuantity((prev) => (parseInt(prev, 10) - 1).toString())}>
                        <Icon name="remove" size={20} color="#333" />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{newQuantity}</Text>
                      <TouchableOpacity style={styles.quantityButton} onPress={() => setNewQuantity((prev) => (parseInt(prev, 10) + 1).toString())}>
                        <Icon name="add" size={20} color="#333" />
                      </TouchableOpacity>
                    </View>
                    ) : (
                      <Text style={styles.itemQuantity}>Cantidad: {item.quantity}</Text>
                    )}
                </View>
                {editingItemId === item.id ? (
                  <TouchableOpacity style={styles.iconButton} onPress={() => handleSaveQuantity(item.id)}>
                    <Icon name="check" size={30} color="green" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.iconButton} onPress={() => handleEditItem(item.id)}>
                    <Icon name="edit" size={30} color="green" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.iconButton} onPress={() => handleDeleteItem(item.id)}>
                  <Icon name="delete" size={30} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nombre y Apellido</Text>
          <TextInput
            style={[styles.input, !name && { borderColor: 'red', borderWidth: 1 }]}
            placeholder="Ingrese su nombre y apellido"
            value={name}
            onChangeText={setName}
          />
          </View>
          <View style={styles.commentSection}>
            <Text style={styles.commentTitle}>Comentario para la entrega:</Text>
            <View style={styles.commentInputContainer}>
              <TextInput
                multiline
                placeholder="Escribe tu comentario aquí..."
                style={styles.commentInput}
                value={comment}
                onChangeText={text => setComment(text)}
              />
            </View>
          </View>
          <View style={styles.invoiceSection}>
            <Text style={styles.invoiceTitle}>¿Desea factura?</Text>
            <Switch
              value={wantInvoice}
              onValueChange={() => setWantInvoice(!wantInvoice)}
              trackColor={{ false: "#767577", true: "orange" }}
              thumbColor={wantInvoice ? "#B64107" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              style={{ marginBottom: 10 }}
            />
            {wantInvoice && (
              <View style={styles.invoiceForm}>
                <TextInput
					style={[styles.invoiceInput, !invoiceData.cedulaRuc && { borderColor: 'red' }]}
					placeholder="Cédula/RUC"
					keyboardType="phone-pad"
					value={invoiceData.cedulaRuc}
					onChangeText={(text) => handleInvoiceInputChange('cedulaRuc', text)}
				/>
				<TextInput
					style={[styles.invoiceInput, !invoiceData.numeroCelular && { borderColor: 'red' }]}
					placeholder="Número de celular"
					keyboardType="phone-pad"
					value={invoiceData.numeroCelular}
					onChangeText={(text) => handleInvoiceInputChange('numeroCelular', text)}
				/>
				<TextInput
					style={[styles.invoiceInput, !invoiceData.correo && { borderColor: 'red' }]}
					placeholder="Correo electrónico"
					keyboardType="email-address"
					value={invoiceData.correo}
					onChangeText={(text) => handleInvoiceInputChange('correo', text)}
				/>
				<TextInput
					style={[styles.invoiceInput, !invoiceData.direccion && { borderColor: 'red' }]}
					placeholder="Dirección"
					value={invoiceData.direccion}
					onChangeText={(text) => handleInvoiceInputChange('direccion', text)}
				/>
              </View>
            )}
          </View>
          <View style={styles.paymentSection}>
            <Text style={styles.paymentTitle}>Forma de Pago:</Text>
            <View style={styles.paymentOptions}>
              <TouchableOpacity
                style={[styles.paymentButton, paymentMethod === 'efectivo' && styles.paymentButtonSelected]}
                onPress={() => setPaymentMethod('efectivo')}
              >
                <Text style={styles.paymentButtonText}>Efectivo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.paymentButton, paymentMethod === 'transferencia' && styles.paymentButtonSelected]}
                onPress={() => setPaymentMethod('transferencia')}
              >
                <Text style={styles.paymentButtonText}>Transferencia</Text>
              </TouchableOpacity>
            </View>
            {paymentMethod === 'efectivo' && (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={billAmount}
                style={styles.picker}
                onValueChange={(itemValue) => setBillAmount(itemValue)}
              >
                <Picker.Item label="Monto del billete" value="" />
                <Picker.Item label="$5" value="5" />
                <Picker.Item label="$10" value="10" />
                <Picker.Item label="$20" value="20" />
              </Picker>
            </View>
          )}

          </View>
          <View style={styles.priceList}>
          <Text style={styles.listTitle}>Listado de precios</Text>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.priceRow}>
              <View style={styles.priceInfo}>
                <Text style={styles.priceItem}>{item.name} x {item.quantity}</Text>
              </View>
              <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.priceRow}>
            <View style={styles.priceInfo}>
              <Text style={styles.priceItem}>Precio total</Text>
              <Icon
                name="info-outline"
                type="material"
                color="#57636C"
                size={18}
                onPress={() => console.log('IconButton pressed ...')}
                style={styles.infoIcon}
              />
            </View>
            <Text style={styles.totalPrice}>${getTotalPrice(wantInvoice)}</Text>
          </View>
        </View>
        </View>
      </ScrollView>
      {getTotalPrice(wantInvoice) !== "0.00" && (
        <TouchableOpacity style={styles.verificationContainer} onPress={handleVerification}>
          <Text style={styles.text}>Realizar Pedido (${getTotalPrice(wantInvoice)})</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 10,
  },
  itemBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 14,
  },
  itemQuantityInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  iconButton: {
    marginLeft: 10,
  },
  commentSection: {
    marginTop: 20,
  },
  commentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentInputContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  commentInput: {
    minHeight: 100,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
  },
  invoiceSection: {
    marginTop: 20,
  },
  invoiceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  invoiceForm: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  invoiceInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  priceList: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceItem: {
    fontSize: 16,
    marginRight: 5,
  },
  infoIcon: {
    marginLeft: 5,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  verificationContainer: {
    backgroundColor: 'green',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  paymentSection: {
    marginTop: 20,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentOptions: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  paymentButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#808080',
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  paymentButtonSelected: {
    backgroundColor: '#B64107',
  },
  paymentButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  changeInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f0f0f0', // Cambia este color según lo que desees
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  quantityInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default Cart;
