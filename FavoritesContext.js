// src/context/FavoritesContext.js
import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Carregar favoritos do localStorage ao inicializar
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  // Salvar favoritos no localStorage sempre que houver mudanças
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (restaurant) => {
    setFavorites((prevFavorites) => {
      // Verificar se o restaurante já está nos favoritos para evitar duplicatas
      if (prevFavorites.some(fav => fav.id === restaurant.id)) {
        return prevFavorites;
      }
      return [...prevFavorites, restaurant];
    });
  };

  const removeFavorite = (restaurantId) => {
    setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.id !== restaurantId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
