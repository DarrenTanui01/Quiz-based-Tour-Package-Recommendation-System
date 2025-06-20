import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Feedback from './Feedback';
import { useTheme } from '@mui/material/styles';

function PackageDetail({ pkg, onBack }) {
  const theme = useTheme();

  if (!pkg) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 4, sm: 8 } }}>
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
    <Container maxWidth="md" sx={{ py: { xs: 4, sm: 8 } }}>
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: 6,
          mb: 4,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #232936 60%, #1976d2 100%)'
            : 'linear-gradient(135deg, #fffbe7 60%, #ff9800 100%)',
        }}
      >
        <CardContent>
          <Button variant="outlined" sx={{ mb: 2, borderRadius: 3 }} onClick={onBack}>
            Back to Packages
          </Button>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
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
        </CardContent>
      </Card>
      {/* Feedback section */}
      <Feedback packageId={pkg.id} />
    </Container>
  );
}

export default PackageDetail;