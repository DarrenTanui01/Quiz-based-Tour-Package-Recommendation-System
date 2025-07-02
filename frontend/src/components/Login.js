import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box'; 


function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await api.post('/auth/login', { email, password });
      login(
        { id: res.data.traveler_id, name: res.data.name, email: res.data.email },
        res.data.access_token
      );
      setMsg('Login successful!');
      navigate('/home');
    } catch (err) {
      setMsg('Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(rgba(30,30,30,0.2), rgba(30,30,30,0.2)), url('/images/rhino.jpg') center/cover no-repeat fixed`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: { xs: 8, sm: 10 },
        pb: { xs: 8, sm: 10 },
      }}
    >
      <Container maxWidth="xs" sx={{ py: 6, zIndex: 1 }}>
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: 6,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #232936 60%, #1976d2 100%)'
              : 'linear-gradient(135deg, #b0b4ba 60%, #1976d2 100%)',
            opacity: 0.97,
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                textAlign: 'center',
                fontWeight: 700,
                color: theme.palette.mode === 'dark' ? '#fff' : '#232936',
                textShadow: '0 2px 8px rgba(0,0,0,0.4)'
              }}
            >
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ fontSize: { xs: '1rem', sm: '1.1rem' }, py: 1.5, borderRadius: 3 }}
              >
                Login
              </Button>
            </form>
            {msg && <Typography sx={{ mt: 2, textAlign: 'center', color: 'error.main' }}>{msg}</Typography>}
            <Typography sx={{ mt: 2, textAlign: 'center' }}>
              Don't have an account?{' '}
              <Link
                to="/register"
                style={{ color: theme.palette.primary.main, textDecoration: 'underline', fontWeight: 600 }}
              >
                Register here
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Login;