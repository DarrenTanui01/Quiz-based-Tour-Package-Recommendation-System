import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import PackageDetail from './PackageDetail';
import packages from '../data/packages';
import { useTheme } from '@mui/material/styles';

function PackageList() {
  const [selected, setSelected] = useState(null);
  const theme = useTheme();

  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 4, sm: 8 },
        background: theme.palette.mode === 'light'
          ? 'linear-gradient(90deg, #fffbe7 80%,rgba(254, 157, 0, 0.82) 50%)'
          : 'inherit',
        minHeight: '100vh',
        transition: 'background 0.5s',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 700,
          fontSize: { xs: '2rem', sm: '2.5rem' },
          textAlign: 'center',
          color: theme.palette.mode === 'dark' ? '#fff' : '#232936'
        }}
      >
        Tour Packages
      </Typography>
      {!selected ? (
        <>
          {packages.map(pkg => (
            <Card
              key={pkg.id}
              sx={{
                mb: 3,
                borderRadius: 4,
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
                <Button
                  variant="outlined"
                  sx={{ mt: 2, borderRadius: 3 }}
                  onClick={() => setSelected(pkg)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </>
      ) : (
        <PackageDetail pkg={selected} onBack={() => setSelected(null)} />
      )}
    </Container>
  );
}

export default PackageList;