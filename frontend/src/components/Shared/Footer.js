import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

function Footer() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? '#232936' : '#b0b4ba',
        color: theme.palette.mode === 'dark' ? '#fff' : '#232936',
        py: 2,
        mt: 4,
        textAlign: 'center'
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Quiz-based Tour Package Recommendation System
      </Typography>
    </Box>
  );
}

export default Footer;