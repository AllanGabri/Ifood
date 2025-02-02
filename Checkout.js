import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Checkout.css';

const Checkout = () => {
  const { cartItems } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: 'credit-card',
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (formData.paymentMethod === 'paypal') {
      // Carrega o script do PayPal se ainda não estiver carregado
      if (!window.paypal) {
        const script = document.createElement('script');
        script.src = 'https://www.paypal.com/sdk/js?client-id=AIzaSyAFQFmxDzsVrOIe-r0tpw6MGgHCu-TyDAA';
        script.onload = () => renderPayPalButton();
        document.body.appendChild(script);
      } else {
        renderPayPalButton();
      }
    }
  }, [formData.paymentMethod, total]);

  const renderPayPalButton = () => {
    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: total.toFixed(2), // Total da compra
            },
          }],
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then(() => {
          setSuccessMessage('Pedido realizado com sucesso via PayPal!');
        });
      },
    }).render('#paypal-button-container');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.paymentMethod === 'credit-card') {
      setSuccessMessage('Pedido realizado com sucesso!');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Finalizar Compra</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <h3>Informações do Cliente</h3>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Endereço de Entrega:</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        
        <h3>Método de Pagamento</h3>
        <div className="form-group payment-methods">
          <label>
            <input type="radio" name="paymentMethod" value="paypal" checked={formData.paymentMethod === 'paypal'} onChange={handleChange} />
            PayPal
          </label>
        </div>

        <div className="checkout-summary">
          <h3>Resumo do Pedido</h3>
          <ul className="summary-list">
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} x {item.quantity} = R$ {(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <strong>Total: R$ {total.toFixed(2)}</strong>
        </div>
        
        {formData.paymentMethod === 'credit-card' ? (
          <button type="submit" className="submit-button">Confirmar Pedido</button>
        ) : (
          <div id="paypal-button-container"></div>
        )}
      </form>

      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default Checkout;
