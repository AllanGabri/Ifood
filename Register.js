import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (password.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      }
      if (!email.includes('@')) {
        throw new Error('Email inválido');
      }

      await createUserWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      alert('Registro realizado com sucesso!');
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Criar uma conta</h2>
      <p className="register-subtitle">Preencha os dados abaixo para se registrar</p>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Senha</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </span>
          </div>
        </div>

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? <span className="loading-spinner" /> : 'Criar conta'}
        </button>
      </form>

      <p className="text-center mt-4">
        Já tem uma conta?{' '}
        <span onClick={() => navigate('/login')} className="login-link">
          Faça login
        </span>
      </p>
    </div>
  );
};

export default Register;
