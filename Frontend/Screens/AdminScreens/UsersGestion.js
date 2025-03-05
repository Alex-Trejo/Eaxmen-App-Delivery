import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function UsuariosMotorizadosScreen() {
  const [selectedType, setSelectedType] = useState('Usuarios');
  const [expandedItems, setExpandedItems] = useState({});
  const [searchText, setSearchText] = useState('');

  const usuarios = [
    { id: '1', nombre: 'Usuario 1', detalles: 'Detalles del usuario 1' },
    { id: '2', nombre: 'Usuario 2', detalles: 'Detalles del usuario 2' },
    { id: '3', nombre: 'Usuario 3', detalles: 'Detalles del usuario 3' },
    { id: '4', nombre: 'Usuario 4', detalles: 'Detalles del usuario 4' },
    { id: '5', nombre: 'Usuario 5', detalles: 'Detalles del usuario 5' },
  ];

  const motorizados = [
    { id: '1', nombre: 'Motorizado 1', detalles: 'Detalles del motorizado 1' },
    { id: '2', nombre: 'Motorizado 2', detalles: 'Detalles del motorizado 2' },
    { id: '3', nombre: 'Motorizado 3', detalles: 'Detalles del motorizado 3' },
    { id: '4', nombre: 'Motorizado 4', detalles: 'Detalles del motorizado 4' },
    { id: '5', nombre: 'Motorizado 5', detalles: 'Detalles del motorizado 5' },
  ];

  const data = selectedType === 'Usuarios' ? usuarios : motorizados;

  const filteredData = data.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleItemExpansion = (itemId) => {
    setExpandedItems(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.itemNombre}>{item.nombre}</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => toggleItemExpansion(item.id)}
        >
          <Icon
            name={expandedItems[item.id] ? "chevron-up" : "chevron-down"}
            size={24}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      {expandedItems[item.id] && (
        <View style={styles.itemDetalles}>
          <Text>{item.detalles}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar por nombre"
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            selectedType === 'Usuarios' && styles.typeButtonSelected,
          ]}
          onPress={() => setSelectedType('Usuarios')}
        >
          <Text style={styles.typeButtonText}>Usuarios</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typeButton,
            selectedType === 'Motorizados' && styles.typeButtonSelected,
          ]}
          onPress={() => setSelectedType('Motorizados')}
        >
          <Text style={styles.typeButtonText}>Motorizados</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text>No hay {selectedType.toLowerCase()} registrados.</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    margin: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
  },
  typeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  typeButtonSelected: {
    backgroundColor: '#d0d0d0',
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  item: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemNombre: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  dropdownButton: {
    padding: 10,
  },
  itemDetalles: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginTop: 10,
  },
});
