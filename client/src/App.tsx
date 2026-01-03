import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import Navbar from './components/Navbar';
import Button from './components/Button';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import CreateTripPage from './pages/CreateTripPage';
import DashboardPage from './pages/DashboardPage';
import MyTripsPage from './pages/MyTripsPage';
import ItineraryPage from './pages/ItineraryPage';
import BudgetPage from './pages/BudgetPage';
import TimelinePage from './pages/TimelinePage';
import PublicItineraryPage from './pages/PublicItineraryPage';

import CommunityPage from './pages/CommunityPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminPage from './pages/AdminPage';

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

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><SignupPage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/create-trip" element={<PageTransition><CreateTripPage /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><DashboardPage /></PageTransition>} />
        <Route path="/my-trips" element={<PageTransition><MyTripsPage /></PageTransition>} />
        <Route path="/community" element={<PageTransition><CommunityPage /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><UserProfilePage /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><AdminPage /></PageTransition>} />
        <Route path="/itinerary/:id" element={<PageTransition><ItineraryPage /></PageTransition>} />
        <Route path="/itinerary" element={<PageTransition><ItineraryPage /></PageTransition>} />
        <Route path="/budget/:id" element={<PageTransition><BudgetPage /></PageTransition>} />
        <Route path="/timeline/:id" element={<PageTransition><TimelinePage /></PageTransition>} />
        <Route path="/public/itinerary/:id" element={<PageTransition><PublicItineraryPage /></PageTransition>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
