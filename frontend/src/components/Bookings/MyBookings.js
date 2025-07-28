import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import {
  Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box, Chip
} from '@mui/material';

function MyBookings() {
  const { traveler } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (traveler?.id) {
      api.get(`/bookings/user/${traveler.id}`).then(res => setBookings(res.data));
    }
  }, [traveler]);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Card sx={{ borderRadius: 4, boxShadow: 6, mb: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            My Hotel Bookings
          </Typography>
          <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: '#ffe0b2' }}>
                  <TableCell sx={{ fontWeight: 700 }}>Hotel</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Start Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>End Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Payment</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Amount (KES)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography>No bookings found.</Typography>
                    </TableCell>
                  </TableRow>
                )}
                {bookings.map(b => (
                  <TableRow
                    key={b.id}
                    hover
                    sx={{
                      '&:hover': {
                        background: '#fffde7'
                      }
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600 }}>{b.hotel_name}</TableCell>
                    <TableCell>{b.start_date}</TableCell>
                    <TableCell>{b.end_date}</TableCell>
                    <TableCell>
                      <Chip
                        label={b.payment_method}
                        color={b.payment_method === 'mpesa' ? 'success' : 'primary'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={b.payment_status}
                        color={b.payment_status === 'pending' ? 'warning' : 'success'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{b.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}

export default MyBookings;