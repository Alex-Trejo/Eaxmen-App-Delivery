import React, { useState, useEffect } from 'react';
import { StatusBar, TextInput, TouchableOpacity, Text, View, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { host } from '../Host';
import * as Animatable from 'react-native-animatable';

const iconUser = require('../assets/user.png');
const eyeIcon = require('../assets/eye.png');
const eyeSlashIcon = require('../assets/eye-slash.png');
const logo = require('../assets/favicon.png');

export default function Login() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false); // Nuevo estado para la validación del email
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (isRegistered) {
      setNotificationVisible(true);
      const timer = setTimeout(() => {
        setNotificationVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isRegistered]);

  const handleAuthentication = async () => {
    try {
      let hasError = false;

      if (isRegistering) {
        if (username.trim() === '') {
          setUsernameError('El nombre de usuario es obligatorio');
          hasError = true;
        }
        if (email.trim() === '') {
          setEmailError('El correo electrónico es obligatorio');
          hasError = true;
        }
        if (phoneNumber.trim() === '') {
          setPhoneNumberError('El número de teléfono es obligatorio');
          hasError = true;
        }
        if (password.trim() === '') {
          setPasswordError('La contraseña es obligatoria');
          hasError = true;
        } else if (!isPasswordSecure(password)) {
          setPasswordError('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números');
          hasError = true;
        }
        if (confirmPassword.trim() === '') {
          setConfirmPasswordError('La confirmación de la contraseña es obligatoria');
          hasError = true;
        } else if (password !== confirmPassword) {
          setConfirmPasswordError('Las contraseñas no coinciden');
          hasError = true;
        }

        if (!hasError) {
          // Verificar existencia de correo electrónico
          // const emailExistsResponse = await axios.get(`${host}/api/users/exists?email=${email}`);
          // const emailExists = emailExistsResponse.data;

          // Actualizar el estado de validación del email
          // setIsEmailValid(!emailExists);

          // if (!emailExists) {
            await axios.post(`${host}/api/auth/register`, {
              username,
              email,
              phoneNumber,
              password,
              role: 'cliente'
            });
            setIsRegistered(true);
          // } else {
          //   setEmailError('El correo electrónico ya está registrado');
          // }
        }
      } else {
        if (email.trim() === '') {
          setEmailError('El correo electrónico es obligatorio');
          hasError = true;
        }
        if (password.trim() === '') {
          setPasswordError('La contraseña es obligatoria');
          hasError = true;
        }

        if (!hasError) {
          const response = await axios.post(`${host}/api/auth/login`, {
            email,
            password,
          });
          redirectToHomePage(response.data.rol);
        }
      }
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error', 'Ocurrió un error al autenticar');
      setIsRegistered(false);
    }
  };

  const redirectToHomePage = (role) => {
    switch (role) {
      case 'admin':
        navigation.navigate('HomePageAdmin');
        break;
      case 'cliente':
        navigation.navigate('HomePageClient');
        break;
      case 'motorizado':
        navigation.navigate('HomePageDriver');
        break;
      default:
        Alert.alert('Error', 'Rol de usuario no reconocido');
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    clearErrors();
    setIsRegistered(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const clearErrors = () => {
    setUsernameError('');
    setEmailError('');
    setPhoneNumberError('');
    setPasswordError('');
    setConfirmPasswordError('');
  };

  const handleUsernameChange = (text) => {
    const filteredText = text.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚüÜ._-]/g, '');
    setUsername(filteredText);
  };

  const handlePhoneNumberChange = (text) => {
    const formattedPhoneNumber = text.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(formattedPhoneNumber);
  };

  const isPasswordSecure = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Correo electrónico inválido');
      setIsEmailValid(false);
      return;
    }

    // const myHeaders = new Headers();
    // myHeaders.append("apikey", "6f28NE62Vxina2dvjYPso7hnuJNetMhd");

    // const requestOptions = {
    //   method: 'GET',
    //   redirect: 'follow',
    //   headers: myHeaders
    // };

    // try {
    //   const response = await fetch(`https://api.apilayer.com/email_verification/check?email=${email}`, requestOptions);
    //   const result = await response.json();

    //   if (result.format_valid && result.smtp_check) {
    //     setEmailError('');
    //     setIsEmailValid(true);
    //   } else {
    //     setEmailError('Correo electrónico no válido o no existe');
    //     setIsEmailValid(false);
    //   }
    // } catch (error) {
    //   console.error('Error:', error.message);
    //   setEmailError('Ocurrió un error al validar el correo electrónico');
    //   setIsEmailValid(false);
    // }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Animatable.View animation="zoomIn">
          <Image source={logo} style={styles.logo} />
        </Animatable.View>
        <ActivityIndicator size="large" color="#febd3d" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={[styles.logo, isRegistering && { marginTop: -50 }]} />
      <View style={styles.containerRow}>
        <TouchableOpacity onPress={toggleMode} style={styles.alignLeft}>
          <Text style={[styles.titleText, { color: '#febd3d' }]}>
            {isRegistering ? 'Registrarse' : 'Log In'}
          </Text>
        </TouchableOpacity>
        <Image source={iconUser} style={styles.icon} />
        <TouchableOpacity onPress={toggleMode} style={styles.alignRight}>
          <Text style={[styles.titleText, { color: '#febd3d' }]}>
            {isRegistering ? 'Log In' : 'Registrarse'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.loginForm, isRegistering && { marginTop: -20 }]}>
        {!isRegistering && (
          <Text style={styles.welcomeText}>Bienvenido de vuelta</Text>
        )}
        {isRegistering && (
          <Text style={styles.subtitleText}>Completa los siguientes datos</Text>
        )}
        {isRegistering && (
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, usernameError ? styles.inputError : null]}
              placeholder="Nombre de usuario"
              value={username}
              onChangeText={handleUsernameChange}
              onBlur={() => {
                if (username.trim() === '') {
                  setUsernameError('El nombre de usuario es obligatorio');
                } else {
                  setUsernameError('');
                }
              }}
            />
            {usernameError ? (
              <Text style={styles.errorText}>{usernameError}</Text>
            ) : null}
          </View>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, emailError ? styles.inputError : null]}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={(text) => setEmail(text)}
            onBlur={validateEmail}
            autoCapitalize="none"
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
        </View>
        {isRegistering && (
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, phoneNumberError ? styles.inputError : null]}
              placeholder="Número de teléfono"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              onBlur={() => {
                if (phoneNumber.trim() === '') {
                  setPhoneNumberError('El número de teléfono es obligatorio');
                } else {
                  setPhoneNumberError('');
                }
              }}
              keyboardType="phone-pad"
            />
            {phoneNumberError ? (
              <Text style={styles.errorText}>{phoneNumberError}</Text>
            ) : null}
          </View>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, passwordError ? styles.inputError : null]}
            placeholder="Contraseña"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!showPassword}
            onBlur={() => {
              if (password.trim() === '') {
                setPasswordError('La contraseña es obligatoria');
              } else if (!isPasswordSecure(password)) {
                setPasswordError('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números');
              } else {
                setPasswordError('');
              }
            }}
          />
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={togglePasswordVisibility}
          >
            <Image source={showPassword ? eyeSlashIcon : eyeIcon} style={styles.icon} />
          </TouchableOpacity>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>
        {isRegistering && (
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, confirmPasswordError ? styles.inputError : null]}
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={!showConfirmPassword}
              onBlur={() => {
                if (confirmPassword.trim() === '') {
                  setConfirmPasswordError('La confirmación de la contraseña es obligatoria');
                } else if (password !== confirmPassword) {
                  setConfirmPasswordError('Las contraseñas no coinciden');
                } else {
                  setConfirmPasswordError('');
                }
              }}
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={toggleConfirmPasswordVisibility}
            >
              <Image source={showConfirmPassword ? eyeSlashIcon : eyeIcon} style={styles.icon} />
            </TouchableOpacity>
            {confirmPasswordError ? (
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
            ) : null}
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
          <Text style={styles.buttonText}>
            {isRegistering ? 'Registrarse' : 'Log In'}
          </Text>
        </TouchableOpacity>
        {notificationVisible && (
          <Animatable.View animation="slideInDown" style={styles.notification}>
            <Text style={styles.notificationText}>
              ¡Registro exitoso! Por favor, inicia sesión.
            </Text>
          </Animatable.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 13,
    marginBottom: 20,
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loginForm: {
    width: '80%',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 15,
    width: '100%',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    width: '100%',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#febd3d',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notification: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  notificationText: {
    color: '#fff',
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
    marginTop: -2,
  },
  passwordToggle: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
    marginBottom: 20,
  },
  alignLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  alignRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
