import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialIcons';
const almuerzos = require('../../assets/favicon.png');
const sabrosura = require('../../assets/favicon.png');


export default function AlmuerzosblancoWidget() {
  const Linking = require('react-native').Linking;

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={sabrosura} />
        </View>

        <View style={styles.contentAd}>
          <View style={[styles.flutterContainerAd, styles.centeredText]}>
            <View style={styles.flutterRow}>
              <Text style={styles.centeredTextPrice}>Contactanos</Text>
              <View style={styles.flutterDivider} />
              <Text style={styles.flutterText}>¿Alguna pregunta u observación?</Text>
              <Text style={styles.centeredText}>¡Escribenos un mensaje!</Text>
            </View>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.divider} />

        <View style={styles.contentAd}>
          <View style={[styles.flutterContainerAd, styles.centeredText]}>
            <Text style={styles.centeredTextPrice}>Dr. Luis Simbaña Taipe</Text>
            <TouchableOpacity onPress={() => Linking.openURL('tel:+593 99 816 0293')}>
              <Icon name="phone" size={30} color="orange" />
            </TouchableOpacity>
            <Text>+593 99 816 0293</Text>
            <View style={styles.divider} />
            <TouchableOpacity onPress={() => Linking.openURL('mailto:prowessagronomia@gmail.com')}>
              <Icon name="mail" size={30} color="orange" />
            </TouchableOpacity>
            <Text>prowessagronomia@gmail.com</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.divider} />
        </View>
        <View style={styles.flutterDivider} />
        <View style={styles.contentAd}>
          <View style={[styles.flutterContainerAd, styles.centeredText]}>
            <Text style={styles.centeredTextPrice}>Redes sociales</Text>
            <View style={styles.divider} />
            <View style={styles.row}>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com')}>
                <Icon name="facebook" size={30} color="orange" />
              </TouchableOpacity>
              <Text style={styles.centeredText}>    </Text>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.tiktok.com')}>
                <Icon name="tiktok" size={30} color="orange" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView >
    </View >

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
