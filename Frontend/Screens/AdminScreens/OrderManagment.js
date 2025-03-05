import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
const iconUser = require('../../assets/user.png');
const almuerzos = require('../../assets/almuerzos.png');
const encebollado = require('../../assets/encebollado.png');
const fastFood = require('../../assets/fastFood.jpeg');
const iconArrow = require('../../assets/right-arrow.png');
const promociones = require('../../assets/promociones.png');
import OrdersCard from '../../Components/OrdersCard';
import InProgressDishCard from '../../Components/InProgressDishCard';

export default function OrderManagment() {
  const [orders, setOrders] = useState([
    { dishName: 'Encebollado', user: 'usuario', quantity: 10, status: 'En espera' },
    { dishName: 'Salchipapa', user: 'usuario1', quantity: 1, status: 'En espera' },
    { dishName: 'Encebollado', user: 'usuario2', quantity: 2, status: 'En espera' },
    { dishName: 'Encebollado', user: 'usuario3', quantity: 2, status: 'En espera' },
    { dishName: 'Encebollado', user: 'usuario4', quantity: 1, status: 'En espera' },
    { dishName: 'Salchipapa', user: 'usuario1', quantity: 1, status: 'En espera' },
    { dishName: 'Encebollado', user: 'usuario2', quantity: 2, status: 'En proceso' },
    { dishName: 'Encebollado', user: 'usuario3', quantity: 2, status: 'Enviado' },
    { dishName: 'Encebollado', user: 'usuario4', quantity: 1, status: 'En espera' },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('En espera');

  const handleMoveToInProcess = (index) => {
    console.log('Se presionó el visto');
    const newOrders = orders.map((order, i) => 
      i === index ? { ...order, status: 'En proceso' } : order
    );
    setOrders(newOrders);
  };

  const filteredOrders = orders.filter(order => order.status === selectedCategory);

  return (
    <View style={styles.container}>
      <View style={styles.containerBody}>
        <View style={styles.categories}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              console.log('Se presionó En espera');
              setSelectedCategory('En espera');
            }}
          >
            <Text>En espera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              console.log('Se presionó En proceso');
              setSelectedCategory('En proceso');
            }}
          >
            <Text>En proceso</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              console.log('Se presionó Enviado');
              setSelectedCategory('Enviado');
            }}
          >
            <Text>Enviado</Text>
          </TouchableOpacity>

          {/* Agrega más elementos según sea necesario */}
        </View>
        <ScrollView>
          <View style={styles.containerListView}>
            {filteredOrders.map((order, index) => (
              order.status === 'En proceso' ? (
                <InProgressDishCard
                  key={index}
                  dishName={order.dishName}
                  user={order.user}
                  quantity={order.quantity}
                />
              ) : (
                <OrdersCard
                  key={index}
                  dishName={order.dishName}
                  user={order.user}
                  quantity={order.quantity}
                  onCheckPress={() => handleMoveToInProcess(index)} // Añade esta línea para manejar el evento de check
                />
              )
            ))}
          </View>
        </ScrollView>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  //**Imagen**
  platosAnuncio: {
    position: 'absolute',
    width: '100%',
    height: 200,
    borderRadius: 10,
  },

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

  smallerIcon: {
    width: 10,
    height: 10,

  },
  menuComida: {
    width: 125,
    height: 100,
    borderRadius: 10,
  },

  //**Contenedores**
  smallBox: {
    width: 100,
    height: 100,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25, // Opacidad de la sombra
    shadowRadius: 10.84, // Radio de la sombra
    elevation: 10,
  },
  tallBox: {
    width: 100,
    height: 210,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginLeft: 15,
    marginTop: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25, // Opacidad de la sombra
    shadowRadius: 10.84,
    elevation: 10, // Radio de la sombra
  },
  containerColumn: {
    flexDirection: 'column',
    paddingTop: 15,
    paddingRight: 15,
  },
  rowOptions: {
    flexDirection: 'row',
  },

  container20padding: {
    padding: 20,
    margin: 0,
  },

  containerProductColumn: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: 10,
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

  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },

  scrollViewContent: {
    paddingHorizontal: 10,
  },

  categories: {
    marginTop: 10,
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
    shadowColor: '#000',
    backgroundColor: '#f1f4f8',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25, // Opacidad de la sombra
    shadowRadius: 10.84,
  },

  container: {
    flexWrap: 'nowrap',
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25, // Opacidad de la sombra
    shadowRadius: 10.84, // Radio de la sombra
  },
  containerListView: {
    margin: 15,
    borderRadius: 10,
    alignItems: 'stretch',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25, // Opacidad de la sombra
    shadowRadius: 10.84, // Radio de la sombra

    elevation: 5, // Elevación (solo para Android)
  },

  containerTop: {
    alignSelf: 'flex-end',
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',

  },
  containerBody: {
    flex: 1,
    backgroundColor: '#f1f4f8',
  },

  //**Texto** 
  titleText: {
    color: '#000',
    fontSize: 25,
  },

  titleTextAbsolute: {
    position: 'absolute',
    color: '#000',
    fontSize: 25,
  },

  titleTextMenu: {
    alignSelf: 'flex-start',
    paddingBottom: 0,
    color: '#000',
    fontSize: 25,
  },

  normalText: {
    color: '#57636C',
    fontSize: 15,
    alignSelf: 'center',
    padding: 10,
  },
  normalTextAbsolute: {
    position: 'absolute',
    color: '#000',
    fontSize: 15,
    alignSelf: 'flex-start',
    padding: 20,
  },
  secondaryText: {
    color: '#57636C',
    fontSize: 15,
    alignSelf: 'flex-start',

  },

  item: {
    marginBottom: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25, // Opacidad de la sombra
    shadowRadius: 10.84, // Radio de la sombra

    elevation: 10,
  },

  itemMenu: {
    marginBottom: 10,
    marginRight: 10,

  },

});