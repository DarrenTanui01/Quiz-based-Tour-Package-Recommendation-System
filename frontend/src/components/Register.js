import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await api.post('/auth/register', { name, email, password });
      // Auto-login after registration
      const res = await api.post('/auth/login', { email, password });
      login({ id: res.data.traveler_id, email }, res.data.access_token);
      setMsg('Registration successful!');
      navigate('/home'); // Redirect to home after registration
    } catch (err) {
      setMsg('Registration failed');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
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
          Register
        </Button>
      </form>
      {msg && <Typography sx={{ mt: 2 }}>{msg}</Typography>}
      <Typography sx={{ mt: 2 }}>
        Already have an account? <Link to="/login">Login now</Link>
      </Typography>
    </Container>
  );
}

export default Register;