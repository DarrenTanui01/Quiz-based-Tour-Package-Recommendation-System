import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

function QuizResult({ recommended, onViewDetail }) {
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Your Recommended Tour Packages
      </Typography>
      {recommended.length === 0 ? (
        <Typography>No matching packages found. Try adjusting your preferences.</Typography>
      ) : (
        recommended.map(pkg => (
          <Card key={pkg.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{pkg.packageName}</Typography>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {pkg.persona}
              </Typography>
              <Typography>{pkg.description}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Duration: {pkg.duration} | Price: {pkg.estimatedCost}
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }} onClick={() => onViewDetail(pkg)}>
                View Details
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}

export default QuizResult;