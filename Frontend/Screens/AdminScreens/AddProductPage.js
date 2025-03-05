import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function AddProductPage() {
  const navigation = useNavigation();
  const [product, setProduct] = useState({
    name: '',
    image: null,
    price: '',
    quantity: '',
    description: '',
  });

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProduct({ ...product, image: result.assets[0].uri });
    }
  };

  const handleSave = () => {
    if (product.name && product.image && product.price && product.quantity && product.description) {
      // Aquí iría la lógica para guardar el producto
      console.log('Producto guardado', product);
      Alert.alert("Datos guardados");

      // Limpiar el formulario
      setProduct({
        name: '',
        image: null,
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
      image: null,
      price: '',
      quantity: '',
      description: '',
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerRow}>
        <Text style={styles.titleText}>Añadir Producto</Text>
      </View>

      <ScrollView style={styles.containerBody}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del producto"
            value={product.name}
            onChangeText={(text) => setProduct({ ...product, name: text })}
          />

          <Text style={styles.label}>Imagen</Text>
          <View style={styles.imagePickerContainer}>
            <TouchableOpacity onPress={handlePickImage} style={styles.imagePicker}>
              {product.image ? (
                <Image source={{ uri: product.image }} style={styles.imagePreview} />
              ) : (
                <Text style={styles.imagePickerText}>Seleccionar imagen</Text>
              )}
            </TouchableOpacity>
            {product.image && (
              <TouchableOpacity onPress={handlePickImage} style={styles.editButton}>
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.label}>Precio</Text>
          <TextInput
            style={styles.input}
            placeholder="Precio del producto"
            keyboardType="numeric"
            value={product.price}
            onChangeText={(text) => setProduct({ ...product, price: text })}
          />

          <Text style={styles.label}>Cantidad</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad del producto"
            keyboardType="numeric"
            value={product.quantity}
            onChangeText={(text) => setProduct({ ...product, quantity: text })}
          />

          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={styles.input}
            placeholder="Descripción del producto"
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
  imagePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
  },
  imagePickerText: {
    color: '#888',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  editButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#ee8b60',
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
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



