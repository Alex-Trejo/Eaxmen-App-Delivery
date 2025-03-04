
# APP-MOVIL-PRW

Hemos desarrollado una aplicación móvil innovadora para entregas que automatiza procesos en la gestión de pedidos online. Esta aplicación facilita el transporte de productos mediante diversos medios, como motocicletas, camiones y camionetas, utilizando una página web como plataforma central.

## Estado del proyecto

El proyecto está actualmente en desarrollo activo, donde estamos implementando las funcionalidades detalladas en el alcance del proyecto.

## Requisitos del entorno de desarrollo

Antes de comenzar, asegúrate de tener instalados los siguientes componentes:

- **Node.js:** Debes tener Node.js instalado en tu sistema. Puedes descargar e instalar la última versión desde [la página oficial de Node.js](https://nodejs.org/).


- **Yarn:** Yarn es un gestor de paquetes alternativo que puede utilizarse en lugar de npm. Puedes instalarlo globalmente con el siguiente comando:
```
npm install -g yarn
```

- **Expo CLI:** Expo CLI es una herramienta necesaria para desarrollar con Expo. Puedes instalarla globalmente con el siguiente comando:
```
npm install -g expo-cli
```

# Guía de Instalación y Gestión de Dependencias

## Instalación de Node.js

Node.js es un entorno de ejecución de JavaScript que permite ejecutar aplicaciones JavaScript fuera del navegador. Sigue estos pasos para instalarlo:

1. Ve a la página oficial de Node.js.
2. Descarga la última versión disponible.
3. Ejecuta el instalador y sigue las instrucciones.

## Instalación de Yarn
Yarn es otro administrador de paquetes para JavaScript, para intalarlo usa el siguiente comando:
```
npm install -g yarn
```

## Instalación de Expo CLI
Expo CLI es una herramienta de línea de comandos para desarrollar y construir aplicaciones con Expo. Para instalarla, usa el siguiente comando:
```
npm install -g expo-cli
```

## Instalación de Dependencias del Proyecto
Para instalar todas las dependencias del proyecto listadas en package.json, navega a la raíz del proyecto y ejecuta el siguiente comando:
```
yarn install
```

## Ejecución:

- **Iniciar el servidor de desarrollo:**
  ```
  npx expo start -c
  ```
  Esto iniciará el servidor de desarrollo de Expo y abrirá una ventana en tu navegador con un código QR.
- **Escanear el código QR:**
  Abre la aplicación Expo Go en tu dispositivo móvil y escanea el código QR que aparece en la ventana del navegador. Esto cargará la aplicación en tu dispositivo para que puedas probarla.

## Uso de NavigationContainer:
Asegúrate de envolver tus componentes de navegación con `NavigationContainer` de la siguiente manera:
```javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      {/* Aquí va tu navegación */}
    </NavigationContainer>
  );
};

export default App;
```
Para más información, consulta [la documentación de NavigationContainer.](https://reactnavigation.org/docs/navigation-container/)

## Tecnologías utilizadas

- Firebase
- Expo
- React Native
- React Redux
- React Navigation
- Axios
- React Native Elements
- React Native Gesture Handler
- React Native Maps
- React Native Safe Area Context
- React Native Screens
- Font Awesome

## Dependencias
Estas son las dependencias actuales del proyecto, según el archivo package.json:
- @fortawesome/free-solid-svg-icons: ^6.5.2
- @fortawesome/react-native-fontawesome: ^0.3.0
- @react-native-community/checkbox: ^0.5.17
- @react-native-community/geolocation: ^3.2.1
- @react-navigation/native: ^6.1.17
- @react-navigation/stack: ^6.3.29
- axios: ^1.7.2
- expo: ^51.0.9
- expo-image-picker: ~15.0.5
- expo-location: ^17.0.1
- expo-status-bar: ~1.12.1
- polyline: ^0.2.0
- polyline-encoded: ^0.0.9
- react: 18.2.0
- react-native: ^0.74.1
- react-native-elements: ^3.4.3
- react-native-gesture-handler: ^2.16.2
- react-native-maps: ^1.15.4
- react-native-safe-area-context: ^4.10.1
- react-native-screens: ^3.31.1

## Dependencias de Desarrollo
- @babel/core: ^7.20.0

## Bugs conocidos y posibles correcciones

- Actualmente no hay bugs conocidos.

## Derechos de autor 

© 2025 Alex Trejo


