import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import api from '../api';
import { useAuth } from '../context/AuthContext'; // or '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await api.post('/auth/login', { email, password });
      login({ id: res.data.traveler_id, email }, res.data.access_token);
      setMsg('Login successful!');
      navigate('/home'); // Redirect to home after login
    } catch (err) {
      setMsg('Invalid credentials');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
      {msg && <Typography sx={{ mt: 2 }}>{msg}</Typography>}
      <Typography sx={{ mt: 2 }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </Typography>
    </Container>
  );
}

export default Login;