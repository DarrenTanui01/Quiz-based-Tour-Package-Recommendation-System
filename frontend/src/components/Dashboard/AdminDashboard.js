import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function AdminDashboard() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      {/* Admin controls for managing packages, questions, etc. */}
      <Typography>
        Admin controls will appear here.
      </Typography>
    </Container>
  );
}

export default AdminDashboard;