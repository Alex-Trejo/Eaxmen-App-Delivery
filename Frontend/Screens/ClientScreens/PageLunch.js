import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import axios from 'axios';
import { host } from '../../Host';

const almuerzos = require('../../assets/favicon.png');

export default function AlmuerzosblancoWidget() {
  const [refresh, setRefresh] = useState(false);
  const [pedido, setPedido] = useState(1);
  const [selectedSoup, setSelectedSoup] = useState('');
  const [selectedMainDish, setSelectedMainDish] = useState('');
  const [selectedDessert, setSelectedDessert] = useState('');
  const [notes, setNotes] = useState('');
  const [soups, setSoups] = useState([]);
  const [mainDishes, setMainDishes] = useState([]);
  const [desserts, setDesserts] = useState([]);

  useEffect(() => {
    fetchLunchesByCategory('SOPA', setSoups);
    fetchLunchesByCategory('SEGUNDO', setMainDishes);
    fetchLunchesByCategory('POSTRE', setDesserts);
  }, []);

  const fetchLunchesByCategory = async (category, setData) => {
    try {
      const response = await axios.get(`http://${host}:5000/api/lunches/category/${category}`);
      setData(response.data);
    } catch (error) {
      console.error(`Error al obtener almuerzos de la categoría ${category}`, error);
    }
  };

  const handleRefresh = () => {
    setRefresh(true);
    fetchLunchesByCategory('SOPA', setSoups);
    fetchLunchesByCategory('SEGUNDO', setMainDishes);
    fetchLunchesByCategory('POSTRE', setDesserts);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const handleBackPress = () => {
    console.log("Regresar");
    handleRefresh();
  };

  const increasePedido = () => {
    if (pedido < 10) {
      setPedido(pedido + 1);
    }
  };

  const decreasePedido = () => {
    if (pedido > 1) {
      setPedido(pedido - 1);
    }
  };

  const handleSoupSelect = (soup) => {
    setSelectedSoup(soup);
  };

  const handleMainDishSelect = (mainDish) => {
    setSelectedMainDish(mainDish);
  };

  const handleDessertSelect = (dessert) => {
    setSelectedDessert(dessert);
  };

  const handleAdd = () => {
    const order = {
      soup: selectedSoup,
      mainDish: selectedMainDish,
      dessert: selectedDessert,
      quantity: pedido,
      notes: notes,
    };

    console.log("Orden:", order);

    setSelectedSoup('');
    setSelectedMainDish('');
    setSelectedDessert('');
    setPedido(1);
    setNotes('');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={almuerzos} />
        </View>

        <View style={styles.contentAd}>
          <View style={[styles.flutterContainerAd, styles.centeredText]}>
            <View style={styles.flutterRow}>
              <Text style={styles.flutterLeftText}>Almuerzo de hoy día:</Text>
              <View style={styles.flutterDivider} />
              <Text style={styles.centeredTextPrice}>$3,99</Text>
            </View>
            <Text style={styles.flutterText}>Sopa + Plato Fuerte + Bebida</Text>
          </View>
        </View>

        {soups.length > 0 && (
          <View style={styles.contentSoup}>
            <View style={styles.flutterContainer}>
              <Text style={styles.textLeft}>Elige tu elección de sopa</Text>
              <Text style={styles.textLeftOption}>Elige 1 opción:</Text>
              <View style={styles.soupOptions}>
                {soups.map((soup, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.soupOption,
                      selectedSoup === soup.name && styles.selectedSoupOption,
                    ]}
                    onPress={() => handleSoupSelect(soup.name)}
                  >
                    <View style={styles.soupInfoContainer}>
                      <View style={styles.soupTextContainer}>
                        <Text style={styles.soupText}>{soup.name}</Text>
                        <Text style={styles.subtitleText}>{soup.description}</Text>
                      </View>
                      <Entypo
                        name={selectedSoup === soup.name ? "check" : "circle"}
                        size={24}
                        color={selectedSoup === soup.name ? '#B64107' : 'black'}
                        style={styles.circleIcon}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        {mainDishes.length > 0 && (
          <View style={styles.contentMainDish}>
            <View style={styles.flutterContainer}>
              <Text style={styles.textLeft}>Elige tu elección de plato fuerte</Text>
              <Text style={styles.textLeftOption}>Elige 1 opción:</Text>
              <View style={styles.mainDishOptions}>
                {mainDishes.map((mainDish, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.soupOption,
                      selectedMainDish === mainDish.name && styles.selectedSoupOption,
                    ]}
                    onPress={() => handleMainDishSelect(mainDish.name)}
                  >
                    <View style={styles.soupInfoContainer}>
                      <View style={styles.soupTextContainer}>
                        <Text style={styles.soupText}>{mainDish.name}</Text>
                        <Text style={styles.subtitleText}>{mainDish.description}</Text>
                      </View>
                      <Entypo
                        name={selectedMainDish === mainDish.name ? "check" : "circle"}
                        size={24}
                        color={selectedMainDish === mainDish.name ? '#B64107' : 'black'}
                        style={styles.circleIcon}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        {desserts.length > 0 && (
          <View style={styles.contentDessert}>
            <View style={styles.flutterContainer}>
              <Text style={styles.textLeft}>¿Deseas añadir un postre?</Text>
              <Text style={styles.textLeftOption}>+$0.50</Text>
              <View style={styles.mainDishOptions}>
                {desserts.map((dessert, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.soupOption,
                      selectedDessert === dessert.name && styles.selectedSoupOption,
                    ]}
                    onPress={() => handleDessertSelect(dessert.name)}
                  >
                    <View style={styles.soupInfoContainer}>
                      <View style={styles.soupTextContainer}>
                        <Text style={styles.soupText}>{dessert.name}</Text>
                        <Text style={styles.subtitleText}>{dessert.description}</Text>
                      </View>
                      <Entypo
                        name={selectedDessert === dessert.name ? "check" : "circle"}
                        size={24}
                        color={selectedDessert === dessert.name ? '#B64107' : 'black'}
                        style={styles.circleIcon}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.content}>
        <View style={styles.flutterContainer}>
          <View style={styles.row}>
            <Text style={styles.textLeft}>Total</Text>
            <View style={styles.divider} />
            <Text style={styles.textRight}>$3,99</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.counterContainer}>
              <TouchableOpacity style={styles.counterButton} onPress={decreasePedido}>
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{pedido}</Text>
              <TouchableOpacity style={styles.counterButton} onPress={increasePedido}>
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={styles.addButtonText}>Agregar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f4f8',
  },
  appBar: {
    backgroundColor: '#B64107',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 16,
  },
  contentSoup: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 50, // Agregamos un margen superior
  marginBottom: 10, // Agregamos un margen inferior
  },
  contentMainDish: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10, // Agregamos un margen superior
    marginBottom: 5, // Agregamos un margen inferior
  },
  textInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
  },
  contentNote: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10, // Agregamos un margen superior
    marginBottom: 5, // Agregamos un margen inferior
  },
  contentDessert: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10, // Agregamos un margen superior
    marginBottom: 10, // Agregamos un margen inferior
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  contentAd: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: -32,
  },
  flutterContainer: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 17,
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3F2EB',
  },
  flutterContainerAd: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    marginBottom: 'none',
    borderWidth: 1,
    borderColor: '#F3F2EB',
  },
  centeredText: {
    fontSize: 21,
    letterSpacing: 0.3,
    alignItems: 'center',
  },
  centeredTextPrice: {
    fontSize: 21,
    letterSpacing: 0,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  flutterLeftText: {
    fontSize: 18,
    letterSpacing: 0,
    marginRight: 8,
  },
  textLeft: {
    fontSize: 18,
    letterSpacing: 0,
    marginRight: 8,
  },
  textLeftOption: {
    fontSize: 12,
    letterSpacing: 1,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  textLeftOptionSoup: {
    fontSize: 12,
    
  },
  flutterRightText: {
    fontSize: 18,
    letterSpacing: 0,
  },
  textRight: {
    fontSize: 18,
    letterSpacing: 0,
  },
  counterText: {
    fontSize: 18,
    letterSpacing: 0,
    marginRight: 8,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: 'accent4',
    marginHorizontal: 8,
  },
  addButton: {
    backgroundColor: '#FEBD3D',
    borderRadius: 27,
    paddingVertical: 10,
    paddingHorizontal: 26,
    elevation: 9,
  },
  addButtonText: {
    fontSize: 16,
    color: 'white',
    letterSpacing: 0,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  counterButton: {
    paddingHorizontal: 22,
    paddingVertical: 5,
    marginHorizontal: 3,
  },
  counterButtonText: {
    fontSize: 25,
    color: 'black',
  },
  counterValue: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  image: {
    width: 351,
    height: 200,
    borderRadius: 9,
    borderColor: 'white',
    borderWidth: 10,
  },
  imageSoup: {
    width: 15,
    height: 10,
    borderRadius: 9,
    borderColor: 'white',
    borderWidth: 10,
  },
  soupOptions: {
    flexDirection: 'column',
   
    marginTop: 20,
  },
  mainDishOptions: {
    flexDirection: 'column',
   
    marginTop: 20,
  },
  soupOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  selectedSoupOption: {
    borderWidth: 2,
    padding: 19,
    borderColor: '#B64107',
  },
  
  soupImage: {
    width: 90,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },
  soupImageContainer: {
    alignItems: 'flex-end',
    marginTop: 15,
    marginBottom: 20,
  },
  soupText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  circleIcon: {
    marginLeft: 261,
    marginTop: -35,
  },
  smallerIcon: {
    width: 10,
    height: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 200,

  },
  fixedContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
}
);

