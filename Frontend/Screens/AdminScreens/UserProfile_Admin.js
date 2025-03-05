import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { host } from '../../Host';

const UserProfile_Admin = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userId = route?.params?.userId;
  const [userProfile, setUserProfile] = useState(null);
  
  const userProfileClient = require('../../assets/user.png');

  useEffect(() => {
    if (userId) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`${host}/api/users/${userId}`);
          setUserProfile(response.data);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };

      fetchUserProfile();
    }
  }, [userId]);

  if (!userId) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Usuario no especificado</Text>
      </View>
    );
  }

  if (!userProfile) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Image source={userProfileClient} style={styles.avatar} />
        </View>
        <Text style={styles.name}>{userProfile.username}</Text>
        <Text style={styles.email}>{userProfile.email}</Text>
      </View>
      <Settings />
    </View>
  );
};

const Settings = () => {
  const navigation = useNavigation();
  const [logoutIconColor, setLogoutIconColor] = useState('#57636C');

  const handleLogoutPress = () => {
    setLogoutIconColor('#B64107');
    setTimeout(() => {
      setLogoutIconColor('#57636C');
      navigation.navigate('Login');
    }, 200); // Cambia el color por 200ms y luego vuelve al color original
  };

  return (
    <ScrollView contentContainerStyle={styles.settingsContainer}>
      <View style={styles.settingsHeader}>
        <Text style={styles.settingsHeaderText}>Configuraciones</Text>
      </View>
      <TouchableOpacity style={styles.settingItem} onPress={handleLogoutPress}>
        <Icon name="login" style={[styles.settingIcon, { color: logoutIconColor }]} />
        <Text style={styles.settingText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#57636c',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
  },
  email: {
    color: '#dbdddf',
    fontSize: 16,
  },
  settingsContainer: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  settingsHeader: {
    paddingBottom: 12,
  },
  settingsHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#101213',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  settingIcon: {
    color: '#57636C',
    fontSize: 24,
    marginRight: 16,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#101213',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default UserProfile_Admin;
