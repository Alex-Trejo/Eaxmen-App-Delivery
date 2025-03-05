import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useColorScheme, Image, FlatList, ScrollView } from 'react-native';
const iconUser = require('./assets/user.png');
const almuerzos = require('./assets/almuerzos.png');
const encebollado = require('./assets/encebollado.png');
const fastFood = require('./assets/fastFood.jpeg');
const iconArrow = require('./assets/right-arrow.png');
const platosAnuncio = require('./assets/platos.png');
const promociones = require('./assets/promociones.png');
import AppBar from '../Components/AppBar'; 
export default function AdminOrders() {
  return (
    
    <View style={styles.container}>
    <AppBar title="Pedidos" />

      <View>

      </View>

      <View style={styles.containerBody}>
      <View style={styles.categories}>
            <Text style={styles.item}>En espera</Text>
            <Text style={styles.item}>En proceso</Text>
            <Text style={styles.item}>Enviado</Text>
            {/* Agrega más elementos según sea necesario */}
          </View>
        <ScrollView>
          <View style={styles.containerListView}>
            <Text>
              
            </Text>
          </View>

          <View style={styles.containerListView}>
            <View style={styles.container20padding}>
              <Text style={styles.titleTextMenu}>Menú</Text>
              <Text style={styles.secondaryText}>Elige tu plato deseado</Text>
            </View>

            <View style={styles.containerProduct}>
              <Image source={encebollado} style={styles.menuComida} />
              <View style={styles.containerProductColumn}>
                <Text style={styles.secondaryText}>Hamburguesa</Text>
                <Text style={styles.itemMenu}>Con queso y papas</Text>
              </View>
              <Image source={iconArrow} style={styles.smallerIcon} />
            </View>

            <View style={styles.containerProduct}>
              <Image source={fastFood} style={styles.menuComida} />
              <View style={styles.containerProductColumn}>
                <Text style={styles.secondaryText}>Hamburguesa</Text>
                <Text style={styles.itemMenu}>Con queso y papas</Text>
              </View>
              <Image source={iconArrow} style={styles.smallerIcon} />
            </View>

            <View style={styles.containerProduct}>
              <Image source={fastFood} style={styles.menuComida} />
              <View style={styles.containerProductColumn}>
                <Text style={styles.secondaryText}>Hamburguesa</Text>
                <Text style={styles.itemMenu}>Con queso y papas</Text>
              </View>
              <Image source={iconArrow} style={styles.smallerIcon} />
            </View>

          </View>
        </ScrollView>
      </View>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({

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
    shadowOpacity: 0.25, 
    shadowRadius: 10.84, 
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
    shadowOpacity: 0.25, 
    shadowRadius: 10.84,
    elevation: 10,
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
    shadowOpacity: 0.25,
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
    shadowOpacity: 0.25, 
    shadowRadius: 10.84, 
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
    shadowOpacity: 0.25, 
    shadowRadius: 10.84, 

    elevation: 10,
  },

  itemMenu: {
    marginBottom: 10,
    marginRight: 10,

  },

});
