import React from 'react';
import { useAuthStore } from './store/authStore';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CreateTripPage from './pages/CreateTripPage';
import SignupPage from './pages/SignupPage';
import ItineraryPage from './pages/ItineraryPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
    const { isAuthenticated } = useAuthStore();

    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route
                        path="/login"
                        element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/signup"
                        element={!isAuthenticated ? <SignupPage /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/"
                        element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/create-trip"
                        element={isAuthenticated ? <CreateTripPage /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/trip/:id"
                        element={isAuthenticated ? <ItineraryPage /> : <Navigate to="/login" />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
