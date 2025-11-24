import { useState, useContext, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';
import type { AuthResponse } from '../types';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // O TypeScript sabe que 'response.data' deve bater com AuthResponse
      const response = await api.post<AuthResponse>('/login', { email, password });
      
      const { user, token } = response.data;
      
      login(user, token);
      navigate('/chat');

    } catch (err: any) {
      setError('E-mail ou senha inválidos.');
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login Tech4um</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input 
          type="password" 
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Entrar</button>
      </form>
      <p>Não tem conta? <Link to="/register">Registar</Link></p>
    </div>
  );
}