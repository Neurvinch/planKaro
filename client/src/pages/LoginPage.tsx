import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, Eye, EyeOff } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import logo from '../assets/logo.jpg';
import api from '../services/api';

const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/login', {
                email: formData.email,
                password: formData.password
            });

            // Store token and user
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Navigate to dashboard
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = formData.email && formData.password;

    return (
        <div className="min-h-screen bg-cream flex flex-col">
            <Navbar />

            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream via-sand/30 to-peach/10">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center p-3 bg-white rounded-[20px] shadow-soft mb-4">
                            <img src={logo} alt="PlanKaro Logo" className="h-10 w-auto" />
                        </div>
                        <h2 className="text-3xl font-display font-bold text-text-dark">
                            Welcome back
                        </h2>
                        <p className="mt-2 text-text-light">
                            Log in to your PlanKaro account
                        </p>
                    </div>

                    <Card className="border-sand/60 shadow-medium backdrop-blur-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Error Message */}
                            {error && (
                                <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600 font-medium">
                                    {error}
                                </div>
                            )}

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-text-dark mb-1">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full px-4 py-2.5 bg-sand/30 border border-sand rounded-[16px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 sm:text-sm"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <label htmlFor="password" className="block text-sm font-medium text-text-dark">
                                        Password
                                    </label>
                                    <Link to="#" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="block w-full px-4 py-2.5 bg-sand/30 border border-sand rounded-[16px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 sm:text-sm pr-10"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-light hover:text-text-dark focus:outline-none"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                fullWidth
                                disabled={!isFormValid || isLoading}
                                className="py-2.5 rounded-[20px]"
                            >
                                {isLoading ? 'Logging in...' : 'Log In'}
                            </Button>

                            <div className="text-center mt-6">
                                <p className="text-sm text-text-light">
                                    Don't have an account?{' '}
                                    <Link to="/signup" className="font-semibold text-primary hover:text-primary-dark transition-colors">
                                        Create account
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
