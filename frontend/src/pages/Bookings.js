import React, { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, Typography, Container } from '@mui/material';

function Bookings() {
  const { traveler } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (traveler?.id) {
      api.get(`/bookings/user/${traveler.id}`).then(res => setBookings(res.data));
    }
  }, [traveler]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>My Bookings</Typography>
      {bookings.map(b => (
        <Card key={b.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography>Hotel: {b.hotel_name}</Typography>
            <Typography>Dates: {b.start_date} to {b.end_date}</Typography>
            <Typography>Payment: {b.payment_method} ({b.payment_status})</Typography>
            <Typography>Amount: {b.amount}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default Bookings;