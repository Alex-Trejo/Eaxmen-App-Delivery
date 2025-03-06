import React, { useState, useEffect } from 'react';
import { StatusBar, Text, View, FlatList, Alert, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { host } from '../../Host';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddRemoveUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get(`${host}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error.message);
      Alert.alert('Error', 'No se pudieron obtener los usuarios.');
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.delete(`${host}/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error.message);
      Alert.alert('Error', 'No se pudo eliminar el usuario.');
    }
  };

  const handleChangeRole = async (userId, currentRole) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const newRole = currentRole === 'cliente' ? 'admin' 
                    : currentRole === 'admin' ? 'motorizado' 
                    : 'cliente';
      await axios.patch(`${host}/api/users/${userId}/role`, { role: newRole }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
    } catch (error) {
      console.error('Error changing user role:', error.message);
      Alert.alert('Error', 'No se pudo cambiar el rol del usuario.');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const renderUserList = (title, data) => (
    <>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContainer}>
        <FlatList
          data={data}
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
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Administrar Usuarios</Text>
      {renderUserList("Clientes", users.filter(user => user.role === 'cliente'))}
      {renderUserList("Admins", users.filter(user => user.role === 'admin'))}
      {renderUserList("Motorizados", users.filter(user => user.role === 'motorizado'))}
      <StatusBar style="auto" />
    </View>
  );
};

export default AddRemoveUsers;

// Estilos mejorados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F4F4',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#444',
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  userText: {
    fontSize: 18,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  roleButton: {
    backgroundColor: '#CC8636FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    shadowColor: "#CC8636FF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  roleButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: "#D32F2F",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
