import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, RefreshControl} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { host } from '../../Host';

const iconUser = require('../../assets/user.png');
const iconArrow = require('../../assets/right-arrow.png');

const HomePageClient = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${host}/api/lunches`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false); // Update loading state in case of error
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts().then(() => setRefreshing(false));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleProductClick = (product) => {
    try {
      navigation.navigate('Product_page', { product });
    } catch (error) {
      console.error('Error during navigation:', error);
    }
  };

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <View style={styles.container}>
      
      <View style={styles.containerRow}>
        <Text style={styles.titleText}>Bienvenido</Text>
      </View>

      <View style={styles.contentContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categories}>
            <TouchableOpacity onPress={() => handleCategoryChange('All')}>
              <Text style={styles.item}>Todas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategoryChange('fuertes')}>
              <Text style={styles.item}>Fuertes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategoryChange('combos')}>
              <Text style={styles.item}>Combos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategoryChange('postres')}>
              <Text style={styles.item}>Postres</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategoryChange('bebidas')}>
              <Text style={styles.item}>Bebidas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategoryChange('cortes')}>
              <Text style={styles.item}>Cortes de carne</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategoryChange('panadería')}>
              <Text style={styles.item}>Panadería</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategoryChange('pastelería')}>
              <Text style={styles.item}>Pastelería</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategoryChange('chocolates')}>
              <Text style={styles.item}>Chocolates</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View style={styles.containerBody}>
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.containerListView}>
            <View style={styles.container20padding}>
              <Text style={styles.titleTextMenu}>Menú</Text>
              <Text style={styles.secondaryText}>Elige tu plato deseado</Text>
            </View>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              filteredProducts.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  onPress={() => handleProductClick(product)}
                  style={styles.containerProduct}
                >
                  <Image source={{ uri: product.image.uri }} style={styles.menuComida} />
                  <View style={styles.containerProductColumn}>
                    <Text style={styles.secondaryText}>{product.name}</Text>
                    <Text style={styles.itemMenu}>${product.price}</Text>
                  </View>
                  <Image source={iconArrow} style={styles.smallerIcon} />
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  fakeNavBar: {
    backgroundColor: '#B64107',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    height: 100,
    zIndex: 1,
  },
  navBarContentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  buttonText: {
    color: '#B64107',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  categories: {
    flexDirection: 'row',
    padding: 20,
  },
  contentContainer: {
    marginTop: 20,
  },
  containerBody: {
    flex: 1,
    backgroundColor: '#f1f4f4f8',
  },
  containerListView: {
    margin: 15,
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
  container20padding: {
    padding: 20,
    margin: 0,
  },
  containerProductColumn: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: 13,
    width: '50%',
  },
  containerProduct: {
    flexDirection: 'row',
    marginLeft: 25,
    padding: 10,
    borderBottomColor: '#E0E3E7',
    borderBottomWidth: 0.5,
    lineHeight: 1,
    borderLeftWidth: 2,
    borderLeftColor: '#ee8b60',
    width: '100%',
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
  item: {
    marginBottom: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f1f4f8',
  },
  itemMenu: {
    marginBottom: 10,
    marginRight: 10,
  },
});

export default HomePageClient;
