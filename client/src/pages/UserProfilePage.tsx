import React from 'react';
import { Mail, Phone, MapPin, Edit2, LogOut, Settings, Calendar, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

const UserProfilePage = () => {
    // Mock user data
    const user = {
        name: "Alex Johnson",
        username: "@alexj_travels",
        role: "Global Trotter",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        email: "alex.johnson@example.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        bio: "Passionate traveler exploring the world one city at a time. Lover of coffee, mountains, and local cuisines.",
        joined: "January 2023",
        stats: {
            trips: 12,
            countries: 8,
            photos: 456
        }
    };

    const previousTrips = [
        { id: 1, name: "Tokyo Adventure", date: "Oct 2023", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400" },
        { id: 2, name: "Paris Getaway", date: "Aug 2023", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400" },
        { id: 3, name: "Bali Retreat", date: "Jun 2023", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400" },
    ];

    return (
        <div className="min-h-screen bg-cream">
            <Navbar user={user} />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar Profile Card */}
                    <div className="md:w-1/3">
                        <Card className="p-6 sticky top-24 text-center">
                            <div className="relative inline-block mx-auto mb-4">
                                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-primary to-accent">
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-full h-full rounded-full object-cover border-4 border-white"
                                    />
                                </div>
                                <button className="absolute bottom-1 right-1 p-2 bg-text-dark text-white rounded-full hover:bg-primary transition-colors">
                                    <Edit2 size={16} />
                                </button>
                            </div>

                            <h1 className="text-2xl font-bold text-text-dark">{user.name}</h1>
                            <p className="text-primary font-medium mb-1">{user.username}</p>
                            <p className="text-text-light text-sm mb-6">{user.role}</p>

                            <div className="flex justify-center gap-6 mb-6">
                                <div className="text-center">
                                    <span className="block text-lg font-bold text-text-dark">{user.stats.trips}</span>
                                    <span className="text-xs text-text-light uppercase tracking-wide">Trips</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-lg font-bold text-text-dark">{user.stats.countries}</span>
                                    <span className="text-xs text-text-light uppercase tracking-wide">Countries</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-lg font-bold text-text-dark">{user.stats.photos}</span>
                                    <span className="text-xs text-text-light uppercase tracking-wide">Photos</span>
                                </div>
                            </div>

                            <Button fullWidth variant="outline" className="flex items-center justify-center gap-2 mb-4">
                                <Settings size={18} /> Edit Profile
                            </Button>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="md:w-2/3 space-y-6">
                        {/* User Details Section (Screen 7 req) */}
                        <Card className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-text-dark">User Details</h2>
                                <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">Edit</Button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-3 bg-sand/20 rounded-xl">
                                        <p className="text-xs text-text-light mb-1">Full Name</p>
                                        <div className="flex items-center gap-2 font-medium text-text-dark">
                                            {user.name}
                                        </div>
                                    </div>
                                    <div className="p-3 bg-sand/20 rounded-xl">
                                        <p className="text-xs text-text-light mb-1">Email Address</p>
                                        <div className="flex items-center gap-2 font-medium text-text-dark text-sm truncate">
                                            <Mail size={16} className="text-primary" />
                                            {user.email}
                                        </div>
                                    </div>
                                    <div className="p-3 bg-sand/20 rounded-xl">
                                        <p className="text-xs text-text-light mb-1">Phone Number</p>
                                        <div className="flex items-center gap-2 font-medium text-text-dark text-sm">
                                            <Phone size={16} className="text-primary" />
                                            {user.phone}
                                        </div>
                                    </div>
                                    <div className="p-3 bg-sand/20 rounded-xl">
                                        <p className="text-xs text-text-light mb-1">Location</p>
                                        <div className="flex items-center gap-2 font-medium text-text-dark text-sm">
                                            <MapPin size={16} className="text-primary" />
                                            {user.location}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-sand/20 rounded-xl mt-4">
                                    <p className="text-xs text-text-light mb-2">About Me</p>
                                    <p className="text-sm text-text-dark leading-relaxed">{user.bio}</p>
                                </div>
                            </div>
                        </Card>

                        {/* Previous Trips Section (Screen 7 req) */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-text-dark">Previous Trips</h2>
                            <Link to="/my-trips" className="text-primary hover:underline text-sm font-medium">View All</Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {previousTrips.map(trip => (
                                <Link to={`/itinerary/${trip.id}`} key={trip.id} className="block group">
                                    <Card className="p-2 hover:shadow-medium transition-all h-full">
                                        <div className="h-32 rounded-lg overflow-hidden mb-3 relative">
                                            <img src={trip.image} alt={trip.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                        </div>
                                        <div className="px-2 pb-2 text-center">
                                            <h3 className="font-bold text-text-dark text-sm mb-1">{trip.name}</h3>
                                            <p className="text-xs text-text-light">{trip.date}</p>
                                        </div>
                                        <div className="pt-2 border-t border-sand/50 mt-1">
                                            <div className="w-full py-1 bg-primary/10 text-primary text-xs font-medium rounded-lg text-center group-hover:bg-primary group-hover:text-white transition-colors">
                                                View
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
