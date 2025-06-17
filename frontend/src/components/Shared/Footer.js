import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 2, mt: 4, textAlign: 'center' }}>
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Quiz-based Tour Package Recommendation System
      </Typography>
    </Box>
  );
}

export default Footer;