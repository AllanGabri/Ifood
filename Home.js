// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const [highlightIndex, setHighlightIndex] = useState(0);

  const highlights = [
    "Trattoria Bella Vita - Cozinha Italiana",
    "Casa Beijing - Sushi",
    "Mesa Farta - Hambúrguer Gourmet",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prevIndex) => (prevIndex + 1) % highlights.length);
    }, 3000); // Troca a cada 3 segundos
    return () => clearInterval(interval);
  }, [highlights.length]);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bem-vindo ao VaptFood </h1>
        <p className="intro-text">Descubra os melhores restaurantes da sua região e faça seu pedido.</p>
        <Link to="/restaurants">
          <button className="primary-button">Ver Restaurantes</button>
        </Link>
      </header>
      
      <section className="about-section">
        <h2>Sobre Nós</h2>
        <p>
          No VaptFood, conectamos você aos melhores restaurantes da cidade, oferecendo praticidade e rapidez para que você possa aproveitar a comida sem sair de casa.
        </p>
      </section>

      <section className="how-it-works">
        <h2>Descubra!</h2>
        <div className="steps">
          <div className="step"><Link to="/restaurants" className='link1'>🍽️ Explorar Restaurantes</Link></div>
          <div className="step"><Link to="/cart" className='link1'>🛒 Carrinho</Link></div>
          <div className="step"><Link to="/ordertrackingpage" className='link1'>🚚 Rastreamento</Link></div>
          <div className="step"><Link to="/favorites" className='link1'>⭐ Favoritos</Link></div>
        </div>
      </section>

      <section className="highlights">
        <h2>Destaques</h2>
        <p>Restaurantes populares:</p>
        <div className="highlight-item">{highlights[highlightIndex]}</div>
      </section>
    </div>
  );
};

export default Home;
