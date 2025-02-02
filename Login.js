// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/Login.css'; // Importa o CSS

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Estado de carregamento

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Limpa o erro anterior
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/'); // Redireciona para a página inicial após login
        } catch (error) {
            // Trate erros específicos de autenticação, se necessário
            if (error.code === 'auth/user-not-found') {
                setError('Usuário não encontrado. Verifique seu email.');
            } else if (error.code === 'auth/wrong-password') {
                setError('Senha incorreta. Tente novamente.');
            } else {
                setError('Credenciais inválidas. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setError('Por favor, insira seu email para recuperar a senha.');
            return;
        }
        try {
            await auth.sendPasswordResetEmail(email);
            alert('Email de recuperação enviado!');
        } catch (error) {
            setError('Não foi possível enviar o email de recuperação.');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Carregando...' : 'Login'}
                </button>
                <button type="button" onClick={handleForgotPassword}>
                    Esqueci minha senha
                </button>
            </form>
            <h2>Ainda não tem uma conta? <Link to="/register" className='link'>Registrar</Link></h2>
        </div>
    );
};

export default Login;
