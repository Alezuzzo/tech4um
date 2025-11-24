import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      setLoading(true);
      await api.post('/register', { username, email, password });
      alert('Conta criada com sucesso!');
      navigate('/');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro ao criar conta.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Criar Conta</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Inputs iguais ao Login, só adicione o campo Username */}
        <input 
            type="text" 
            placeholder="Username"
            value={username} 
            onChange={e => setUsername(e.target.value)} 
        />
         {/* ... Resto do form igual ... */}
         <button type="submit" disabled={loading}>Registar</button>
      </form>
      <Link to="/">Voltar ao Login</Link>
    </div>
  );
}