import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function PackageDetail() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Package Details
      </Typography>
      {/* Package details and feedback will go here */}
      <Typography>
        Details for the selected package will be shown here.
      </Typography>
    </Container>
  );
}

export default PackageDetail;