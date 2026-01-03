import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Eye, EyeOff } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Navbar from '../components/Navbar';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (error) setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }
        // Handle login logic here
        console.log('Login submitted:', formData);
    };

    const isFormValid = formData.email && formData.password;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-blue-50/20">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center p-3 bg-white rounded-xl shadow-sm mb-4">
                            <Globe className="h-8 w-8 text-primary" />
                        </div>
                        <h2 className="text-3xl font-display font-bold text-slate-900">
                            Welcome back
                        </h2>
                        <p className="mt-2 text-slate-600">
                            Log in to your PlanKaro account
                        </p>
                    </div>

                    <Card className="border-slate-200/60 shadow-lg shadow-slate-200/40 backdrop-blur-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Error Message */}
                            {error && (
                                <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600 font-medium">
                                    {error}
                                </div>
                            )}

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 sm:text-sm"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <label htmlFor="password" class="block text-sm font-medium text-slate-700">
                                        Password
                                    </label>
                                    <Link to="#" className="text-sm font-medium text-primary hover:text-blue-600 transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 sm:text-sm pr-10"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                fullWidth
                                disabled={!isFormValid}
                                className="py-2.5 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-[0.98] transition-all duration-200"
                            >
                                Log In
                            </Button>

                            <div className="text-center mt-6">
                                <p className="text-sm text-slate-600">
                                    Don't have an account?{' '}
                                    <Link to="/signup" className="font-semibold text-primary hover:text-blue-600 transition-colors">
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
