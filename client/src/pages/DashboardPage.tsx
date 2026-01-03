import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import { Plus, MapPin, Calendar, Trash2, Search, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';

const DashboardPage: React.FC = () => {
    const { user, logout } = useAuthStore();
    const [trips, setTrips] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const res = await api.get('/trips');
                setTrips(res.data);
            } catch (err) {
                console.error('Failed to fetch trips', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTrips();
    }, []);

    const deleteTrip = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this trip?')) return;
        try {
            await api.delete(`/trips/${id}`);
            setTrips(trips.filter(t => t._id !== id));
        } catch (err) {
            alert('Failed to delete trip');
        }
    };

    const filteredTrips = trips.filter(trip =>
        trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-cream">
            <Navbar user={user ? { name: user.name, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.name } : null} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-4xl font-display font-bold text-text-dark">Welcome back, {user?.name}!</h1>
                        <p className="mt-1 text-text-light text-lg">Where is your next adventure taking you?</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <input
                                type="text"
                                placeholder="Search your trips..."
                                className="pl-10 pr-4 py-2 bg-white/50 border border-sand rounded-[20px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all w-64 text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-light" />
                        </div>
                        <Link to="/create-trip">
                            <Button variant="primary" className="flex items-center gap-2 shadow-lg">
                                <Plus size={18} />
                                Plan New Trip
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow-soft">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-text-light uppercase tracking-wider font-semibold">Total Trips</p>
                                <h3 className="text-3xl font-bold text-text-dark">{trips.length}</h3>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border-none shadow-soft">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-text-light uppercase tracking-wider font-semibold">Days Traveled</p>
                                <h3 className="text-3xl font-bold text-text-dark">
                                    {trips.reduce((acc, trip) => {
                                        const start = new Date(trip.startDate);
                                        const end = new Date(trip.endDate);
                                        return acc + Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                                    }, 0)}
                                </h3>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-none shadow-soft">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                                <Search size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-text-light uppercase tracking-wider font-semibold">Countries Visited</p>
                                <h3 className="text-3xl font-bold text-text-dark">
                                    {/* Mock calculation for countries */}
                                    {Math.floor(trips.length * 1.2)}
                                </h3>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Trips Grid */}
                <h2 className="text-2xl font-display font-bold text-text-dark mb-6">Recent Adventures</h2>
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-[400px] rounded-[28px] bg-sand/20 animate-pulse" />
                        ))}
                    </div>
                ) : filteredTrips.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTrips.map((trip) => (
                            <Card key={trip._id} className="group p-4 hover:shadow-medium transition-all duration-300">
                                {/* Image Placeholder or Image */}
                                <div className="relative h-48 mb-4 overflow-hidden rounded-[20px] bg-sand/30">
                                    <img
                                        src={`https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800&seed=${trip._id}`}
                                        alt={trip.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary shadow-sm">
                                        {trip.stops?.length || 0} {trip.stops?.length === 1 ? 'Stop' : 'Stops'}
                                    </div>
                                    <div className="absolute top-3 left-3 bg-primary/90 text-white backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                                        Upcoming
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-3">
                                    <div>
                                        <h3 className="text-xl font-bold text-text-dark group-hover:text-primary transition-colors truncate">
                                            {trip.name}
                                        </h3>
                                        <p className="text-sm text-text-light line-clamp-2 mt-1">
                                            {trip.description || "No description provided."}
                                        </p>
                                    </div>

                                    <div className="flex items-center text-text-light text-sm bg-sand/10 py-2 px-3 rounded-[12px]">
                                        <Calendar size={14} className="mr-2 text-primary" />
                                        {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-4 mt-2 border-t border-sand flex items-center justify-between gap-2">
                                        <Link to={`/trip/${trip._id}`} className="flex-1">
                                            <Button variant="secondary" className="w-full h-10 px-0 flex items-center justify-center gap-2 text-sm !rounded-[14px]">
                                                <Eye size={16} /> View
                                            </Button>
                                        </Link>
                                        <button
                                            onClick={() => deleteTrip(trip._id)}
                                            className="h-10 w-10 flex items-center justify-center rounded-[14px] bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        ))}

                        {/* Add New Trip Card */}
                        <Link to="/create-trip" className="block h-full">
                            <div className="h-full min-h-[400px] rounded-[28px] border-2 border-dashed border-sand hover:border-primary/50 bg-sand/5 flex flex-col items-center justify-center text-center p-6 transition-all cursor-pointer group hover:bg-sand/10">
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-soft mb-4 group-hover:scale-110 transition-transform">
                                    <Plus size={32} className="text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold text-text-dark mb-1">Create New Trip</h3>
                                <p className="text-text-light text-sm">Start your next journey here</p>
                            </div>
                        </Link>
                    </div>
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[32px] shadow-soft border border-sand/30">
                        <div className="w-64 h-64 bg-sand/20 rounded-full flex items-center justify-center mb-8 relative">
                            <MapPin size={80} className="text-primary opacity-50 absolute animate-bounce" />
                            <div className="w-48 h-48 bg-white/50 rounded-full absolute animate-pulse" />
                        </div>
                        <h2 className="text-2xl font-bold text-text-dark mb-2">No trips planned yet</h2>
                        <p className="text-text-light mb-8 max-w-md mx-auto">
                            Your dashboard is looking a bit empty. Why not start planning your next great adventure right now?
                        </p>
                        <Link to="/create-trip">
                            <Button variant="primary" className="flex items-center gap-2 px-8 py-3">
                                <Plus size={20} />
                                Plan Your First Trip
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
