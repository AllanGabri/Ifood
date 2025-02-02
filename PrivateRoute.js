// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Certifique-se de que isso aponte para o seu contexto de autenticação

const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuth(); // Obtém o usuário atual do contexto de autenticação

    return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
