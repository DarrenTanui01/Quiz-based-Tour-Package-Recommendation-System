import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '@mui/material/styles';

function Feedback({ packageId }) {
  const { traveler } = useAuth();
  const travelerId = traveler?.id;
  const theme = useTheme();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch feedback for this package
  useEffect(() => {
    if (!packageId) return;
    setLoading(true);
    api.get(`/feedback/package/${packageId}`)
      .then(res => setFeedbacks(res.data))
      .finally(() => setLoading(false));
  }, [packageId]);

  // Handle feedback submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment) return;
    setLoading(true);
    try {
      await api.post('/feedback/', {
        traveler_id: travelerId || 1, // Replace with real traveler ID from auth
        package_id: packageId,
        rating,
        comment
      });
      setSuccessMsg('Feedback submitted!');
      setRating(0);
      setComment('');
      // Refresh feedback list
      const res = await api.get(`/feedback/package/${packageId}`);
      setFeedbacks(res.data);
    } catch (err) {
      setSuccessMsg('Error submitting feedback.');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 4,
          mb: 4,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #232936 60%, #1976d2 100%)'
            : 'linear-gradient(135deg, #fffbe7 60%, #ff9800 100%)',
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Leave Feedback
          </Typography>
          <form onSubmit={handleSubmit}>
            <Rating
              name="rating"
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
            />
            <TextField
              label="Comment"
              multiline
              minRows={2}
              fullWidth
              value={comment}
              onChange={e => setComment(e.target.value)}
              sx={{ my: 2 }}
            />
            <Button type="submit" variant="contained" disabled={loading || !rating || !comment}>
              Submit
            </Button>
            {successMsg && (
              <Typography color="success.main" sx={{ mt: 1 }}>
                {successMsg}
              </Typography>
            )}
          </form>
        </CardContent>
      </Card>
      <Typography variant="subtitle1" gutterBottom>
        Feedback from other travelers
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        feedbacks.map(fb => (
          <Card
            key={fb.id}
            sx={{
              mb: 2,
              borderRadius: 2,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #232936 60%, #1976d2 100%)'
                : 'linear-gradient(135deg, #fffbe7 60%, #ff9800 100%)',
            }}
          >
            <CardContent>
              <Rating value={fb.rating} readOnly size="small" />
              <Typography variant="body2">{fb.comment}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(fb.timestamp).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
      {feedbacks.length === 0 && !loading && (
        <Typography>No feedback yet for this package.</Typography>
      )}
    </Box>
  );
}

export default Feedback;