import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, MapPin, Calendar, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import ImageWithFallback from '../components/ImageWithFallback';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Trip {
    _id: string;
    name: string;
    startDate: string;
    endDate: string;
    stops: any[];
    coverPhoto: string;
    status?: string;
}

const DashboardPage = () => {
    const [loading, setLoading] = useState(true);

    // Get User Data from localStorage
    const [user, setUser] = useState({
        name: "Traveler",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Traveler"
    });

    const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([]);

    useEffect(() => {
        // Load user from localStorage
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const parsed = JSON.parse(savedUser);
                setUser({
                    name: parsed.name || "Traveler",
                    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${parsed.name || "Traveler"}`
                });
            } catch (e) {
                console.error('Failed to parse user:', e);
            }
        }

        const fetchTrips = async () => {
            try {
                setLoading(true);
                const response = await api.get('/trips');
                setUpcomingTrips(response.data);
            } catch (err) {
                console.error('Failed to fetch trips:', err);
                // Fallback to empty if error
                setUpcomingTrips([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

    const formatDateRange = (start: string, end: string) => {
        if (!start || !end) return "Dates TBD";
        const startDate = new Date(start);
        const endDate = new Date(end);
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
        return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
    };

    // Mock Popular Destinations
    const popularDestinations = [
        { id: 1, name: "Jaipur, Rajasthan", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=600" },
        { id: 2, name: "Munnar, Kerala", image: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&q=80&w=600" },
        { id: 3, name: "Varanasi, UP", image: "https://images.unsplash.com/photo-1561361513-2d000a45f0dc?auto=format&fit=crop&q=80&w=600" },
        { id: 4, name: "Leh, Ladakh", image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&q=80&w=600" },
    ];



    const SkeletonCard = () => (
        <div className="bg-white rounded-[28px] p-4 shadow-soft animate-pulse h-[280px]">
            <div className="h-40 bg-sand/30 rounded-[20px] mb-4"></div>
            <div className="h-6 bg-sand/30 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-sand/30 rounded w-1/2"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-cream">
            <Navbar user={user} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-display font-bold text-text-dark">
                            Welcome back, {user.name} 👋
                        </h1>
                        <p className="mt-2 text-text-light text-lg">
                            Ready to plan your next adventure?
                        </p>
                    </div>
                    <Link to="/create-trip" className="hidden sm:block">
                        <Button variant="primary" className="flex items-center gap-2">
                            <Plus size={20} />
                            Plan New Trip
                        </Button>
                    </Link>
                </div>

                {/* Mobile CTA */}
                <div className="sm:hidden mb-10">
                    <Link to="/create-trip">
                        <Button variant="primary" fullWidth className="flex items-center justify-center gap-2">
                            <Plus size={20} />
                            Plan New Trip
                        </Button>
                    </Link>
                </div>

                {/* Upcoming Trips */}
                <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-display font-semibold text-text-dark">Upcoming Trips</h2>
                        <Link to="/my-trips" className="text-primary font-medium hover:text-primary-dark transition-colors flex items-center gap-1">
                            View all <ArrowRight size={16} />
                        </Link>
                    </div>

                    {/* Staggered Grid */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.15
                                }
                            }
                        }}
                    >
                        {loading ? (
                            <>
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                            </>
                        ) : (
                            upcomingTrips.slice(0, 3).map((trip) => (
                                <motion.div key={trip._id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                                    <Link to={`/itinerary/${trip._id}`} className="block h-full">
                                        <Card className="p-4 hover:shadow-medium transition-shadow cursor-pointer group h-full">
                                            <div className="relative h-48 mb-4 overflow-hidden rounded-[20px]">
                                                <ImageWithFallback
                                                    src={trip.coverPhoto || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800"}
                                                    alt={trip.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary">
                                                    {trip.stops?.length || 0} Cities
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold text-text-dark mb-2 group-hover:text-primary transition-colors">
                                                {trip.name}
                                            </h3>
                                            <div className="flex items-center text-text-light text-sm">
                                                <Calendar size={16} className="mr-2 text-primary" />
                                                {formatDateRange(trip.startDate, trip.endDate)}
                                            </div>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))
                        )}

                        {!loading && (
                            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                                <Link to="/create-trip" className="block h-full">
                                    <Card noHover className="h-full min-h-[280px] rounded-[28px] border-2 border-dashed border-sand hover:border-primary/50 bg-sand/10 flex flex-col items-center justify-center text-center p-6 transition-all cursor-pointer group !shadow-none hover:bg-sand/20">
                                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-soft mb-4 group-hover:scale-110 transition-transform">
                                            <Plus size={32} className="text-primary" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-text-dark mb-1">Create New Trip</h3>
                                        <p className="text-text-light text-sm">Start planning your next journey</p>
                                    </Card>
                                </Link>
                            </motion.div>
                        )}
                    </motion.div>
                </section>

                {/* Popular Destinations */}
                <section>
                    <h2 className="text-2xl font-display font-semibold text-text-dark mb-6">Popular Destinations</h2>
                    <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory hide-scrollbar">
                        {popularDestinations.map((dest) => (
                            <div key={dest.id} className="min-w-[280px] md:min-w-[320px] snap-center">
                                <div className="relative h-[400px] rounded-[32px] overflow-hidden group cursor-pointer shadow-soft hover:shadow-medium transition-all">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                    <img
                                        src={dest.image}
                                        alt={dest.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute bottom-6 left-6 z-20 text-white">
                                        <h3 className="text-2xl font-bold font-display mb-1">{dest.name}</h3>
                                        <div className="flex items-center text-white/90 text-sm">
                                            <MapPin size={16} className="mr-1" />
                                            Explore Guide
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DashboardPage;
