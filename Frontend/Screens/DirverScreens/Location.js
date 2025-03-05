import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, UrlTile, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import polyline from 'polyline-encoded';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [heading, setHeading] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [route, setRoute] = useState([]);
  const mapRef = useRef(null);

  const destinationCoords = {
    latitude: -0.2293,
    longitude: -78.4100,
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      Location.watchHeadingAsync(({ trueHeading }) => {
        setHeading(trueHeading);
      });
    })();
  }, []);

  const centerMapOnLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    mapRef.current.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const fetchRoute = async (destLat, destLng) => {
    if (!location) {
      setErrorMsg('Waiting for current location...');
      return;
    }

    const startLat = location.coords.latitude;
    const startLng = location.coords.longitude;

    const url = `http://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${destLng},${destLat}?overview=full&geometries=polyline`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const points = polyline.decode(data.routes[0].geometry);
        const routeCoords = points.map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }));
        setRoute(routeCoords);
        mapRef.current.fitToCoordinates(routeCoords, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      } else {
        setErrorMsg('No routes found');
      }
    } catch (error) {
      setErrorMsg('Error fetching route');
      console.error(error);
    }
  };

  const handleStartTrip = () => {
    fetchRoute(destinationCoords.latitude, destinationCoords.longitude);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location ? location.coords.latitude : -0.3317,
          longitude: location ? location.coords.longitude : -78.4517,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
        />
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
            flat={true}
          >
            <View style={{ alignItems: 'center' }}>
              <View style={{ ...styles.shadowCircle, transform: [{ rotate: `${heading}deg` }] }} />
              <MaterialCommunityIcons name="map-marker" size={40} color="#007AFF" />
            </View>
          </Marker>
        )}
        {route.length > 0 && (
          <>
            <Polyline
              coordinates={route}
              strokeColor="#4285F4" // color de la línea
              strokeWidth={3}
            />
            <Marker
              coordinate={destinationCoords}
              title="Destino"
            />
          </>
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
      {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    borderRadius: 10,
    margin: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationButton: {
    flexDirection: 'row',
    backgroundColor: '#4285F4',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  locationButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
  startButton: {
    flexDirection: 'row',
    backgroundColor: '#34A853',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 5,
  },
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
  shadowCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: '#007AFF',
    opacity: 0.3,
    marginBottom: -48,
  },
});

export default MapScreen;
