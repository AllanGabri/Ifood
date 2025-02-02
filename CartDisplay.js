// src/components/CartDisplay.js
import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/CartDisplay.css';

const CartDisplay = () => {
  const { cartItems } = useCart();

  return (
    <div className="cart-display">
      <h2>Carrinho</h2>
      {cartItems.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - R$ {item.price.toFixed(2)} x {item.quantity} = R$ {(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartDisplay;
