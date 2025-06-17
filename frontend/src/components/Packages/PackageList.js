import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function PackageList() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tour Packages
      </Typography>
      {/* List of packages will go here */}
      <Typography>
        Packages will be listed here.
      </Typography>
    </Container>
  );
}

export default PackageList;