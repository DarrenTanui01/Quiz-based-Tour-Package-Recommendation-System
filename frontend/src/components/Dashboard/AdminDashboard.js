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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import api from '../../api';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

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
  const [packages, setPackages] = useState([]);
  const [mostChosenPackages, setMostChosenPackages] = useState([]);
  const [pkgDialogOpen, setPkgDialogOpen] = useState(false);
  const [editPkg, setEditPkg] = useState(null);
  const [pkgForm, setPkgForm] = useState({
    name: '', description: '', estimated_cost: '', duration_days: '', season: ''
  });
  const [hotels, setHotels] = useState([]);
  const [hotelDialogOpen, setHotelDialogOpen] = useState(false);
  const [editHotel, setEditHotel] = useState(null);
  const [hotelForm, setHotelForm] = useState({
    name: '', location: '', description: '', package_id: '', price_per_night: '', image_url: ''
  });
  const [transportOptions, setTransportOptions] = useState([]);
  const [transportDialogOpen, setTransportDialogOpen] = useState(false);
  const [editTransport, setEditTransport] = useState(null);
  const [transportForm, setTransportForm] = useState({
    type: '', name: '', details: '', price: '', package_id: ''
  });
  const theme = useTheme();

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


  useEffect(() => {
    if (isAdmin) {
      api.get('/auth/users').then((res) => setUsers(res.data));
      api.get('/feedback/').then((res) => setFeedbacks(res.data));
      api.get('/packages/').then(res => setPackages(res.data));
      api.get('/quiz/report/most_chosen_packages').then(res => setMostChosenPackages(res.data));
      api.get('/hotels/').then(res => setHotels(res.data));
      api.get('/transport/').then(res => setTransportOptions(res.data));
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

  // Handle open/close dialog
  const handleOpenPkgDialog = (pkg = null) => {
    setEditPkg(pkg);
    setPkgForm(pkg ? { ...pkg } : { name: '', description: '', estimated_cost: '', duration_days: '', season: '' });
    setPkgDialogOpen(true);
  };
  const handleClosePkgDialog = () => setPkgDialogOpen(false);

  // Handle form change
  const handlePkgFormChange = e => setPkgForm({ ...pkgForm, [e.target.name]: e.target.value });

  // Create or update package
  const handlePkgSubmit = async e => {
    e.preventDefault();
    if (editPkg) {
      await api.put(`/packages/${editPkg.id}`, pkgForm);
    } else {
      await api.post('/packages/', pkgForm);
    }
    setRefresh(r => !r);
    handleClosePkgDialog();
  };

  // Delete package
  const handleDeletePkg = async id => {
    await api.delete(`/packages/${id}`);
    setRefresh(r => !r);
  };

  // Handle open/close dialog for hotels
  const handleOpenHotelDialog = (hotel = null) => {
    setEditHotel(hotel);
    setHotelForm(hotel ? { ...hotel } : { name: '', location: '', description: '', package_id: '', price_per_night: '', image_url: '' });
    setHotelDialogOpen(true);
  };
  const handleCloseHotelDialog = () => setHotelDialogOpen(false);

  // Handle form change for hotels
  const handleHotelFormChange = e => setHotelForm({ ...hotelForm, [e.target.name]: e.target.value });

  // Create or update hotel
  const handleHotelSubmit = async e => {
    e.preventDefault();
    if (editHotel) {
      await api.put(`/hotels/${editHotel.id}`, hotelForm);
    } else {
      await api.post('/hotels/', hotelForm);
    }
    setRefresh(r => !r);
    handleCloseHotelDialog();
  };

  // Delete hotel
  const handleDeleteHotel = async id => {
    await api.delete(`/hotels/${id}`);
    setRefresh(r => !r);
  };

  // Handle open/close dialog for transport options
  const handleOpenTransportDialog = (option = null) => {
    setEditTransport(option);
    setTransportForm(option ? { ...option } : { type: '', name: '', details: '', price: '', package_id: '' });
    setTransportDialogOpen(true);
  };
  const handleCloseTransportDialog = () => setTransportDialogOpen(false);

  // Handle form change for transport options
  const handleTransportFormChange = e => setTransportForm({ ...transportForm, [e.target.name]: e.target.value });

  // Create or update transport option
  const handleTransportSubmit = async e => {
    e.preventDefault();
    if (editTransport) {
      await api.put(`/transport/${editTransport.id}`, transportForm);
    } else {
      await api.post('/transport/', transportForm);
    }
    setRefresh(r => !r);
    handleCloseTransportDialog();
  };

  // Delete transport option
  const handleDeleteTransport = async id => {
    await api.delete(`/transport/${id}`);
    setRefresh(r => !r);
  };

  if (!isAdmin) {
    return (
      <Container maxWidth="xs" sx={{ py: 6 }}>
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: 6,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #232936 60%, #1976d2 100%)'
              : 'linear-gradient(135deg, #fffbe7 60%, #ff9800 100%)',
          }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 700 }}>
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
              <Button type="submit" variant="contained" fullWidth sx={{ borderRadius: 3 }}>
                Login as Admin
              </Button>
            </form>
            {loginMsg && (
              <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                {loginMsg}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        background: theme.palette.mode === 'light'
          ? 'linear-gradient(90deg, #fffbe7 80%, rgb(207, 144, 42) 80%)'
          : theme.palette.background.default,
        transition: 'background 0.5s',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: 6,
            mb: 4,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #232936 60%, #1976d2 100%)'
              : 'linear-gradient(135deg, #fffbe7 60%, #ff9800 100%)',
          }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              Admin Dashboard
            </Typography>
            <Button variant="outlined" color="secondary" onClick={handleAdminLogout} sx={{ mb: 3 }}>
              Logout Admin
            </Button>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Users
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 4, borderRadius: 3 }}>
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
            <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
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
            <Typography variant="h6" sx={{ mt: 2 }}>
              Packages
            </Typography>
            <Button variant="contained" color="primary" sx={{ mb: 2, borderRadius: 3 }} onClick={() => handleOpenPkgDialog()}>
              Add Package
            </Button>
            <TableContainer component={Paper} sx={{ borderRadius: 3, mb: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Season</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {packages.map(pkg => (
                    <TableRow key={pkg.id}>
                      <TableCell>{pkg.id}</TableCell>
                      <TableCell>{pkg.name}</TableCell>
                      <TableCell>{pkg.description}</TableCell>
                      <TableCell>{pkg.estimated_cost}</TableCell>
                      <TableCell>{pkg.duration_days}</TableCell>
                      <TableCell>{pkg.season}</TableCell>
                      <TableCell>
                        <Button color="primary" onClick={() => handleOpenPkgDialog(pkg)}>Edit</Button>
                        <Button color="error" onClick={() => handleDeletePkg(pkg.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Hotels
            </Typography>
            <Button variant="contained" onClick={() => handleOpenHotelDialog()}>
              Add Hotel
            </Button>
            <TableContainer component={Paper} sx={{ borderRadius: 3, mb: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Package</TableCell>
                    <TableCell>Price/Night</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hotels.map(hotel => (
                    <TableRow key={hotel.id}>
                      <TableCell>{hotel.id}</TableCell>
                      <TableCell>{hotel.name}</TableCell>
                      <TableCell>{hotel.location}</TableCell>
                      <TableCell>{hotel.package_id}</TableCell>
                      <TableCell>{hotel.price_per_night}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleOpenHotelDialog(hotel)}>Edit</Button>
                        <Button color="error" onClick={() => handleDeleteHotel(hotel.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Transport Options
            </Typography>
            <Button variant="contained" onClick={() => handleOpenTransportDialog()}>
              Add Transport Option
            </Button>
            <TableContainer component={Paper} sx={{ borderRadius: 3, mb: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Details</TableCell>
                    <TableCell>Package</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transportOptions.map(option => (
                    <TableRow key={option.id}>
                      <TableCell>{option.id}</TableCell>
                      <TableCell>{option.type}</TableCell>
                      <TableCell>{option.name}</TableCell>
                      <TableCell>{option.details}</TableCell>
                      <TableCell>{option.package_id}</TableCell>
                      <TableCell>{option.price}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleOpenTransportDialog(option)}>Edit</Button>
                        <Button color="error" onClick={() => handleDeleteTransport(option.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
        <Card sx={{ borderRadius: 4, boxShadow: 6, mb: 4, background: theme.palette.mode === 'dark'
  ? 'linear-gradient(135deg, #232936 60%, #1976d2 100%)'
  : 'linear-gradient(135deg, #fffbe7 60%, #ff9800 100%)', }}>
  <CardContent>
    <Typography variant="h6" sx={{ fontWeight: 700 }}>
      Most Chosen Packages (Quiz Report)
    </Typography>
    {mostChosenPackages.length === 0 ? (
      <Typography>No data yet.</Typography>
    ) : (
      <TableContainer component={Paper} sx={{ borderRadius: 3, mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Package Name</TableCell>
              <TableCell>Times Chosen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mostChosenPackages.map(pkg => (
              <TableRow key={pkg.id}>
                <TableCell>{pkg.name}</TableCell>
                <TableCell>{pkg.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </CardContent>
</Card>
      </Container>
      <Dialog open={pkgDialogOpen} onClose={handleClosePkgDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editPkg ? "Edit Package" : "Add Package"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handlePkgSubmit}>
            <TextField label="Name" name="name" value={pkgForm.name} onChange={handlePkgFormChange} fullWidth sx={{ mb: 2 }} required />
            <TextField label="Description" name="description" value={pkgForm.description} onChange={handlePkgFormChange} fullWidth sx={{ mb: 2 }} required />
            <TextField label="Estimated Cost" name="estimated_cost" value={pkgForm.estimated_cost} onChange={handlePkgFormChange} fullWidth sx={{ mb: 2 }} required />
            <TextField label="Duration (days)" name="duration_days" value={pkgForm.duration_days} onChange={handlePkgFormChange} fullWidth sx={{ mb: 2 }} required />
            <TextField label="Season" name="season" value={pkgForm.season} onChange={handlePkgFormChange} fullWidth sx={{ mb: 2 }} required />
            <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 3 }}>
              {editPkg ? "Update" : "Create"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={hotelDialogOpen} onClose={handleCloseHotelDialog}>
        <DialogTitle>{editHotel ? "Edit Hotel" : "Add Hotel"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleHotelSubmit}>
            <TextField label="Name" name="name" value={hotelForm.name} onChange={handleHotelFormChange} fullWidth sx={{ mb: 2 }} required />
            <TextField label="Location" name="location" value={hotelForm.location} onChange={handleHotelFormChange} fullWidth sx={{ mb: 2 }} required />
            <TextField label="Description" name="description" value={hotelForm.description} onChange={handleHotelFormChange} fullWidth sx={{ mb: 2 }} required />
            <TextField label="Package ID" name="package_id" value={hotelForm.package_id} onChange={handleHotelFormChange} fullWidth sx={{ mb: 2 }} required />
            <TextField label="Price per Night" name="price_per_night" value={hotelForm.price_per_night} onChange={handleHotelFormChange} fullWidth sx={{ mb: 2 }} required />
            <TextField label="Image URL" name="image_url" value={hotelForm.image_url} onChange={handleHotelFormChange} fullWidth sx={{ mb: 2 }} required />
            <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 3 }}>
              {editHotel ? "Update" : "Create"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={transportDialogOpen} onClose={handleCloseTransportDialog}>
        <DialogTitle>{editTransport ? "Edit Transport Option" : "Add Transport Option"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleTransportSubmit}>
            <TextField label="Type" name="type" value={transportForm.type} onChange={handleTransportFormChange} fullWidth sx={{ mb: 2 }} required />
            <TextField label="Name" name="name" value={transportForm.name} onChange={handleTransportFormChange} fullWidth sx={{ mb: 2 }} required />
            <TextField label="Details" name="details" value={transportForm.details} onChange={handleTransportFormChange} fullWidth sx={{ mb: 2 }} required />
            <TextField label="Package ID" name="package_id" value={transportForm.package_id} onChange={handleTransportFormChange} fullWidth sx={{ mb: 2 }} required />
            <TextField label="Price" name="price" value={transportForm.price} onChange={handleTransportFormChange} fullWidth sx={{ mb: 2 }} required />
            <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 3 }}>
              {editTransport ? "Update" : "Create"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default AdminDashboard;