import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Calendar, AlignLeft, Send, ArrowLeft, MapPin } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';

const CreateTripPage: React.FC = () => {
    const { user } = useAuthStore();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/trips', { name, description, startDate, endDate });
            navigate(`/trip/${res.data._id}`);
        } catch (err) {
            alert('Failed to create trip');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cream">
            <Navbar user={user ? { name: user.name, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.name } : null} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-text-light hover:text-primary transition-colors mb-8 font-medium"
                >
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Form Section */}
                    <div className="lg:col-span-3">
                        <h1 className="text-4xl font-display font-bold text-text-dark mb-4">Start a New Adventure</h1>
                        <p className="text-text-light text-lg mb-8">Fill in the details below to begin planning your dream journey.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-text-dark ml-1">Trip Name</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder="e.g. Summer in Europe 2024"
                                        className="w-full pl-12 pr-4 py-4 bg-white border border-sand rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-dark shadow-soft"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-text-dark ml-1">Description (Optional)</label>
                                <div className="relative">
                                    <AlignLeft className="absolute left-4 top-4 text-primary" size={20} />
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="What's the vibe of this trip? Exploratory, relaxing, cultural?"
                                        className="w-full pl-12 pr-4 py-4 bg-white border border-sand rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-dark shadow-soft min-h-[120px]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-text-dark ml-1">Departure Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            required
                                            className="w-full pl-12 pr-4 py-4 bg-white border border-sand rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-dark shadow-soft"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-text-dark ml-1">Return Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            required
                                            className="w-full pl-12 pr-4 py-4 bg-white border border-sand rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-dark shadow-soft"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                fullWidth
                                disabled={loading}
                                className="py-4 text-lg shadow-lg"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Creating...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Let's Go!
                                        <Send size={20} />
                                    </span>
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Info Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="p-8 bg-primary/5 border-none shadow-soft">
                            <h3 className="text-xl font-bold text-text-dark mb-4">Why Plan with PlanKaro?</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                    </div>
                                    <p className="text-sm text-text-light">Add multiple cities and activities to your timeline seamlessly.</p>
                                </li>
                                <li className="flex gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                    </div>
                                    <p className="text-sm text-text-light">Automatically calculate and track your trip budget.</p>
                                </li>
                                <li className="flex gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                    </div>
                                    <p className="text-sm text-text-light">Share your beautiful itinerary with friends and family.</p>
                                </li>
                            </ul>
                        </Card>

                        <div className="relative h-64 rounded-[32px] overflow-hidden shadow-medium group">
                            <img
                                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800"
                                alt="Travel"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                <p className="text-white font-medium text-sm italic italic">"Travel is the only thing you buy that makes you richer."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTripPage;
