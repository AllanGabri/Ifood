// src/pages/CartPage.js
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Calculate the total cart price
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemove = (name) => {
    removeFromCart(name);
    setMessage('Item removido do carrinho!');
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

  const handleCheckout = () => {
    // Redirect to the checkout page
    navigate('/checkout'); 
  };

  return (
    <div className="cart-container">
      <h2>Carrinho ({cartItems.length})</h2>
      {message && <div className="notification">{message}</div>}

      {cartItems.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-list-item">
                {item.image && <img src={item.image} alt={item.name} className="cart-item-image" />}
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">R$ {item.price.toFixed(2)}</span>
                  <span className="cart-item-quantity">x {item.quantity}</span>
                  <span className="cart-item-total">= R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <button onClick={() => handleRemove(item.name)} className="remove-button">Remover</button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <strong>Total: R$ {total.toFixed(2)}</strong>
          </div>
          <button className="checkout-button" onClick={handleCheckout}>Finalizar Compra</button>
        </>
      )}
    </div>
  );
};

export default Cart;
