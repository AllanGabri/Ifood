import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import StarRating from '../components/StarRating';
import { useCart } from '../context/CartContext';
import { FavoritesContext } from '../context/FavoritesContext';
import CartDisplay from '../components/CartDisplay';
import '../styles/RestaurantDetails.css';

const RestaurantDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRestaurantDetails = () => {
      const mockRestaurants = [
        { id: 1, name: 'Trattoria Bella Vita', cuisine: 'Italiana', rating: 4.5, description: 'Delícias da culinária italiana.', image: require('../images/italiana.webp'), menu: [{ name: 'Pizza Margherita', price: 25 }, { name: 'Pasta Carbonara', price: 30 }] },
        { id: 2, name: 'Casa Beijing', cuisine: 'Chinesa', rating: 4.0, description: 'Sabor autêntico da China.', image: require('../images/chinesa.webp'), menu: [{ name: 'Frango Agridoce', price: 20 }, { name: 'Noodles', price: 15 }] },
        { id: 3, name: 'Mesa Farta', cuisine: 'Brasileira', rating: 4.8, description: 'Clássicos brasileiros.', image: require('../images/brasileira.webp'), menu: [{ name: 'Feijoada', price: 35 }, { name: 'Pão de Queijo', price: 10 }] },
        { id: 4, name: 'Burrito Bodega', cuisine: 'Mexicana', rating: 4.9, description: 'O tempero picante do México.', image: require('../images/mexicana.webp'), menu: [{ name: 'Burritos', price: 27 }, { name: 'Quesadilhas', price: 20 }] },
        { id: 5, name: 'Oásis Udon', cuisine: 'Japonesa', rating: 5.0, description: 'O melhor tradicional do Japão', image: require('../images/japonesa.webp'), menu: [{ name: 'Ramen', price: 38 }, { name: 'Udon', price: 35 }] },
        { id: 6, name: 'Cantinho do Curry', cuisine: 'Indiana', rating: 4.5, description: 'O melhor curry asiático', image: require('../images/indiana.webp'), menu: [{ name: 'Curry', price: 40 }, { name: 'Samosas', price: 20 }] },
        { id: 7, name: 'Kebab Kingdom', cuisine: 'Árabe', rating: 4.6, description: 'O melhor da cozinha árabe', image: require('../images/arabe.webp'), menu: [{ name: 'Kebab', price: 30 }, { name: 'Tabule', price: 28 }] },
        { id: 8, name: 'Crepes Corner', cuisine: 'Francesa', rating: 4.1, description: 'Bon Apetit', image: require('../images/francesa.webp'), menu: [{ name: 'Crepe', price: 16 }, { name: 'Ratatouille', price: 45 }] },
        { id: 9, name: 'Paella Palace', cuisine: 'Espanhola', rating: 3.9, description: 'Experiências saborosas que contam histórias', image: require('../images/espanhola.webp'), menu: [{ name: 'Paella', price: 29 }, { name: 'Gazpacho', price: 24 }] },
        { id: 10, name: 'Tagine Table', cuisine: 'Africana', rating: 4.9, description: 'O melhor da África', image: require('../images/africana.webp'), menu: [{ name: 'Jollof rice', price: 30 }, { name: 'Bobotie', price: 20 }] },
        { id: 11, name: 'Kimchi Kitchen', cuisine: 'Coreana', rating: 5.0, description: 'O melhor da Coreia', image: require('../images/coreana.webp'), menu: [{ name: 'Kimchi', price: 22 }, { name: 'Tteokbokki', price: 33 }] },
        { id: 12, name: 'Tom Yum Tavern', cuisine: 'Tailandesa', rating: 4.5, description: 'Os sabores da Tailândia', image: require('../images/tailandesa.webp'), menu: [{ name: 'Tom yum', price: 31 }, { name: 'Mango sticky rice', price: 24 }] },
        { id: 13, name: 'Sauerkraut Station', cuisine: 'Alemã', rating: 4.9, description: 'O melhor da culinária Alemã.', image: require('../images/alema.webp'), menu: [{ name: 'Pretzel', price: 18 }, { name: 'Sauerkraut', price: 38 }] },
        { id: 14, name: 'Bacalhau Bistro', cuisine: 'Portuguesa', rating: 3.8, description: 'O melhor bacalhau já visto', image: require('../images/portuguesa.webp'), menu: [{ name: 'Bacalhau', price: 50 }, { name: 'Pastéis de nata', price: 24 }] },
        { id: 15, name: 'Pizza Paradise', cuisine: 'Norte-Americana', rating: 3.8, description: 'A comida globalizada', image: require('../images/americana.webp'), menu: [{ name: 'Pizza', price: 58 }, { name: 'Hambúrguer', price: 25 }] },
        { id: 16, name: 'Pavlova Pavilion', cuisine: 'Australiana', rating: 4.5, description: 'O melhor da culinária oceânica', image: require('../images/australiana.webp'), menu: [{ name: 'Pavlova', price: 36 }, { name: 'Vegemite', price: 39 }] },
        { id: 17, name: 'Kabsa Kitchen', cuisine: 'Saudita', rating: 5.0, description: 'O melhor da culinária Saudita', image: require('../images/saudita.webp'), menu: [{ name: 'Kabsa', price: 52 }, { name: 'Mutabbaq', price: 23 }] }
      ];
      
      const foundRestaurant = mockRestaurants.find((r) => r.id === parseInt(id));

      if (foundRestaurant) {
        setRestaurant(foundRestaurant);
        setMenuItems(foundRestaurant.menu);
        setLoading(false);
      } else {
        setError('Restaurante não encontrado.');
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  const isFavorite = favorites.some((fav) => fav.id === parseInt(id));

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(parseInt(id));
    } else {
      addFavorite({ id: parseInt(id), name: restaurant.name });
    }
  };

  if (loading) {
    return <p>Carregando detalhes do restaurante...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="restaurant-details-container">
      <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
      <h1>{restaurant.name}</h1>
      <StarRating rating={restaurant.rating} />
      <p>Tipo de Cozinha: {restaurant.cuisine}</p>
      <p>{restaurant.description}</p>
      <button className={`favorite-button ${isFavorite ? 'favorited' : ''}`} onClick={handleFavoriteToggle}>
        {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
      </button>

      <h2>Cardápio</h2>
      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <li key={index} className="menu-item">
            <span>{item.name}</span>
            <span>R$ {item.price.toFixed(2)}</span>
            <button className="add-to-cart-button" onClick={() => addToCart(item)}>Adicionar ao Carrinho</button>
          </li>
        ))}
      </ul>

      <CartDisplay />

      <Link to="/restaurants" className="back-link">
        Voltar para a lista de restaurantes
      </Link>
    </div>
  );
};

export default RestaurantDetails;
