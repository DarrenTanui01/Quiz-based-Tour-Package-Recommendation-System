import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';

function Feedback({ packageId }) {
  const { traveler } = useAuth();
  const travelerId = traveler?.id;

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
      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Feedback from other travelers
        </Typography>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          feedbacks.map(fb => (
            <Box key={fb.id} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 2 }}>
              <Rating value={fb.rating} readOnly size="small" />
              <Typography variant="body2">{fb.comment}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(fb.timestamp).toLocaleString()}
              </Typography>
            </Box>
          ))
        )}
        {feedbacks.length === 0 && !loading && (
          <Typography>No feedback yet for this package.</Typography>
        )}
      </Box>
    </Box>
  );
}

export default Feedback;