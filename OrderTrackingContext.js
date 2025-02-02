import React, { createContext, useContext, useState } from 'react';

// Criação do contexto
const OrderTrackingContext = createContext();


export const OrderTrackingProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async (orderId) => {
        try {
            const response = await fetch(`/api/orders/${orderId}`); // Substituir pela API real.
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error("Erro ao buscar os pedidos:", error);
        }
    };

    return (
        <OrderTrackingContext.Provider value={{ orders, fetchOrders }}>
            {children}
        </OrderTrackingContext.Provider>
    );
};

// Hook para usar o contexto
export const useOrderTracking = () => {
    return useContext(OrderTrackingContext);
};
