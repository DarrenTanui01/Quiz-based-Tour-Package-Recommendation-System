import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Feedback from './Feedback';

function PackageDetail({ pkg, onBack }) {
  if (!pkg) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Package Details
        </Typography>
        <Typography>
          Details for the selected package will be shown here.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Button variant="outlined" sx={{ mb: 2 }} onClick={onBack}>
        Back to Packages
      </Button>
      <Typography variant="h4" gutterBottom>
        {pkg.packageName}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {pkg.persona}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {pkg.description}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        <strong>Estimated Cost:</strong> {pkg.estimatedCost}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        <strong>Duration:</strong> {pkg.duration}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        <strong>Best Season to Travel:</strong> {pkg.bestSeason}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        <strong>Destinations Included:</strong> {pkg.destinations}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        <strong>Activities Included:</strong> {pkg.activities}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        <strong>Transportation:</strong> {pkg.transportation}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        <strong>Accommodation Options:</strong> {pkg.accommodation}
      </Typography>
      {/* Feedback section */}
      <Feedback packageId={pkg.id} />
    </Container>
  );
}

export default PackageDetail;