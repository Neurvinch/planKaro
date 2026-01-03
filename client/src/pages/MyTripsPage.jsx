import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Eye, Edit2, Trash2, Plus, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';

const MyTripsPage = () => {
    // Mock user
    const user = {
        name: "Alex",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    };

    // Mock trips data
    // Mock trips data (Moved outside to be used as default)
    const initialMockTrips = [
        {
            id: 1,
            name: "Royal Rajasthan Tour",
            dates: "Nov 10 - Nov 16, 2024",
            cities: 3,
            location: "Jaipur, Udaipur, Jodhpur",
            image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=800",
            status: "Upcoming"
        },
        {
            id: 2,
            name: "Weekend in Goa",
            dates: "Dec 05 - Dec 08, 2024",
            cities: 1,
            location: "North Goa, India",
            image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800",
            status: "Planning"
        },
        {
            id: 3,
            name: "Rishikesh Yoga Retreat",
            dates: "Jan 15 - Jan 22, 2025",
            cities: 1,
            location: "Rishikesh, Uttarakhand",
            image: "https://images.unsplash.com/photo-1518002171953-a080ee806dab?auto=format&fit=crop&q=80&w=800",
            status: "Draft"
        },
        {
            id: 4,
            name: "Ladakh Bike Trip",
            dates: "Jun 10 - Jun 20, 2025",
            cities: 4,
            location: "Leh, Ladakh",
            image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&q=80&w=800",
            status: "Draft"
        }
    ];

    // Initialize state with localStorage or mock data
    const [trips, setTrips] = useState(() => {
        const savedTrips = localStorage.getItem('planKaro_trips');
        return savedTrips ? JSON.parse(savedTrips) : initialMockTrips;
    });

    // Save to localStorage whenever trips change
    useEffect(() => {
        localStorage.setItem('planKaro_trips', JSON.stringify(trips));
    }, [trips]);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this trip?')) {
            setTrips(trips.filter(t => t.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-cream">
            <Navbar user={user} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-text-dark">My Trips</h1>
                        <p className="mt-1 text-text-light">Manage your upcoming adventures</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <input
                                type="text"
                                placeholder="Search trips..."
                                className="pl-10 pr-4 py-2 bg-white/50 border border-sand rounded-[20px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all w-64 text-sm"
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

                {/* Content Grid */}
                {trips.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {trips.map((trip) => (
                            <Card key={trip.id} className="group p-4 hover:shadow-medium transition-all duration-300">
                                {/* Image Container */}
                                <div className="relative h-48 mb-4 overflow-hidden rounded-[20px]">
                                    <img
                                        src={trip.image}
                                        alt={trip.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary shadow-sm">
                                        {trip.cities} {trip.cities === 1 ? 'City' : 'Cities'}
                                    </div>
                                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow-sm backdrop-blur-sm ${trip.status === 'Upcoming' ? 'bg-primary/90 text-white' :
                                        trip.status === 'Planning' ? 'bg-blue-500/90 text-white' :
                                            'bg-slate-500/90 text-white'
                                        }`}>
                                        {trip.status}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-3">
                                    <div>
                                        <h3 className="text-xl font-bold text-text-dark group-hover:text-primary transition-colors">
                                            {trip.name}
                                        </h3>
                                        <div className="flex items-center text-text-light text-sm mt-1">
                                            <MapPin size={14} className="mr-1 text-primary" />
                                            {trip.location}
                                        </div>
                                    </div>

                                    <div className="flex items-center text-text-light text-sm bg-sand/10 py-2 px-3 rounded-[12px]">
                                        <Calendar size={14} className="mr-2 text-primary" />
                                        {trip.dates}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-4 mt-2 border-t border-sand flex items-center justify-between gap-2">
                                        <Link to={`/itinerary/${trip.id}`} className="flex-1">
                                            <Button variant="secondary" className="w-full h-10 px-0 flex items-center justify-center gap-2 text-sm !rounded-[14px]">
                                                <Eye size={16} /> View
                                            </Button>
                                        </Link>
                                        <Link to={`/edit-trip/${trip.id}`}>
                                            <button className="h-10 w-10 flex items-center justify-center rounded-[14px] bg-sand/20 text-text-dark hover:bg-primary/10 hover:text-primary transition-colors">
                                                <Edit2 size={18} />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(trip.id)}
                                            className="h-10 w-10 flex items-center justify-center rounded-[14px] bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        ))}

                        {/* Add New Trip Card - Always visible at end of list */}
                        <Link to="/create-trip" className="block h-full">
                            <div className="h-full min-h-[400px] rounded-[28px] border-2 border-dashed border-sand hover:border-primary/50 bg-sand/5 flex flex-col items-center justify-center text-center p-6 transition-all cursor-pointer group hover:bg-sand/10">
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-soft mb-4 group-hover:scale-110 transition-transform">
                                    <Plus size={32} className="text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold text-text-dark mb-1">Create New Trip</h3>
                                <p className="text-text-light text-sm">Start something new</p>
                            </div>
                        </Link>
                    </div>
                ) : (
                    /* Empty State */
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
            </div>
        </div>
    );
};

export default MyTripsPage;
