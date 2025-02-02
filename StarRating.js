// src/components/StarRating.js
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/StarRating.css'; // Estilos das estrelas

const StarRating = ({ rating }) => {
  // Garante que a avaliação esteja entre 0 e 5
  const normalizedRating = Math.max(0, Math.min(5, rating));

  // Parte inteira da avaliação
  const fullStars = Math.floor(normalizedRating);
  // Verifica se há uma fração
  const hasHalfStar = normalizedRating % 1 >= 0.5;

  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index < fullStars) {
      return <span key={index} className="star filled">★</span>; // Estrela cheia
    } else if (index === fullStars && hasHalfStar) {
      return <span key={index} className="star half-filled">★</span>; // Estrela meio cheia
    } else {
      return <span key={index} className="star">★</span>; // Estrela vazia
    }
  });

  return <div className="star-rating">{stars}</div>;
};

// Validação das props
StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
