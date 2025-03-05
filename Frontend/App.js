import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './navigation/MyStack'
import {CartProvider} from './context/CartContext'
import {ProductProvider} from './context/ProductContext';


const App = () => {
  return (
    <CartProvider>
      <ProductProvider>
      <NavigationContainer>
      <MyStack />
    </NavigationContainer>
    </ProductProvider>
    </CartProvider>
    
  );
}

export default App;



