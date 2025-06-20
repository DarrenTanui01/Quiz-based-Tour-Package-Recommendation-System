import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import api from '../../api';

const ADMIN_CREDENTIALS = [
  { email: 'AdminDT@gmail.com', password: 'AdminDT' },
  { email: 'AdminEW@gmail.com', password: 'AdminEW' }
];

function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem('isAdmin') === 'true'
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMsg, setLoginMsg] = useState('');
  const [users, setUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Admin login handler
  const handleAdminLogin = (e) => {
    e.preventDefault();
    const found = ADMIN_CREDENTIALS.find(
      (a) => a.email === email && a.password === password
    );
    if (found) {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      setLoginMsg('');
    } else {
      setLoginMsg('Invalid admin credentials');
    }
  };

  // Logout admin
  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  // Fetch users and feedbacks (requires backend endpoints)
  useEffect(() => {
    if (isAdmin) {
      api.get('/auth/users').then((res) => setUsers(res.data));
      api.get('/feedback/').then((res) => setFeedbacks(res.data));
    }
  }, [isAdmin, refresh]);

  // Delete user
  const handleDeleteUser = (id) => {
    api.delete(`/auth/users/${id}`).then(() => setRefresh((r) => !r));
  };

  // Delete feedback
  const handleDeleteFeedback = (id) => {
    api.delete(`/feedback/${id}`).then(() => setRefresh((r) => !r));
  };

  if (!isAdmin) {
    return (
      <Container maxWidth="xs" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Admin Login
        </Typography>
        <form onSubmit={handleAdminLogin}>
          <TextField
            label="Admin Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth>
            Login as Admin
          </Button>
        </form>
        {loginMsg && (
          <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
            {loginMsg}
          </Typography>
        )}
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Button variant="outlined" color="secondary" onClick={handleAdminLogout} sx={{ mb: 3 }}>
        Logout Admin
      </Button>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Users
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.id}</TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <Button color="error" onClick={() => handleDeleteUser(u.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Feedback
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Feedback ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Package ID</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbacks.map((f) => (
              <TableRow key={f.id}>
                <TableCell>{f.id}</TableCell>
                <TableCell>{f.traveler_id}</TableCell>
                <TableCell>{f.package_id}</TableCell>
                <TableCell>{f.rating}</TableCell>
                <TableCell>{f.comment}</TableCell>
                <TableCell>
                  <Button color="error" onClick={() => handleDeleteFeedback(f.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AdminDashboard;