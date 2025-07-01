import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '@mui/material/styles';

function Home() {
  const { traveler } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (!traveler) {
      navigate('/login');
    }
  }, [traveler, navigate]);

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, sm: 8 } }}>
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: 6,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #232936 60%, #1976d2 100%)'
            : 'linear-gradient(135deg, #fffbe7 60%, #ff9800 100%)',
        }}
      >
        <CardContent>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              textAlign: 'center',
              color: theme.palette.mode === 'dark' ? '#fff' : '#232936'
            }}
          >
            {`Welcome${traveler && traveler.name ? ', ' + traveler.name + '!' : '!'}`}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              textAlign: 'center',
              color: theme.palette.mode === 'dark' ? '#cfd8dc' : '#232936'
            }}
          >
            Discover your perfect tour package by taking a quick quiz.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/quiz"
            sx={{
              width: { xs: '100%', sm: 'auto' },
              fontSize: { xs: '1rem', sm: '1.1rem' },
              display: 'block',
              mx: 'auto',
              mt: 3,
              borderRadius: 3,
              boxShadow: 3
            }}
          >
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Home;