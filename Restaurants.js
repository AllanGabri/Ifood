// src/pages/Restaurants.js
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Map from '../components/Map';
import StarRating from '../components/StarRating';
import { FavoritesContext } from '../context/FavoritesContext'; // Importa o contexto de favoritos
import '../styles/Restaurants.css';

const Restaurants = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [cuisine, setCuisine] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { favorites } = useContext(FavoritesContext); // Usa o contexto de favoritos
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false); // Estado para mostrar apenas favoritos

  useEffect(() => {
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error("Erro ao pegar localização", error);
          setError('Não foi possível obter sua localização.');
          setLoading(false);
        }
      );
    };

    getUserLocation();

    const mockRestaurants = [
      { id: 1, name: 'Trattoria Bella Vita', position: { lat: -23.56, lng: -46.64 }, cuisine: 'Italiana', rating: 4.5, image: require('../images/italiana.webp') },
      { id: 2, name: 'Casa Beijing', position: { lat: -23.57, lng: -46.63 }, cuisine: 'Chinesa', rating: 4.0, image: require('../images/chinesa.webp') },
      { id: 3, name: 'Mesa Farta', position: { lat: -23.60, lng: -46.75 }, cuisine: 'Brasileira', rating: 4.8, image: require('../images/brasileira.webp') },
      { id: 4, name: 'Burrito Bodega', position: { lat: -23.33, lng: -46.32 }, cuisine: 'Mexicana', rating: 4.2, image: require('../images/mexicana.webp') },
      { id: 5, name: 'Oásis Udon', position: { lat: -23.34, lng: -46.77 }, cuisine: 'Japonesa', rating: 3.8, image: require('../images/japonesa.webp') },
      { id: 6, name: 'Cantinho do Curry', position: { lat: -23.59, lng: -46.64 }, cuisine: 'Indiana', rating: 4.1, image: require('../images/indiana.webp') },
      { id: 7, name: 'Kebab Kingdom', position: { lat: -23.35, lng: -46.65 }, cuisine: 'Árabe', rating: 4.5, image: require('../images/arabe.webp') },
      { id: 8, name: 'Crepes Corner', position: { lat: -23.44, lng: -46.56 }, cuisine: 'Francesa', rating: 3.9, image: require('../images/francesa.webp') },
      { id: 9, name: 'Paella Palace', position: { lat: -23.22, lng: -46.23 }, cuisine: 'Espanhola', rating: 4.7, image: require('../images/espanhola.webp') },
      { id: 10, name: 'Tagine Table', position: { lat: -23.32, lng: -46.24 }, cuisine: 'Africana', rating: 3.7, image: require('../images/africana.webp') },
      { id: 11, name: 'Kimchi Kitchen', position: { lat: -23.58, lng: -46.62 }, cuisine: 'Coreana', rating: 4.6, image: require('../images/coreana.webp') },
      { id: 12, name: 'Tom Yum Tavern', position: { lat: -22.58, lng: -41.62 }, cuisine: 'Tailandesa', rating: 4.2, image: require('../images/tailandesa.webp') },
      { id: 13, name: 'Sauerkraut Station', position: { lat: -11.58, lng: -34.62 }, cuisine: 'Alemã', rating: 3.5, image: require('../images/alema.webp') },
      { id: 14, name: 'Bacalhau Bistro', position: { lat: -45.58, lng: -47.62 }, cuisine: 'Portuguesa', rating: 4.6, image: require('../images/portuguesa.webp') },
      { id: 15, name: 'Pizza Paradise', position: { lat: 32.58, lng: -46.42 }, cuisine: 'Americana', rating: 3.8, image: require('../images/americana.webp') },
      { id: 16, name: 'Pavlova Pavilion', position: { lat: -23.66, lng: -46.78 }, cuisine: 'Australiana', rating: 3.9, image: require('../images/australiana.webp') },
      { id: 17, name: 'Kabsa Kitchen', position: { lat: -23.22, lng: -46.12 }, cuisine: 'Saudita', rating: 4.9, image: require('../images/saudita.webp') },
    ];

    setRestaurants(mockRestaurants);
    setFilteredRestaurants(mockRestaurants);
  }, []);

  useEffect(() => {
    const filtered = restaurants.filter(restaurant => {
      const cuisineMatch = cuisine ? restaurant.cuisine.toLowerCase() === cuisine.toLowerCase() : true;
      const ratingMatch = rating ? restaurant.rating >= rating : true;
      const favoritesMatch = showFavoritesOnly ? favorites.includes(restaurant.id) : true; // Filtra favoritos
      return cuisineMatch && ratingMatch && favoritesMatch; // Adiciona a verificação de favoritos
    });
    setFilteredRestaurants(filtered);
  }, [cuisine, rating, restaurants, showFavoritesOnly, favorites]); // Adiciona showFavoritesOnly e favorites como dependências

  return (
    
    <div className="restaurants-container">
      <h1>Restaurantes</h1>
        
      <div className="filters">
        <label>
          Tipo de Cozinha:
          <select onChange={(e) => setCuisine(e.target.value)} value={cuisine}>
            <option value="">Todos</option>
            <option value="Italiana">Italiana</option>
            <option value="Chinesa">Chinesa</option>
            <option value="Portuguesa">Portuguesa</option>
            <option value="Japonesa">Japonesa</option>
            <option value="Mexicana">Mexicana</option>
            <option value="Africana">Africana</option>
            <option value="Árabe">Árabe</option>
            <option value="Coreana">Coreana</option>
            <option value="Tailandesa">Tailandesa</option>
            <option value="Alemã">Alemã</option>
            <option value="Indiana">Indiana</option>
            <option value="Saudita">Saudita</option>
            <option value="Americana">Americana</option>
            <option value="Espanhola">Espanhola</option>
            <option value="Francesa">Francesa</option>
            <option value="Australiana">Australiana</option>
            <option value="Brasileira">Brasileira</option>
            
          </select>
        </label>
        <label>
          Avaliação Mínima:
          <select onChange={(e) => setRating(Number(e.target.value))} value={rating}>
            <option value={0}>Todos</option>
            <option value={4}>4 e acima</option>
            <option value={4.5}>4.5 e acima</option>
          </select>
        </label>
        <label>
          Apenas Favoritos:
          <input 
            type="checkbox" 
            checked={showFavoritesOnly} 
            onChange={(e) => setShowFavoritesOnly(e.target.checked)} 
          />
        </label>
      </div>

      {loading ? (
        <p>Carregando sua localização...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Map center={userLocation} markers={[userLocation, ...filteredRestaurants.map(r => r.position)]} />
      )}
        
      <ul className="restaurant-list">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <li key={restaurant.id} className="restaurant-list-item">
              <Link to={`/restaurantDetails/${restaurant.id}`} style={{ textDecoration: 'none' }}>
                <div className="restaurant-item">
                  <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
                  <div className="restaurant-details">
                    <h2>{restaurant.name}</h2>
                    <StarRating rating={restaurant.rating} />
                    <p>Tipo de Cozinha: {restaurant.cuisine}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <li>Nenhum restaurante encontrado.</li>
        )}
      </ul>
    </div>
  );
};

export default Restaurants;
