import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import api from '../services/api';

const SignupPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [passwordStrength, setPasswordStrength] = useState(0);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const calculateStrength = (pass) => {
        let strength = 0;
        if (pass.length === 0) return 0;
        if (pass.length >= 8) strength += 1; // Length
        if (/[A-Z]/.test(pass)) strength += 1; // Uppercase
        if (/[0-9]/.test(pass)) strength += 1; // Number
        if (/[^A-Za-z0-9]/.test(pass)) strength += 1; // Special char
        return strength;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'password') {
            setPasswordStrength(calculateStrength(value));
        }
        if (error) setError('');
    };

    const getStrengthColor = () => {
        if (passwordStrength === 0) return 'bg-slate-200';
        if (passwordStrength <= 2) return 'bg-red-500';
        if (passwordStrength === 3) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const getStrengthLabel = () => {
        if (passwordStrength === 0) return '';
        if (passwordStrength <= 2) return 'Weak';
        if (passwordStrength === 3) return 'Medium';
        return 'Strong';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/register', {
                name: formData.fullName,
                email: formData.email,
                password: formData.password
            });

            // Store token
            localStorage.setItem('token', response.data.token);

            // Navigate to dashboard
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cream">
            <Navbar />

            <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream via-sand/30 to-peach/10">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-display font-bold text-text-dark">
                            Create an account
                        </h2>
                        <p className="mt-2 text-text-light">
                            Start planning your next adventure today
                        </p>
                    </div>

                    <Card>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Error Message */}
                            {error && (
                                <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600 font-medium">
                                    {error}
                                </div>
                            )}

                            {/* Full Name */}
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-text-dark mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    className="block w-full px-4 py-2.5 bg-sand/30 border border-sand rounded-[16px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 sm:text-sm"
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </div>

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
                                <label htmlFor="password" className="block text-sm font-medium text-text-dark mb-1">
                                    Password
                                </label>
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
                                {/* Password Strength Indicator */}
                                {formData.password && (
                                    <div className="mt-2">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs text-text-light font-medium">Strength</span>
                                            <span className={`text-xs font-semibold ${passwordStrength <= 2 ? 'text-accent' :
                                                passwordStrength === 3 ? 'text-sunset' : 'text-secondary'
                                                }`}>
                                                {getStrengthLabel()}
                                            </span>
                                        </div>
                                        <div className="h-1.5 w-full bg-sand rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                                                style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                            />
                                        </div>
                                        <div className="mt-2 grid grid-cols-2 gap-1 text-xs text-text-light">
                                            <div className="flex items-center gap-1">
                                                {formData.password.length >= 8 ? <Check size={12} className="text-secondary" /> : <div className="w-3 h-3 rounded-full border border-sand" />}
                                                Min 8 chars
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {/[A-Z]/.test(formData.password) ? <Check size={12} className="text-secondary" /> : <div className="w-3 h-3 rounded-full border border-sand" />}
                                                uppercase
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {/[0-9]/.test(formData.password) ? <Check size={12} className="text-secondary" /> : <div className="w-3 h-3 rounded-full border border-sand" />}
                                                number
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {/[^A-Za-z0-9]/.test(formData.password) ? <Check size={12} className="text-secondary" /> : <div className="w-3 h-3 rounded-full border border-sand" />}
                                                symbol
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-dark mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    className={`block w-full px-4 py-2.5 bg-sand/30 border rounded-[16px] focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 sm:text-sm ${formData.confirmPassword && formData.password !== formData.confirmPassword
                                        ? 'border-accent focus:ring-accent/20 focus:border-accent'
                                        : 'border-sand focus:ring-primary/20 focus:border-primary'
                                        }`}
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                    <p className="mt-1 text-xs text-accent">Passwords do not match</p>
                                )}
                            </div>

                            <Button type="submit" fullWidth className="mt-2" disabled={isLoading}>
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </Button>

                            <div className="text-center mt-4">
                                <p className="text-sm text-text-light">
                                    Already have an account?{' '}
                                    <Link to="/login" className="font-medium text-primary hover:text-primary-dark transition-colors">
                                        Log in
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

export default SignupPage;
