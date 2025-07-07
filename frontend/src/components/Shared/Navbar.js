import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useThemeMode } from '../../context/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'; 

const navLinks = [
  { label: 'Home', to: '/home' },
  { label: 'Quiz', to: '/quiz' },
  { label: 'Packages', to: '/packages' }
];

function Navbar() {
  const { traveler, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { mode, toggleTheme } = useThemeMode();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const drawer = (
    <Box sx={{ width: 240 }} role="presentation" onClick={() => setDrawerOpen(false)}>
      <List>
        {traveler &&
          navLinks.map(link => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton component={Link} to={link.to}>
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        {/* Always show Admin button */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin">
            <ListItemText primary="Admin" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={toggleTheme}>
            <ListItemText primary={mode === 'dark' ? 'Light Mode' : 'Dark Mode'} />
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </ListItemButton>
        </ListItem>
        {traveler ? (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/login">
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/register">
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ background: theme.palette.mode === 'dark'
      ? 'linear-gradient(90deg, #232936 60%, #1976d2 100%)'
      : 'linear-gradient(90deg, #b0b4ba 60%, #1976d2 100%)' }}>
      <Toolbar>
        {/* Travel Nestor Logo Icon */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mr: 1,
          }}
        >
          <Box
            sx={{
              width: 68,
              height: 68,
              borderRadius: '50%',
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #1976d2 60%, #232936 100%)'
                : 'linear-gradient(135deg, #fffbe7 60%, #1976d2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 3,
              mr: 1,
            }}
          >
            {/* TN Initials with a travel icon */}
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Pacifico", "Brush Script MT", cursive, sans-serif',
                fontWeight: 700,
                color: theme.palette.mode === 'dark' ? '#fff' : '#1976d2',
                letterSpacing: 2,
                fontSize: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none',
              }}
            >
              TN
              <FlightTakeoffIcon sx={{ fontSize: 18, ml: 0.5, color: theme.palette.mode === 'dark' ? '#fff' : '#1976d2' }} />
            </Typography>
          </Box>
        </Box>
        {/* Travel Nestor Title */}
        <Typography
          variant="h4"
          sx={{
            flexGrow: 1,
            fontWeight: 900,
            fontFamily: '"Pacifico", "Brush Script MT", cursive, sans-serif',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '2.8rem' },
            letterSpacing: 3,
            color: theme.palette.mode === 'dark' ? '#fff' : '#232936',
            textShadow: '0 2px 8px rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            ml: 0,
          }}
        >
          Travel Nestor
        </Typography>
        {isMobile ? (
          <>
            {traveler && (
              <Tooltip title={traveler.email}>
                <Avatar sx={{ bgcolor: '#fff', color: '#1976d2', mr: 1 }}>
                  {traveler.email[0]?.toUpperCase() || '?'}
                </Avatar>
              </Tooltip>
            )}
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setDrawerOpen(true)}
              sx={{ ml: 1 }}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              {drawer}
            </Drawer>
          </>
        ) : (
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            {traveler &&
              navLinks.map(link => (
                <Button
                  key={link.label}
                  color="inherit"
                  component={Link}
                  to={link.to}
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    transition: 'all 0.3s',
                    '&:hover': { background: '#fff', color: '#1976d2', transform: 'scale(1.08)' }
                  }}
                >
                  {link.label}
                </Button>
              ))}
            {/* Always show Admin button */}
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
            <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            {traveler && (
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
                      letterSpacing: 1,
                      display: { xs: 'none', lg: 'block' }
                    }}
                  >
                    {traveler.email}
                  </Typography>
                </Box>
              </Tooltip>
            )}
            {traveler ? (
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
            ) : (
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
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;