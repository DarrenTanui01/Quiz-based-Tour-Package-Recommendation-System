import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import { Button, TextField, MenuItem, Card, CardContent, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTheme } from '@mui/material/styles';

function TransportBookingForm({ packageId, onBookingSuccess }) {
  const theme = useTheme();
  const { traveler } = useAuth();
  const travelerId = traveler?.id;
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [date, setDate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState(0);
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get(`/bookings/transport_options/${packageId}`).then(res => setOptions(res.data));
  }, [packageId]);

  useEffect(() => {
    if (selectedOption) {
      const opt = options.find(o => o.id === selectedOption);
      if (opt) setAmount(opt.price);
    }
  }, [selectedOption, options]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOption || !date || !paymentMethod) {
      setMsg('Please fill all fields');
      return;
    }
    if (paymentMethod === 'mpesa') {
      setMsg(`Sending STK push for KES ${amount}...`);
      const res = await api.post('/mpesa/stkpush', { phone, amount });
      if (res.data.ResponseCode !== "0") {
        setMsg('Mpesa STK push failed. Please try again.');
        return;
      }
      setMsg('Mpesa STK push sent. Complete payment on your phone.');
      // Optionally: Wait for payment confirmation before proceeding
    }
    await api.post('/bookings/book_transport', {
      traveler_id: travelerId,
      transport_option_id: selectedOption,
      date,
      payment_method: paymentMethod,
      amount
    });
    setMsg('Transport booking successful!');
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
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Book Your Transport</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Transport Option"
            value={selectedOption}
            onChange={e => setSelectedOption(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            required
          >
            {options.map(o => (
              <MenuItem key={o.id} value={o.id}>{o.type} - {o.name}</MenuItem>
            ))}
          </TextField>
          <DatePicker
            label="Date"
            value={date}
            onChange={setDate}
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
              ? `Book Transport & Pay KES ${amount}`
              : 'Book Transport'}
          </Button>
        </form>
        {msg && <Typography sx={{ mt: 2 }}>{msg}</Typography>}
      </CardContent>
    </Card>
  );
}

export default TransportBookingForm;