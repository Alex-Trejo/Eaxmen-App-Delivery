import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, ScrollView, Switch, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import ProductContext from '../../context/ProductContext';
import { storage } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { host } from '../../Host';

const CreateProduct = () => {
  const navigation = useNavigation();
  const { addProduct } = useContext(ProductContext);

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [fuertes, setFuertes] = useState(false);
  const [combos, setCombos] = useState(false);
  const [postres, setPostres] = useState(false);
  const [bebidas, setBebidas] = useState(false);
  const [cortes, setCortes] = useState(false);
  const [panadería, setPanadería] = useState(false);
  const [pastelería, setPastelería] = useState(false);
  const [chocolates, setChocolates] = useState(false);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permisos requeridos', 'Se requieren permisos para acceder a la galería de fotos', [{ text: 'OK' }]);
      }
    })();
  }, []);

  const uploadImageToFirebase = async (uri) => {
    setUploading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `productos/${Date.now()}.jpg`);

      await uploadBytes(storageRef, blob);

      const downloadUrl = await getDownloadURL(storageRef);
      return downloadUrl;
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      Alert.alert('Error', 'No se pudo subir la imagen.');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleAddProduct = async () => {
    if (!image) {
      Alert.alert('Imagen no seleccionada', 'Por favor, selecciona una imagen para el producto.', [{ text: 'OK' }]);
      return;
    }

    const price = parseFloat(productPrice);
    if (!/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/.test(productName)) {
      Alert.alert('Nombre inválido', 'El nombre solo debe contener letras.', [{ text: 'OK' }]);
      return;
    }

    if (productDescription.length > 200) {
      Alert.alert('Descripción demasiado larga', 'La descripción no debe superar los 200 caracteres.', [{ text: 'OK' }]);
      return;
    }

    if (isNaN(price) || price < 0 || price > 100) {
      Alert.alert('Precio inválido', 'El precio debe estar entre 0 y 100 dólares.', [{ text: 'OK' }]);
      return;
    }

    const imageUrl = await uploadImageToFirebase(image);
    if (!imageUrl) return;

    const category = fuertes ? 'fuertes' : combos ? 'combos' : postres ? 'postres' : bebidas ? 'bebidas' : cortes ? 'cortes' : panadería ? 'panadería' : pastelería ? 'pastelería' : 'chocolates';

    const newProduct = {
      name: productName,
      description: productDescription,
      price: price,
      category: category,
      image: { uri: imageUrl },
      status: 'disponible',
    };

    try {
      const response = await fetch(`${host}/api/lunches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el producto');
      }

      const data = await response.json();
      console.log('Producto guardado:', data);
      addProduct(data);

      Alert.alert('Éxito', 'Producto agregado exitosamente', [{ text: 'OK' }]);
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar el producto:', error);
      Alert.alert('Error', 'Hubo un problema al guardar el producto.', [{ text: 'OK' }]);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        if (result.assets && result.assets.length > 0) {
          const selectedImage = result.assets[0];
          setImage(selectedImage.uri);
        }
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.card}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={styles.imagePlaceholder}>Imagen no seleccionada</Text>
          )}
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Agregar Imagen</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Nombre</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Escribe el nombre del platillo"
              value={productName}
              onChangeText={(text) => {
                if (/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]*$/.test(text)) {
                  setProductName(text);
                } else {
                  Alert.alert('Nombre inválido', 'El nombre solo debe contener letras.', [{ text: 'OK' }]);
                }
              }}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Descripción</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Escribe la descripción del platillo"
              value={productDescription}
              onChangeText={(text) => {
                if (text.length <= 200) {
                  setProductDescription(text);
                } else {
                  Alert.alert('Descripción demasiado larga', 'La descripción no debe superar los 200 caracteres.', [{ text: 'OK' }]);
                }
              }}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Precio</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.currency}>$</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="0.00"
              keyboardType="numeric"
              value={productPrice}
              onChangeText={(text) => {
                const price = parseFloat(text);
                if (!isNaN(price) && price >= 0 && price <= 100) {
                  setProductPrice(text);
                } else {
                  Alert.alert('Precio inválido', 'El precio debe estar entre 0 y 100 dólares.', [{ text: 'OK' }]);
                }
              }}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Categoría</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Fuertes</Text>
            <Switch
              value={fuertes}
              onValueChange={(newValue) => {
                setFuertes(newValue);
                setCombos(false);
                setPostres(false);
                setBebidas(false);
                setCortes(false);
                setPanadería(false);
                setPastelería(false);
                setChocolates(false);
              }}
              trackColor={{ false: '#767577', true: '#FEA921' }}
              thumbColor={fuertes ? '#ff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Combos</Text>
            <Switch
              value={combos}
              onValueChange={(newValue) => {
                setCombos(newValue);
                setFuertes(false);
                setPostres(false);
                setBebidas(false);
                setCortes(false);
                setPanadería(false);
                setPastelería(false);
                setChocolates(false);
              }}
              trackColor={{ false: '#767577', true: '#FEA921' }}
              thumbColor={combos ? '#ff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Postres</Text>
            <Switch
              value={postres}
              onValueChange={(newValue) => {
                setPostres(newValue);
                setCombos(false);
                setFuertes(false);
                setBebidas(false);
                setCortes(false);
                setPanadería(false);
                setPastelería(false);
                setChocolates(false);
              }}
              trackColor={{ false: '#767577', true: '#FEA921' }}
              thumbColor={postres ? '#ff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Bebidas</Text>
            <Switch
              value={bebidas}
              onValueChange={(newValue) => {
                setBebidas(newValue);
                setPostres(false);
                setCombos(false);
                setFuertes(false);
                setCortes(false);
                setPanadería(false);
                setPastelería(false);
                setChocolates(false);
              }}
              trackColor={{ false: '#767577', true: '#FEA921' }}
              thumbColor={bebidas ? '#ff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Cortes de Carne</Text>
            <Switch
              value={cortes}
              onValueChange={(newValue) => {
                setCortes(newValue);
                setBebidas(false);
                setPostres(false);
                setCombos(false);
                setFuertes(false);
                setPanadería(false);
                setPastelería(false);
                setChocolates(false);
              }}
              trackColor={{ false: '#767577', true: '#FEA921' }}
              thumbColor={cortes ? '#ff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Panadería</Text>
            <Switch
              value={panadería}
              onValueChange={(newValue) => {
                setPanadería(newValue);
                setCortes(false);
                setBebidas(false);
                setPostres(false);
                setCombos(false);
                setFuertes(false);
                setPastelería(false);
                setChocolates(false);
              }}
              trackColor={{ false: '#767577', true: '#FEA921' }}
              thumbColor={panadería ? '#ff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Pastelería</Text>
            <Switch
              value={pastelería}
              onValueChange={(newValue) => {
                setPastelería(newValue);
                setPanadería(false);
                setCortes(false);
                setBebidas(false);
                setPostres(false);
                setCombos(false);
                setFuertes(false);
                setChocolates(false);
              }}
              trackColor={{ false: '#767577', true: '#FEA921' }}
              thumbColor={pastelería ? '#ff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Chocolates</Text>
            <Switch
              value={chocolates}
              onValueChange={(newValue) => {
                setChocolates(newValue);
                setPastelería(false);
                setPanadería(false);
                setCortes(false);
                setBebidas(false);
                setPostres(false);
                setCombos(false);
                setFuertes(false);
              }}
              trackColor={{ false: '#767577', true: '#FEA921' }}
              thumbColor={chocolates ? '#ff' : '#f4f3f4'}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleAddProduct} disabled={uploading}>
          <Text style={styles.submitButtonText}>{uploading ? 'Subiendo...' : 'Agregar Producto'}</Text>
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
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 200,
  },
  button: {
    backgroundColor: '#B64107',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '60%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  inputContainer: {
    borderBottomWidth: 2,
    borderColor: '#E0E0E0',
    paddingBottom: 8,
  },
  input: {
    fontSize: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 10,
  },
  priceInput: {
    flex: 1,
    marginLeft: 5,
    fontSize: 16,
  },
  currency: {
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#B64107',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default CreateProduct;