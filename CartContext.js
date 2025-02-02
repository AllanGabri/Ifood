// src/context/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
    
    if (existingItem) {
      setCartItems(prevCartItems => 
        prevCartItems.map(cartItem => 
          cartItem.name === item.name 
            ? { ...existingItem, quantity: existingItem.quantity + 1 } 
            : cartItem
        )
      );
    } else {
      setCartItems(prevCartItems => [...prevCartItems, { ...item, quantity: 1 }]);
    }
  };

  // Updated to filter by name, if 'name' is unique for each item in the cart
  const removeFromCart = (name) => {
    setCartItems(prevCartItems => prevCartItems.filter(item => item.name !== name));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
