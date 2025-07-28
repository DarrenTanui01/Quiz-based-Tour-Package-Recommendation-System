import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import Quiz from './components/Quiz/Quiz';
import PackageList from './components/Packages/PackageList';
import PackageDetail from './components/Packages/PackageDetail';
import NotFound from './pages/NotFound';
import Bookings from './pages/Bookings';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/packages" element={<PackageList />} />
        <Route path="/packages/:id" element={<PackageDetail />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/bookings" element={<Bookings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
