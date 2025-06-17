import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function TravelerDashboard() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Traveler Dashboard
      </Typography>
      {/* Traveler info, quiz history, recommendations, etc. */}
      <Typography>
        Your dashboard will appear here.
      </Typography>
    </Container>
  );
}

export default TravelerDashboard;