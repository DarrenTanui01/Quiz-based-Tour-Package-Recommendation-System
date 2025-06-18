import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function QuizResult({ result }) {
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Your Recommended Tour Packages
      </Typography>
      {/* Render recommended packages here */}
      <Typography>
        Results will be shown here.
      </Typography>
    </Container>
  );
}

export default QuizResult;