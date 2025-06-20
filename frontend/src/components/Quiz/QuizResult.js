import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

function QuizResult({ recommended, onViewDetail }) {
  const theme = useTheme();
  return (
    <div>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: 700, color: theme.palette.mode === 'dark' ? '#fff' : '#232936' }}
      >
        Your Recommended Tour Packages
      </Typography>
      {recommended.length === 0 ? (
        <Typography>No matching packages found. Try adjusting your preferences.</Typography>
      ) : (
        recommended.map(pkg => (
          <Card
            key={pkg.id}
            sx={{
              mb: 2,
              borderRadius: 3,
              boxShadow: 4,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #232936 60%, #1976d2 100%)'
                : 'linear-gradient(135deg, #fffbe7 60%, #ff9800 100%)',
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {pkg.packageName}
              </Typography>
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
    </div>
  );
}

export default QuizResult;