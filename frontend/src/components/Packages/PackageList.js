import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import PackageDetail from './PackageDetail';
import packages from '../data/packages';

function PackageList() {
  const [selected, setSelected] = useState(null);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tour Packages
      </Typography>
      {!selected ? (
        <>
          {packages.map(pkg => (
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
                <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setSelected(pkg)}>
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