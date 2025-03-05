import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UserProfile_Client = () => {
  const navigation = useNavigation();

  const userProfileClient = require('../../assets/user.png');

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Image source={userProfileClient} style={styles.avatar} />
          <View style={styles.badgeContainer}>
            <Image source={userProfileClient} style={styles.badge} />
          </View>
        </View>
        <Text style={styles.name}>David Jerome</Text>
        <Text style={styles.email}>David.j@gmail.com</Text>
      </View>
      <HelpCenterButton />
      <Settings />
    </View>
  );
};

const HelpCenterButton = () => {
  const navigation = useNavigation();
  const [helpIconColor, setHelpIconColor] = useState('#101213');

  const handleHelpPress = () => {
    setHelpIconColor('#B64107');
    setTimeout(() => {
      setHelpIconColor('#101213');
      navigation.navigate('Contact');
    }, 200); // Cambia el color por 200ms y luego vuelve al color original
  };

  return (
    <View style={styles.helpCenterContainer}>
      <TouchableOpacity
        style={styles.helpButton}
        onPress={handleHelpPress}
      >
        <View style={styles.iconContainer}>
          <Icon name="help-outline" style={[styles.icon, { color: helpIconColor }]} />
        </View>
      </TouchableOpacity>
      <Text style={styles.helpText}>Centro de ayuda</Text>
    </View>
  );
};

const Settings = () => {
  const navigation = useNavigation();
  const [logoutIconColor, setLogoutIconColor] = useState('#57636C');
  const [showNotificationOptions, setShowNotificationOptions] = useState(false);
  const [notificationState, setNotificationState] = useState('Sonido'); // Estado inicial: Sonido

  const handleLogoutPress = () => {
    setLogoutIconColor('#B64107');
    setTimeout(() => {
      setLogoutIconColor('#57636C');
      navigation.navigate('Login');
    }, 200); // Cambia el color por 200ms y luego vuelve al color original
  };

  const handleNotificationChange = (state) => {
    setNotificationState(state);
    console.log(`Estado de notificaciones cambiado a: ${state}`);
  };

  const toggleNotificationOptions = () => {
    setShowNotificationOptions(!showNotificationOptions);
  };

  return (
    <ScrollView contentContainerStyle={styles.settingsContainer}>
      <View style={styles.settingsHeader}>
        <Text style={styles.settingsHeaderText}>Configuraciones</Text>
      </View>
      <View style={styles.settingItem}>
        <Icon name="work-outline" style={styles.settingIcon} />
        <Text style={styles.settingText}>Teléfono</Text>
        <Text style={styles.settingAction}>Agregar Número</Text>
      </View>
      <View style={styles.settingItem}>
        <Icon name="money" style={styles.settingIcon} />
        <Text style={styles.settingText}>ROL</Text>
        <Text style={styles.settingAction}>Cliente</Text>
      </View>
      <View style={styles.settingItem}>
        <TouchableOpacity onPress={toggleNotificationOptions}>
          <View style={styles.settingIconContainer}>
            <Icon name="notifications-active" style={styles.settingIcon} />
          </View>
        </TouchableOpacity>
        <Text style={styles.settingText}>Configuración de Notificaciones</Text>
        <TouchableOpacity onPress={toggleNotificationOptions}>
          <Icon name={showNotificationOptions ? "keyboard-arrow-up" : "keyboard-arrow-down"} style={styles.settingActionIcon} />
        </TouchableOpacity>
      </View>
      {showNotificationOptions && (
        <View style={styles.notificationOptions}>
          <TouchableOpacity style={styles.settingItem} onPress={() => handleNotificationChange('Vibración')}>
            <Icon name="vibration" style={styles.settingIcon} />
            <Text style={styles.settingText}>Vibración</Text>
            <Text style={styles.settingAction}>{notificationState === 'Vibración' ? '✓' : ''}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem} onPress={() => handleNotificationChange('Sonido')}>
            <Icon name="volume-up" style={styles.settingIcon} />
            <Text style={styles.settingText}>Sonido</Text>
            <Text style={styles.settingAction}>{notificationState === 'Sonido' ? '✓' : ''}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem} onPress={() => handleNotificationChange('Silencio')}>
            <Icon name="volume-off" style={styles.settingIcon} />
            <Text style={styles.settingText}>Silencio</Text>
            <Text style={styles.settingAction}>{notificationState === 'Silencio' ? '✓' : ''}</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.settingItem} onPress={handleLogoutPress}>
        <Icon name="login" style={[styles.settingIcon, { color: logoutIconColor }]} />
        <Text style={styles.settingText}>Cerrar Sesión</Text>
        <Text style={styles.settingAction}>¿Salir?</Text>
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
  badgeContainer: {
    position: 'absolute',
    right: -10,
    bottom: 0,
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 4,
    borderColor: '#57636C',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
  helpCenterContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  helpButton: {
    marginBottom: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    backgroundColor: '#fff',
    borderRadius:22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#101213',
    fontSize: 24,
  },
  helpText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
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
  settingIconContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#101213',
  },
  settingAction: {
    fontSize: 14,
    color: '#B64107',
  },
  settingActionIcon: {
    color: '#57636C',
    fontSize: 24,
  },
  notificationOptions: {
    marginTop: 10,
  },
});

export default UserProfile_Client;
