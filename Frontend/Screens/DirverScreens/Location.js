import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import polyUtil from '@mapbox/polyline';

const MapScreen = () => {
  const [location, setLocation] = useState(null); // Ubicación inicial del dispositivo
  const [heading, setHeading] = useState(0); // Dirección del dispositivo
  const [errorMsg, setErrorMsg] = useState(null); // Mensaje de error
  const [route, setRoute] = useState([]); // Coordenadas de la ruta
  const [driverPosition, setDriverPosition] = useState(null); // Posición del repartidor
  const mapRef = useRef(null); // Referencia al mapa

  // Ubicaciones estáticas del restaurante y del cliente
  const restaurantLocation = { latitude: -0.30795225, longitude: -78.4494174643001 };
  const clientLocation = { latitude: -0.3317, longitude: -78.4517 };

  // Obtener permisos y ubicación inicial del dispositivo
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso denegado para acceder a la ubicación');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      Location.watchHeadingAsync(({ trueHeading }) => setHeading(trueHeading));
    })();
  }, []);

  // Función para decodificar la polilínea
  const decodePolyline = (encoded) => {
    const decoded = polyUtil.decode(encoded);
    return decoded.map(point => ({
      latitude: point[0],
      longitude: point[1],
    }));
  };

  // Función para obtener la ruta usando la Routes API de Google Maps
  const fetchRoute = async (origin, destination) => {
    const url = "https://routes.googleapis.com/directions/v2:computeRoutes";
    const body = {
      origin: {
        location: {
          latLng: {
            latitude: origin.latitude,
            longitude: origin.longitude,
          },
        },
      },
      destination: {
        location: {
          latLng: {
            latitude: destination.latitude,
            longitude: destination.longitude,
          },
        },
      },
      travelMode: "DRIVE",
    };

    try {
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": "AIzaSyBPrs3MmGpq2RFBlbdUPNtfkkOjh3nd3OQ", // Reemplaza con tu clave real
          "X-Goog-FieldMask": "routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline",
        },
      });

      if (response.data.routes && response.data.routes.length > 0) {
        const route = response.data.routes[0];
        const encodedPolyline = route.polyline.encodedPolyline;
        const routeCoords = decodePolyline(encodedPolyline);
        setRoute(routeCoords);
        mapRef.current.fitToCoordinates(routeCoords, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      } else {
        setErrorMsg("No se encontró ninguna ruta");
      }
    } catch (error) {
      if (error.response) {
        console.error("Detalles del error:", error.response.data);
        setErrorMsg(`Error: ${error.response.data.error.message}`);
      } else {
        console.error("Error general:", error.message);
        setErrorMsg(`Error: ${error.message}`);
      }
    }
  };

  // Iniciar el viaje y calcular la ruta
  const handleStartTrip = () => {
    if (!restaurantLocation.latitude || !restaurantLocation.longitude || !clientLocation.latitude || !clientLocation.longitude) {
      setErrorMsg("Coordenadas incompletas o inválidas");
      return;
    }
    fetchRoute(restaurantLocation, clientLocation);
  };

  // Actualizar la posición del repartidor en tiempo real
  useEffect(() => {
    if (route.length > 0) {
      const subscription = Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 1 },
        (newLocation) => {
          setDriverPosition({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
          });
        }
      );
      return () => subscription.then(sub => sub.remove());
    }
  }, [route]);

  // Centrar el mapa en la ubicación actual del dispositivo
  const centerMapOnLocation = async () => {
    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc);
    mapRef.current.animateToRegion({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location ? location.coords.latitude : -0.3317,
          longitude: location ? location.coords.longitude : -78.4517,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Marcador del restaurante */}
        <Marker coordinate={restaurantLocation} title="Restaurante" pinColor="blue" />
        {/* Marcador del cliente */}
        <Marker coordinate={clientLocation} title="Cliente" pinColor="green" />
        {/* Marcador del repartidor */}
        {driverPosition && (
          <Marker coordinate={driverPosition} title="Repartidor">
            <MaterialCommunityIcons name="motorbike" size={40} color="#FF5733" />
          </Marker>
        )}
        {/* Ruta calculada */}
        {route.length > 0 && (
          <Polyline coordinates={route} strokeColor="#4285F4" strokeWidth={3} />
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.locationButton} onPress={centerMapOnLocation}>
          <MaterialCommunityIcons name="account" size={24} color="white" />
          <Text style={styles.locationButtonText}>Mi Ubicación</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.startButton} onPress={handleStartTrip}>
          <MaterialCommunityIcons name="motorbike" size={24} color="white" />
          <Text style={styles.startButtonText}>Iniciar Viaje</Text>
        </TouchableOpacity>
      </View>
      {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1, borderRadius: 10, margin: 10 },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationButton: {
    flexDirection: 'row',
    backgroundColor: '#4285F4',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  locationButtonText: { color: '#fff', fontSize: 16, marginLeft: 5 },
  startButton: {
    flexDirection: 'row',
    backgroundColor: '#34A853',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  startButtonText: { color: '#fff', fontSize: 18, marginLeft: 5 },
  errorMsg: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    color: 'red',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
});

export default MapScreen;
