// src/context/ReviewContext.js
import React, { createContext, useContext, useState } from 'react';

// Criação do contexto
const ReviewContext = createContext();

// Provider para o contexto
export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);

  const addReview = (restaurantId, review) => {
    setReviews((prevReviews) => [
      ...prevReviews,
      { restaurantId, review }
    ]);
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewContext.Provider>
  );
};

// Hook para usar o contexto
export const useReviews = () => {
  return useContext(ReviewContext);
};
