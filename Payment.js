import React, { useState } from 'react';

const Payment = ({ onConfirm }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = () => {
    if (cardNumber && name && expiry && cvv) {
      alert('Pagamento realizado com sucesso!');
      onConfirm();
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <div>
      <h2>Pagamento</h2>
      <input
        type="text"
        placeholder="Número do Cartão"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nome no Cartão"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Data de Expiração (MM/AA)"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
      />
      <input
        type="text"
        placeholder="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
      />
      <button onClick={handlePayment}>Confirmar Pagamento</button>
    </div>
  );
};

export default Payment;
