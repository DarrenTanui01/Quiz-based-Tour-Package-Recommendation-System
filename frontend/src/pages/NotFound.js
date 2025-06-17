import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function NotFound() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography>
        Sorry, the page you are looking for does not exist.
      </Typography>
    </Container>
  );
}

export default NotFound;