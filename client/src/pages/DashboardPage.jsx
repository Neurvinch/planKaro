import React, { useState, useEffect } from 'react';
import { Plus, MapPin, Calendar, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const [loading, setLoading] = useState(true);

    // Mock User Data
    const user = {
        name: "Alex",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    };

    // Mock Trips Data
    const upcomingTrips = [
        {
            id: 1,
            name: "Summer in Japan",
            dates: "Jul 10 - Jul 24",
            cities: 3,
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
            status: "upcoming"
        },
        {
            id: 2,
            name: "Weekend in Paris",
            dates: "Sep 05 - Sep 08",
            cities: 1,
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800",
            status: "upcoming"
        }
    ];

    // Mock Popular Destinations
    const popularDestinations = [
        { id: 1, name: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600" },
        { id: 2, name: "Santorini, Greece", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=600" },
        { id: 3, name: "Kyoto, Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600" },
        { id: 4, name: "New York, USA", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=600" },
    ];

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

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
                        <Link to="/trips" className="text-primary font-medium hover:text-primary-dark transition-colors flex items-center gap-1">
                            View all <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading ? (
                            <>
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                            </>
                        ) : (
                            upcomingTrips.map((trip) => (
                                <Card key={trip.id} className="p-4 hover:shadow-medium transition-shadow cursor-pointer group">
                                    <div className="relative h-48 mb-4 overflow-hidden rounded-[20px]">
                                        <img
                                            src={trip.image}
                                            alt={trip.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary">
                                            {trip.cities} Cities
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-text-dark mb-2 group-hover:text-primary transition-colors">
                                        {trip.name}
                                    </h3>
                                    <div className="flex items-center text-text-light text-sm">
                                        <Calendar size={16} className="mr-2 text-primary" />
                                        {trip.dates}
                                    </div>
                                </Card>
                            ))
                        )}

                        {!loading && (
                            <Link to="/create-trip" className="block">
                                <div className="h-full min-h-[280px] rounded-[28px] border-2 border-dashed border-sand hover:border-primary/50 bg-sand/10 flex flex-col items-center justify-center text-center p-6 transition-all cursor-pointer group">
                                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-soft mb-4 group-hover:scale-110 transition-transform">
                                        <Plus size={32} className="text-primary" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-text-dark mb-1">Create New Trip</h3>
                                    <p className="text-text-light text-sm">Start planning your next journey</p>
                                </div>
                            </Link>
                        )}
                    </div>
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
