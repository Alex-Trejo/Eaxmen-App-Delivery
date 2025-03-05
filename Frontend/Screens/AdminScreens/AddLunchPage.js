import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export default function AddLunchPage() {
  const navigation = useNavigation();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    description: '',
  });

  const handleSave = () => {
    if (product.name && product.price && product.quantity && product.description) {
      // Aquí iría la lógica para guardar el producto
      console.log('Producto guardado', product);
      Alert.alert("Datos guardados");

      // Limpiar el formulario
      setProduct({
        name: '',
        price: '',
        quantity: '',
        description: '',
      });
    } else {
      Alert.alert("No se pudo guardar", "Llenar todos los espacios");
    }
  };

  const handleCancel = () => {
    setProduct({
      name: '',
      price: '',
      quantity: '',
      description: '',
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerRow}>
        <Text style={styles.titleText}>Añadir Almuerzo</Text>
      </View>

      <ScrollView style={styles.containerBody}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del almuerzo"
            value={product.name}
            onChangeText={(text) => setProduct({ ...product, name: text })}
          />

          <Text style={styles.label}>Precio</Text>
          <TextInput
            style={styles.input}
            placeholder="Precio del almuerzo"
            keyboardType="numeric"
            value={product.price}
            onChangeText={(text) => setProduct({ ...product, price: text })}
          />

          <Text style={styles.label}>Cantidad</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad del almuerzo"
            keyboardType="numeric"
            value={product.quantity}
            onChangeText={(text) => setProduct({ ...product, quantity: text })}
          />

          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={styles.input}
            placeholder="Descripción del almuerzo"
            multiline
            value={product.description}
            onChangeText={(text) => setProduct({ ...product, description: text })}
          />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button title="Guardar" onPress={handleSave} />
        <Button title="Cancelar" onPress={handleCancel} color="#ee8b60" />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  containerBody: {
    flex: 1,
    backgroundColor: '#f1f4f8',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    color: '#000',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  titleText: {
    color: '#000',
    fontSize: 25,
  },
});




