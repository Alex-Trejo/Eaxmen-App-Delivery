import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartWithComment, setCartWithComment] = useState(null); // Nuevo estado para guardar el carrito con comentario

  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.id === product.id);
      if (itemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += quantity;
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const getCartCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = (includeInvoice) => {
  let totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  if (includeInvoice) {
    totalPrice *= 1.15; // Aplica un incremento del 15% si se desea factura
  }
  return totalPrice.toFixed(2); // Redondea a 2 decimales para mostrar el precio correctamente
};

  const setCartItemsWithComment = (cartWithComment) => {
    setCartWithComment(cartWithComment);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      getCartCount, 
      getTotalPrice, 
      setCartItemsWithComment,
      setCartItems,
      cartWithComment // Agrega el estado del carrito con comentario al contexto
    }}>
      {children}
    </CartContext.Provider>
  );
};