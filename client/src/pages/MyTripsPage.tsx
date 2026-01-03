import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, MapPin, Eye, Edit2, Trash2, Plus, Search, Grid, List as ListIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import ImageWithFallback from '../components/ImageWithFallback';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

interface Trip {
    _id: string;
    name: string;
    startDate: string;
    endDate: string;
    stops: any[];
    coverPhoto: string;
    description?: string;
    status?: string;
}

const MyTripsPage = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');
    const [currentMonth, setCurrentMonth] = useState(new Date());

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                setLoading(true);
                const response = await api.get('/trips');
                setTrips(response.data);
            } catch (err) {
                console.error('Failed to fetch trips:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this trip?')) {
            try {
                await api.delete(`/trips/${id}`);
                setTrips(trips.filter(t => t._id !== id));
            } catch (err) {
                console.error('Failed to delete trip:', err);
                alert('Failed to delete trip');
            }
        }
    };

    // Calendar Helper Functions
    const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const startDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));

    const getTripsForDate = (day: number) => {
        return trips.filter(t => {
            const startDate = new Date(t.startDate);
            const endDate = new Date(t.endDate);
            const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            return checkDate >= startDate && checkDate <= endDate;
        });
    };

    // Grouping trips
    const ongoingTrips = trips.filter(t => t.status === 'Ongoing');
    const upcomingTrips = trips.filter(t => t.status === 'Upcoming' || t.status === 'Planning' || t.status === 'Draft');
    const completedTrips = trips.filter(t => t.status === 'Completed');

    const TripGrid = ({ title, tripsList }: { title: string, tripsList: Trip[] }) => (
        tripsList.length > 0 ? (
            <div className="mb-12">
                <h2 className="text-xl font-bold text-text-dark mb-6 px-1 border-l-4 border-primary pl-3">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tripsList.map((trip) => (
                        <Card key={trip._id} className="group p-4 hover:shadow-medium transition-all duration-300">
                            <div className="relative h-48 mb-4 overflow-hidden rounded-[20px]">
                                <ImageWithFallback
                                    src={trip.coverPhoto || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800"}
                                    alt={trip.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary shadow-sm">
                                    {trip.stops?.length || 0} {trip.stops?.length === 1 ? 'City' : 'Cities'}
                                </div>
                                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow-sm backdrop-blur-sm ${trip.status === 'Completed' ? 'bg-gray-500/90 text-white' : 'bg-primary/90 text-white'
                                    }`}>
                                    {trip.status || 'Upcoming'}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <h3 className="text-xl font-bold text-text-dark group-hover:text-primary transition-colors line-clamp-1">
                                        {trip.name}
                                    </h3>
                                    <div className="flex items-center text-text-light text-sm mt-1">
                                        <MapPin size={14} className="mr-1 text-primary" />
                                        {trip.stops?.[0]?.cityId?.name || "Multiple Locations"}
                                    </div>
                                </div>

                                <div className="flex items-center text-text-light text-sm bg-sand/10 py-2 px-3 rounded-[12px]">
                                    <CalendarIcon size={14} className="mr-2 text-primary" />
                                    {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>

                                <div className="pt-4 mt-2 border-t border-sand flex items-center justify-between gap-2">
                                    <Link to={`/itinerary/${trip._id}`} className="flex-1">
                                        <Button variant="secondary" className="w-full h-10 px-0 flex items-center justify-center gap-2 text-sm !rounded-[14px]">
                                            <Eye size={16} /> View
                                        </Button>
                                    </Link>
                                    <Link to={`/edit-trip/${trip._id}`}>
                                        <button className="h-10 w-10 flex items-center justify-center rounded-[14px] bg-sand/20 text-text-dark hover:bg-primary/10 hover:text-primary transition-colors">
                                            <Edit2 size={18} />
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(trip._id)}
                                        className="h-10 w-10 flex items-center justify-center rounded-[14px] bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                    {title === "Upcoming" && (
                        <Link to="/create-trip" className="block h-full">
                            <div className="h-full min-h-[400px] rounded-[28px] border-2 border-dashed border-sand hover:border-primary/50 bg-sand/5 flex flex-col items-center justify-center text-center p-6 transition-all cursor-pointer group hover:bg-sand/10">
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-soft mb-4 group-hover:scale-110 transition-transform">
                                    <Plus size={32} className="text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold text-text-dark mb-1">Create New Trip</h3>
                                <p className="text-text-light text-sm">Start something new</p>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        ) : null
    );

    return (
        <div className="min-h-screen bg-cream">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-text-dark">My Trips</h1>
                        <p className="mt-1 text-text-light">Manage your upcoming adventures</p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* View Toggle */}
                        <div className="flex bg-white p-1 rounded-xl shadow-soft">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary text-white shadow-sm' : 'text-text-light hover:bg-sand/20'}`}
                            >
                                <Grid size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('calendar')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'calendar' ? 'bg-primary text-white shadow-sm' : 'text-text-light hover:bg-sand/20'}`}
                            >
                                <CalendarIcon size={20} />
                            </button>
                        </div>

                        <div className="relative hidden md:block">
                            <input
                                type="text"
                                placeholder="Search trips..."
                                className="pl-10 pr-4 py-2 bg-white border-none shadow-soft rounded-[20px] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-64 text-sm"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-light" />
                        </div>
                        <Link to="/create-trip">
                            <Button variant="primary" className="flex items-center gap-2">
                                <Plus size={18} />
                                Plan New Trip
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Content */}
                {viewMode === 'grid' ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <TripGrid title="Ongoing" tripsList={ongoingTrips} />
                        <TripGrid title="Upcoming" tripsList={upcomingTrips} />
                        <TripGrid title="Completed" tripsList={completedTrips} />
                        {trips.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-64 h-64 bg-sand/20 rounded-full flex items-center justify-center mb-8 relative">
                                    <MapPin size={80} className="text-primary opacity-50 absolute animate-bounce" />
                                    <div className="w-48 h-48 bg-white/50 rounded-full absolute animate-pulse" />
                                </div>
                                <h2 className="text-2xl font-bold text-text-dark mb-2">No trips planned yet</h2>
                                <p className="text-text-light mb-8 max-w-md">
                                    Your dashboard is looking a bit empty. Why not start planning your next great adventure right now?
                                </p>
                                <Link to="/create-trip">
                                    <Button variant="primary" size="lg" className="flex items-center gap-2">
                                        <Plus size={20} />
                                        Plan Your First Trip
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                ) : (
                    /* Calendar View (Screen 11) */
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl shadow-soft p-6 mb-8">
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-text-dark">
                                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </h2>
                            <div className="flex gap-2">
                                <button onClick={prevMonth} className="p-2 hover:bg-sand/20 rounded-full transition-colors"><ChevronLeft /></button>
                                <button onClick={nextMonth} className="p-2 hover:bg-sand/20 rounded-full transition-colors"><ChevronRight /></button>
                            </div>
                        </div>

                        {/* Days Header */}
                        <div className="grid grid-cols-7 mb-4 text-center">
                            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                                <div key={day} className="text-xs font-bold text-text-light tracking-wider py-2">{day}</div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-2">
                            {/* Empty cells for start of month */}
                            {Array.from({ length: startDayOfMonth(currentMonth) }).map((_, i) => (
                                <div key={`empty-${i}`} className="min-h-[100px] p-2 bg-sand/5 rounded-xl"></div>
                            ))}

                            {/* Days */}
                            {Array.from({ length: daysInMonth(currentMonth) }).map((_, i) => {
                                const day = i + 1;
                                const daysTrips = getTripsForDate(day);
                                return (
                                    <div key={day} className="min-h-[100px] p-2 border border-sand/30 rounded-xl hover:border-primary/30 transition-colors relative group">
                                        <span className={`text-sm font-medium ${true ? 'text-text-dark' : 'text-text-light'}`}>{day}</span>
                                        <div className="mt-2 space-y-1">
                                            {daysTrips.map(trip => (
                                                <div
                                                    key={trip._id}
                                                    className={`text-[10px] p-1.5 rounded truncate font-medium cursor-pointer ${trip.status === 'Ongoing' ? 'bg-primary text-white' :
                                                        trip.status === 'Upcoming' ? 'bg-accent/20 text-accent-dark' : 'bg-gray-100 text-gray-600'
                                                        }`}
                                                >
                                                    {trip.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default MyTripsPage;
