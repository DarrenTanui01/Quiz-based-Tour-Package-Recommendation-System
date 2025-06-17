import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Tour Recommender
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/quiz">Quiz</Button>
        <Button color="inherit" component={Link} to="/packages">Packages</Button>
        <Button color="inherit" component={Link} to="/login">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;