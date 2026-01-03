import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Button from './components/Button';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import CreateTripPage from './pages/CreateTripPage';
import DashboardPage from './pages/DashboardPage';

// Placeholder Home Page
const HomePage = () => (
  <div className="min-h-screen bg-cream">
    <Navbar />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-display font-bold text-text-dark sm:text-5xl md:text-6xl">
          Discover Your Next <span className="bg-gradient-to-r from-primary via-sunset to-accent bg-clip-text text-transparent">Adventure</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-text-light sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Plan trips, book hotels, and find the best flights all in one place. Join PlanKaro today.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8 gap-4">
          <Link to="/dashboard">
            <Button variant="primary" className="mb-3 sm:mb-0 w-full sm:w-auto">Go to Dashboard</Button>
          </Link>
          <Button variant="outline" className="w-full sm:w-auto">Learn More</Button>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-trip" element={<CreateTripPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
