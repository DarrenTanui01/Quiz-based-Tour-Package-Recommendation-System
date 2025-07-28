import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import { Button, TextField, MenuItem, Card, CardContent, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTheme } from '@mui/material/styles';

function BookingForm({ packageId, onBookingSuccess }) {
  const theme = useTheme(); 
  const { traveler } = useAuth();
  const travelerId = traveler?.id;
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState(0);
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get(`/bookings/hotels/${packageId}`).then(res => setHotels(res.data));
  }, [packageId]);

  useEffect(() => {
    if (selectedHotel) {
      const hotel = hotels.find(h => h.id === selectedHotel);
      if (hotel && startDate && endDate) {
        const nights = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
        setAmount(nights * hotel.price_per_night);
      }
    }
  }, [selectedHotel, startDate, endDate, hotels]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedHotel || !startDate || !endDate || !paymentMethod) {
      setMsg('Please fill all fields');
      return;
    }
    if (paymentMethod === 'mpesa') {
      setMsg('Sending STK push...');
      const res = await api.post('/mpesa/stkpush', { phone, amount });
      if (res.data.ResponseCode !== "0") {
        setMsg('Mpesa STK push failed. Please try again.');
        return;
      }
      setMsg('Mpesa STK push sent. Complete payment on your phone.');
      // Optionally: Wait for payment confirmation before proceeding
    }
    await api.post('/bookings/book', {
      traveler_id: travelerId,
      hotel_id: selectedHotel,
      package_id: packageId,
      start_date: startDate,
      end_date: endDate,
      payment_method: paymentMethod,
      amount
    });
    setMsg('Booking successful!');
    if (onBookingSuccess) onBookingSuccess();
  };

  return (
    <Card sx={{
      mb: 3,
      borderRadius: 4,
      boxShadow: 6,
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #232936 60%, #1976d2 100%)'
        : 'linear-gradient(135deg, #fffbe7 60%, #ff9800 100%)',
      p: { xs: 2, sm: 4 }
    }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Book Your Hotel</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Hotel"
            value={selectedHotel}
            onChange={e => setSelectedHotel(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            required
          >
            {hotels.map(h => (
              <MenuItem key={h.id} value={h.id}>{h.name} - {h.location}</MenuItem>
            ))}
          </TextField>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={setStartDate}
            sx={{ mb: 2, mr: 2 }}
            required
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={setEndDate}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            select
            label="Payment Method"
            value={paymentMethod}
            onChange={e => setPaymentMethod(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            required
          >
            <MenuItem value="cash">Cash</MenuItem>
            <MenuItem value="mpesa">Mpesa</MenuItem>
          </TextField>
          {paymentMethod === 'mpesa' && (
            <TextField
              label="Mpesa Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              required
            />
          )}
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, mt: 2, fontWeight: 700 }}
            fullWidth
          >
            {amount > 0 && paymentMethod === 'mpesa'
              ? `Book & Pay KES ${amount}`
              : 'Book'}
          </Button>
        </form>
        {msg && <Typography sx={{ mt: 2 }}>{msg}</Typography>}
      </CardContent>
    </Card>
  );
}

export default BookingForm;