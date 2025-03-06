import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
const iconUser = require('../../assets/user.png');
const pedidos = require('../../assets/pedidos.png');
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect, useRef } from 'react';
import MapView, { Marker, UrlTile, Polyline } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

export default function HomePageDriver() {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([
    { id: 1, text: 'Pedido #123 está pendiente' },
    { id: 2, text: 'Pedido #124 está pendiente' },
    { id: 3, text: 'Pedido #125 está pendiente' }
  ]);
  const [location, setLocation] = useState(null);
  const [heading, setHeading] = useState(0);
  const [route, setRoute] = useState([]);
  const mapRef = useRef(null);

  const handleDismissNotification = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const handleNavigateToOrdersMotor = () => {
    navigation.navigate('OrderMotor');
  };

  const handleNavigateToLocation = () => {
    navigation.navigate('Location');
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

  return (
    <View style={styles.container}>
      <View style={styles.containerRow}>
        <Text style={styles.titleText}>Bienvenido</Text>
        <Image source={iconUser} style={styles.icon} />
      </View>

      {/* Botones */}
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Aceptar Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNavigateToOrdersMotor}>
          <Text style={styles.buttonText}>Ir a Pedidos</Text>
        </TouchableOpacity>
      </View> */}

      <View style={styles.containerBody}>
        <ScrollView>
          <View style={styles.containerListView}>
            <Image source={pedidos} style={styles.almuerzos} />
          </View>

          {/* Notificaciones de pedidos pendientes */}
          {/* <View style={styles.containerListView}>
            <View style={styles.container20padding}>
              <Text style={styles.titleTextMenu}>Pedidos</Text>
              <Text style={styles.secondaryText}>Notificaciones de pedidos pendientes</Text>
            </View>

            {orders.map(order => (
              <View key={order.id} style={styles.containerProduct}>
                <View style={styles.notificationIconContainer}>
                  <Text style={styles.notificationIcon}>!</Text>
                </View>
                <View style={styles.containerProductColumn}>
                  <Text style={styles.secondaryText}>{order.text}</Text>
                </View>
                <View style={styles.notificationActions}>
                  <TouchableOpacity onPress={() => console.log('Visto')}>
                    <Text style={styles.actionText}>✔️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDismissNotification(order.id)}>
                    <Text style={styles.dismissText}>X</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View> */}

          {/* Mapa */}
          <TouchableOpacity style={styles.mapContainer} onPress={handleNavigateToLocation}>
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
                    strokeColor="#4285F4"
                    strokeWidth={3}
                  />
                  <Marker
                    coordinate={destinationCoords}
                    title="Destino"
                  />
                </>
              )}
            </MapView>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  //***Imagen***
  almuerzos: {
    width: '94%',
    height: 200,
    borderRadius: 10,
    margin: 10,
  },

  icon: {
    width: 25,
    height: 25,
  },

  notificationIcon: {
    color: '#fff',
    backgroundColor: '#ee8b60',
    borderRadius: 10,
    textAlign: 'center',
    width: 20,
    height: 20,
    lineHeight: 20,
    marginRight: 10,
  },

  //***Contenedores***
  containerNotifications: {
    padding: 20,
  },

  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10.84,
    elevation: 10,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10.84,
  },

  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },

  containerBody: {
    flex: 1,
    backgroundColor: '#f1f4f8',
  },

  containerListView: {
    margin: 15,
    borderRadius: 10,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10.84,
    elevation: 10,
  },

  container20padding: {
    padding: 20,
    margin: 0,
  },

  containerProductColumn: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: 10,
    flex: 1,
  },
  containerProduct: {
    flexDirection: 'row',
    marginLeft: 20,
    padding: 10,
    borderBottomColor: '#E0E3E7',
    borderBottomWidth: 0.5,
    lineHeight: 1,
    borderLeftWidth: 2,
    borderLeftColor: '#ee8b60',
    alignItems: 'center',
    borderLeftWidth: 10, // Ajustar el ancho de la línea
    borderLeftColor: '#ee8b60',
  },
  notificationIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  notificationActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  //***Texto***
  titleText: {
    color: '#000',
    fontSize: 25,
  },

  titleTextMenu: {
    alignSelf: 'flex-start',
    paddingBottom: 0,
    color: '#000',
    fontSize: 25,
  },

  secondaryText: {
    color: '#57636C',
    fontSize: 15,
    alignSelf: 'flex-start',
  },

  dismissText: {
    color: '#ee8b60',
    fontSize: 15,
    paddingHorizontal: 10,
  },

  actionText: {
    color: '#000',
    fontSize: 15,
    paddingHorizontal: 10,
  },

  // Botones
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#B64107',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },

  // Notificaciones
  notifications: {
    maxHeight: 100, // Reducción de tamaño
  },

  // Mapa
  mapContainer: {
    height: 200,
    margin: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  shadowCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 255, 0.3)',
    position: 'absolute',
    top: 8,
    left: 8,
  },
});
