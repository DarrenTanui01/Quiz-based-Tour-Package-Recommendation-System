import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import TravelerDashboard from './components/Dashboard/TravelerDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import Quiz from './components/Quiz/Quiz';
import PackageList from './components/Packages/PackageList';
import PackageDetail from './components/Packages/PackageDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} /> {/* Login is now the landing page */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<TravelerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/packages" element={<PackageList />} />
          <Route path="/packages/:id" element={<PackageDetail />} />
          <Route path="/home" element={<Home />} /> {/* Home is now protected, see below */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
