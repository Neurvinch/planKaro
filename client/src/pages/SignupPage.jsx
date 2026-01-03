import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Navbar from '../components/Navbar';

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [passwordStrength, setPasswordStrength] = useState(0);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-display font-bold text-slate-900">
                            Create an account
                        </h2>
                        <p className="mt-2 text-slate-600">
                            Start planning your next adventure today
                        </p>
                    </div>

                    <Card>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Full Name */}
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    className="block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </div>

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
                                    className="block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm pr-10"
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
                                {/* Password Strength Indicator */}
                                {formData.password && (
                                    <div className="mt-2">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs text-slate-500 font-medium">Strength</span>
                                            <span className={`text-xs font-semibold ${passwordStrength <= 2 ? 'text-red-500' :
                                                    passwordStrength === 3 ? 'text-yellow-600' : 'text-green-600'
                                                }`}>
                                                {getStrengthLabel()}
                                            </span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                                                style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                            />
                                        </div>
                                        <div className="mt-2 grid grid-cols-2 gap-1 text-xs text-slate-500">
                                            <div className="flex items-center gap-1">
                                                {formData.password.length >= 8 ? <Check size={12} className="text-green-500" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                                                Min 8 chars
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {/[A-Z]/.test(formData.password) ? <Check size={12} className="text-green-500" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                                                uppercase
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {/[0-9]/.test(formData.password) ? <Check size={12} className="text-green-500" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                                                number
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {/[^A-Za-z0-9]/.test(formData.password) ? <Check size={12} className="text-green-500" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                                                symbol
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    className={`block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm ${formData.confirmPassword && formData.password !== formData.confirmPassword
                                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                            : 'border-slate-300'
                                        }`}
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                    <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
                                )}
                            </div>

                            <Button type="submit" fullWidth className="mt-2">
                                Create Account
                            </Button>

                            <div className="text-center mt-4">
                                <p className="text-sm text-slate-600">
                                    Already have an account?{' '}
                                    <Link to="/login" className="font-medium text-primary hover:text-blue-600 transition-colors">
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
