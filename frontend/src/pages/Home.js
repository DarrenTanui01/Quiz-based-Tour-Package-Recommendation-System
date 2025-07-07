import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';


const galleryImages = [
  'cheetar.jpg',
  'diani beach.jpg',
  'Diani boat.jpg',
  'elephant.jpg',
  'safari van.jpg',
  'sunset diani.jpg',
  'sunset safari.jpg',
  'wasini ocean.jpg',
  'rhino.jpg',
  'Wasini home.jpg',
  'scenary.jpg',
  'Balloon-Safari-1.jpg',
  'Lake-Nakuru-National-Park.jpg',
  'manyata.jpg', 
  'Ol-Pejeta-Rhinos.jpg',
  'Nairobi Skyline.jpg',
  'infinity-pool.jpg',
  'Wildbeast.jpg',
  'Lake-Naivasha_Hero-Banner_IIpng.png',
  'Samburu-National-Park.jpg',
  'Mt Kenya.jpg',
  'Thomson falls1.jpg',
  'thomson falls2.jpeg',
  'Mount-Longonot.jpg',
  'Leopard.jpg',
  'Lion.jpg',
];

function Home() {
  const { traveler } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const [popupImg, setPopupImg] = useState(null);

  useEffect(() => {
    if (!traveler) {
      navigate('/login');
    }
  }, [traveler, navigate]);

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', pb: 6, background: theme.palette.mode === 'light'
      ? 'linear-gradient(90deg,rgba(1, 77, 134, 0.77) 30%,rgb(251, 248, 248) 100%)'
      : 'inherit',
    transition: 'background 0.5s', }}>
      {/* Blur overlay when popup is open */}
      {popupImg && (
        <Box
          sx={{
            position: 'fixed',
            zIndex: 1200,
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            bgcolor: 'rgba(30,30,30,0.3)',
            backdropFilter: 'blur(8px)',
            transition: 'backdrop-filter 0.5s, background 0.5s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setPopupImg(null)}
        >
          <Box
            sx={{
              position: 'relative',
              borderRadius: 4,
              boxShadow: 8,
              overflow: 'hidden',
              transition: 'transform 0.4s cubic-bezier(.4,2,.6,1), box-shadow 0.4s',
              transform: popupImg ? 'scale(1.08)' : 'scale(1)',
              maxWidth: { xs: '90vw', sm: '70vw', md: '50vw' },
              maxHeight: { xs: '60vh', sm: '70vh', md: '80vh' },
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(12px)',
              cursor: 'pointer',
            }}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={`/images/${popupImg}`}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                borderRadius: 'inherit',
                transition: 'opacity 0.4s',
              }}
            />
          </Box>
        </Box>
      )}

      <Container maxWidth="md" sx={{ py: { xs: 4, sm: 8 }, zIndex: 1 }}>
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: 6,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #232936 60%, #1976d2 100%)'
              : 'linear-gradient(135deg, #b0b4ba 60%, #1976d2 100%)',
            minWidth: { xs: 320, sm: 600, md: 900 }, 
            minHeight: { xs: 180, sm: 200, md: 220 },  
            width: { xs: '95vw', sm: '90vw', md: '75vw' }, 
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <CardContent sx={{ width: '100%' }}>
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

      {/* Horizontal scrollable image gallery */}
      <Box
        sx={{
          mt: 5,
          px: 2,
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          scrollbarWidth: 'thin',
          scrollbarColor: '#1976d2 #b0b4ba',
          '&::-webkit-scrollbar': {
            height: 10,
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#1976d2',
            borderRadius: 5,
          },
          '&::-webkit-scrollbar-track': {
            background: '#b0b4ba',
            borderRadius: 5,
          },
        }}
      >
        {galleryImages.map((img, idx) => (
          <Box
            key={img}
            sx={{
              display: 'inline-block',
              position: 'relative',
              borderRadius: 4,
              boxShadow: 4,
              overflow: 'hidden',
              minWidth: { xs: 160, sm: 220, md: 260 },
              height: { xs: 110, sm: 150, md: 180 },
              background: 'rgba(255,255,255,0.13)',
              backdropFilter: 'blur(4px)',
              cursor: 'pointer',
              transition: 'transform 0.4s cubic-bezier(.4,2,.6,1), box-shadow 0.4s',
              '&:hover': {
                transform: 'scale(1.08)',
                boxShadow: 10,
                zIndex: 10,
              },
            }}
            onClick={() => setPopupImg(img)}
          >
            <img
              src={`/images/${img}`}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                borderRadius: 'inherit',
                transition: 'opacity 0.4s',
              }}
              draggable={false}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Home;