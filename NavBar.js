// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Importando os estilos da navbar

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/restaurants">Restaurantes</Link></li>
                <li><Link to="/cart">Carrinho</Link></li>
                <li><Link to="/favorites">Favoritos</Link></li>
                <li><Link to="/order-tracking">Rastreamento de Pedidos</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
