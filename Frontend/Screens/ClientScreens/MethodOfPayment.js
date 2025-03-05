import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function MetPagoScreen({ navigation }) {
  const [accountNumber, setAccountNumber] = useState('131587451236');

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleCopyPress = () => {
    console.log('IconButton pressed numero de cuenta');
  };

  const handleAddPhotoPress = () => {
    console.log('IconButton pressed foto de transferencia...');
  };

  const handleCameraPress = () => {
    console.log('Button pressed camara...');
  };

  const handleGalleryPress = () => {
    console.log('Button pressed galeria...');
  };

  const handleConfirmPress = () => {
    console.log('Button pressed confirmar pago');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Detalles de pago</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Fecha</Text>
          <Text style={styles.value}>Fri, Jun 23 - 4:30pm</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total</Text>
          <Text style={styles.value}>$500.00</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Método de pago:</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/icon-deuna.png')} style={styles.image} />
        </View>
        <Text style={styles.label}>Número de cuenta:</Text>
        
        <View style={styles.centeredContainer}>
        <View style={styles.row}>
          <TouchableOpacity onPress={handleCopyPress}>
            <Icon name="content-copy" size={25} color="#57636C" />
          </TouchableOpacity>
          <Text style={styles.value}>{accountNumber}</Text>
        </View>
        </View>

        <View style={styles.centeredContainer}>
          <Text style={styles.label}>Foto de transferencia:</Text>
          <TouchableOpacity onPress={handleAddPhotoPress}>
            <Icon name="add-photo-alternate" size={100} color="#57636C" />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleCameraPress}>
            <MaterialCommunityIcons name="camera-plus-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Cámara</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleGalleryPress}>
            <MaterialCommunityIcons name="file-image-plus-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Galería</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total a pagar</Text>
          <Text style={styles.totalValue}>$500.00</Text>
        </View>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPress}>
          <Text style={styles.confirmButtonText}>Confirmar Pago</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B64107',
    padding: 16,
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: 16,
  },
  content: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '500',
    color: '#15161E',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#606A85',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#15161E',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 8,
  },
  centeredContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
    padding: 2,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEA921',
    borderRadius: 8,
    padding: 10,
    minWidth: 134,
  },
  buttonText: {
    fontSize: 15,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  divider: {
    height: 2,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#606A85',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#15161E',
  },
  confirmButton: {
    backgroundColor: '#FEA921',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});
