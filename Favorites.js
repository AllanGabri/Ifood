// src/pages/Favorites.js
import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';
import '../styles/Favorites.css';

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="favorites-container">
      <h1>Restaurantes Favoritos</h1>
      {favorites.length === 0 ? (
        <p className="empty-message">Nenhum restaurante favorito encontrado.</p>
      ) : (
        <ul className="favorite-list">
          {favorites.map((restaurant) => (
            <li key={restaurant.id} className="favorite-list-item">
              <div className="favorite-item">
                <Link to={`/restaurantDetails/${restaurant.id}`} className="favorite-link">
                  {restaurant.name}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
