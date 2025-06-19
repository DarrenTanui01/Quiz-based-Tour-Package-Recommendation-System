import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';

function Navbar() {
  const { traveler, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #1976d2 60%, #ff9800 100%)' }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 2 }}>
          Tour Recommender
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          {traveler && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/home"
                sx={{
                  borderRadius: 3,
                  px: 3,
                  transition: 'all 0.3s',
                  '&:hover': { background: '#fff', color: '#1976d2', transform: 'scale(1.08)' }
                }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/quiz"
                sx={{
                  borderRadius: 3,
                  px: 3,
                  transition: 'all 0.3s',
                  '&:hover': { background: '#fff', color: '#1976d2', transform: 'scale(1.08)' }
                }}
              >
                Quiz
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/packages"
                sx={{
                  borderRadius: 3,
                  px: 3,
                  transition: 'all 0.3s',
                  '&:hover': { background: '#fff', color: '#1976d2', transform: 'scale(1.08)' }
                }}
              >
                Packages
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/dashboard"
                sx={{
                  borderRadius: 3,
                  px: 3,
                  transition: 'all 0.3s',
                  '&:hover': { background: '#fff', color: '#1976d2', transform: 'scale(1.08)' }
                }}
              >
                Dashboard
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/admin"
                sx={{
                  borderRadius: 3,
                  px: 3,
                  transition: 'all 0.3s',
                  '&:hover': { background: '#fff', color: '#1976d2', transform: 'scale(1.08)' }
                }}
              >
                Admin
              </Button>
              <Tooltip title={traveler.email}>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                  <Avatar sx={{ bgcolor: '#fff', color: '#1976d2', mr: 1 }}>
                    {traveler.email[0]?.toUpperCase() || '?'}
                  </Avatar>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      color: '#fff',
                      textShadow: '0 1px 2px #0008',
                      mr: 2,
                      letterSpacing: 1
                    }}
                  >
                    {traveler.email}
                  </Typography>
                </Box>
              </Tooltip>
              <Button
                color="secondary"
                variant="contained"
                onClick={handleLogout}
                sx={{
                  borderRadius: 3,
                  px: 3,
                  ml: 1,
                  boxShadow: 2,
                  transition: 'all 0.3s',
                  '&:hover': { background: '#fff', color: '#ff9800', transform: 'scale(1.08)' }
                }}
              >
                Logout
              </Button>
            </>
          )}
          {!traveler && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{
                  borderRadius: 3,
                  px: 3,
                  transition: 'all 0.3s',
                  '&:hover': { background: '#fff', color: '#1976d2', transform: 'scale(1.08)' }
                }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register"
                sx={{
                  borderRadius: 3,
                  px: 3,
                  transition: 'all 0.3s',
                  '&:hover': { background: '#fff', color: '#1976d2', transform: 'scale(1.08)' }
                }}
              >
                Register
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;