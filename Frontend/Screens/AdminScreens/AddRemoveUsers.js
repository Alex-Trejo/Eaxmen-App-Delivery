import React, { useState, useEffect } from 'react';
import { StatusBar, Text, View, FlatList, Alert, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { host } from '../../Host'; // Ajusta la ruta según la ubicación de Host.js
import AsyncStorage from '@react-native-async-storage/async-storage'; // Si usas AsyncStorage para almacenar el token

const AddRemoveUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken'); // O de donde obtengas tu token
      const response = await axios.get(`${host}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error.message);
      Alert.alert('Error', 'Ocurrió un error al obtener los usuarios. Por favor, revisa tu conexión a Internet y la URL del servidor.');
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = await AsyncStorage.getItem('userToken'); // O de donde obtengas tu token
      await axios.delete(`${host}/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error.message);
      Alert.alert('Error', 'Ocurrió un error al eliminar el usuario. Por favor, revisa tu conexión a Internet y la URL del servidor.');
    }
  };

  const handleChangeRole = async (userId, currentRole) => {
    try {
      const token = await AsyncStorage.getItem('userToken'); // O de donde obtengas tu token
      const newRole = currentRole === 'cliente' ? 'admin' : 'cliente';
      await axios.patch(`${host}/api/users/${userId}/role`, { role: newRole }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
    } catch (error) {
      console.error('Error changing user role:', error.message);
      Alert.alert('Error', 'Ocurrió un error al cambiar el rol del usuario. Por favor, revisa tu conexión a Internet y la URL del servidor.');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#febd3d" />
      </View>
    );
  }

  const clientes = users.filter(user => user.role === 'cliente');
  const admins = users.filter(user => user.role === 'admin');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Administrar Usuarios</Text>
      
      <Text style={styles.sectionTitle}>Clientes</Text>
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userText}>{item.username}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.roleButton} onPress={() => handleChangeRole(item.id, item.role)}>
                <Text style={styles.roleButtonText}>Cambiar Rol</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteUser(item.id)}>
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      
      <Text style={styles.sectionTitle}>Admins</Text>
      <FlatList
        data={admins}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userText}>{item.username}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.roleButton} onPress={() => handleChangeRole(item.id, item.role)}>
                <Text style={styles.roleButtonText}>Cambiar Rol</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteUser(item.id)}>
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
};

export default AddRemoveUsers;

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  roleButton: {
    backgroundColor: '#4d79ff',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  roleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
