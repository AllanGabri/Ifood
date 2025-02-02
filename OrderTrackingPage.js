import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOrderTracking } from '../context/OrderTrackingContext';
import '../styles/OrderTrackingPage.css';

const OrderTrackingPage = () => {
    const { id } = useParams();
    const { orders, fetchOrders } = useOrderTracking();
    const [testOrder, setTestOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrders = async () => {
            setLoading(true);
            await fetchOrders(id);
            setLoading(false);
        };
        
        loadOrders();
    }, [id, fetchOrders]);

    const handleTestTracking = () => {
        const simulatedOrder = {
            id: id,
            status: 'Em Trânsito',
            date: new Date().toLocaleDateString(),
            items: [
                { name: 'Pizza Margherita', quantity: 1 },
                { name: 'Pasta Carbonara', quantity: 2 },
            ],
        };
        setTestOrder(simulatedOrder);
    };

    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    const orderToDisplay = testOrder || (orders.length > 0 ? orders[0] : null); 

    return (
        <div className="order-tracking-page">
            <h1>Rastreamento do Pedido</h1>
            <button onClick={handleTestTracking} className="test-button">Simular Rastreamento</button>
            {orderToDisplay ? (
                <div className="order-details">
                    <h2>Pedido #{orderToDisplay.id}</h2>
                    <p><strong>Status:</strong> {orderToDisplay.status}</p>
                    <p><strong>Data:</strong> {orderToDisplay.date}</p>
                    {orderToDisplay.items && (
                        <div>
                            <h3>Itens do Pedido:</h3>
                            <ul>
                                {orderToDisplay.items.map((item, index) => (
                                    <li key={index}>{item.quantity} x {item.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <div>Nenhum pedido encontrado.</div>
            )}
        </div>
    );
};

export default OrderTrackingPage;
