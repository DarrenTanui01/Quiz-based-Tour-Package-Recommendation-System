import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Welcome to the Quiz-based Tour Package Recommendation System!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Discover your perfect tour package by taking a quick quiz.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/quiz">
        Start Quiz
      </Button>
    </Container>
  );
}

export default Home;