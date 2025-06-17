import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Quiz() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Quiz
      </Typography>
      {/* Render quiz questions here */}
      <Typography>
        The quiz will appear here. (Coming soon!)
      </Typography>
    </Container>
  );
}

export default Quiz;