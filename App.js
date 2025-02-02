import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import Favorites from './components/Favorites';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';
import { ReviewProvider } from './context/ReviewContext';
import { FavoritesProvider } from './context/FavoritesContext';
import OrderTrackingPage from './pages/OrderTrackingPage';
import RestaurantDetails from './pages/RestaurantDetails';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';
import Register from './pages/Register';
import Login from './pages/Login';
import { OrderTrackingProvider } from './context/OrderTrackingContext';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <ReviewProvider>
                    <FavoritesProvider>
                        <OrderTrackingProvider>
                            <Router>
                                <Navbar />
                                <Routes>
                                    <Route path="/" element={<Navigate to="/home" />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/home" element={<Home />} />
                                    <Route path="/restaurants" element={<Restaurants />} />
                                    <Route path="/cart" element={<Cart />} />
                                    <Route path="/favorites" element={<Favorites />} />
                                    <Route path="/restaurantDetails/:id" element={<RestaurantDetails />} />
                                    <Route path="/order-tracking" element={<OrderTrackingPage />} />
                                    <Route path="/checkout" element={<Checkout />} />
                                </Routes>
                            </Router>
                        </OrderTrackingProvider>
                    </FavoritesProvider>
                </ReviewProvider>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
