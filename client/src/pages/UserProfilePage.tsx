import React from 'react';
import { Mail, Phone, MapPin, Edit2, LogOut, Settings, Calendar, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import ImageWithFallback from '../components/ImageWithFallback';
import api from '../services/api';

const UserProfilePage = () => {
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState({
        name: "Traveler",
        username: "@traveler",
        role: "Global Trotter",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Traveler",
        email: "traveler@example.com",
        phone: "+1 (555) 000-0000",
        location: "Earth",
        bio: "Exploring the world one step at a time.",
        joined: "Recent",
        stats: {
            trips: 0,
            countries: 0,
            photos: 0
        }
    });

    const [previousTrips, setPreviousTrips] = React.useState<any[]>([]);

    React.useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const parsed = JSON.parse(savedUser);
                setUser(prev => ({
                    ...prev,
                    name: parsed.name || prev.name,
                    email: parsed.email || prev.email,
                    username: `@${(parsed.name || "traveler").toLowerCase().replace(/\s/g, '')}`,
                    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${parsed.name || "Traveler"}`
                }));
            } catch (e) {
                console.error('Failed to parse user:', e);
            }
        }

        const fetchTrips = async () => {
            try {
                const response = await api.get('/trips');
                setPreviousTrips(response.data);
                setUser(prev => ({
                    ...prev,
                    stats: {
                        ...prev.stats,
                        trips: response.data.length
                    }
                }));
            } catch (err) {
                console.error('Failed to fetch trips:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

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
                                    <ImageWithFallback
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
                            {loading ? (
                                [1, 2, 3].map(i => (
                                    <div key={i} className="h-48 bg-sand/20 animate-pulse rounded-2xl" />
                                ))
                            ) : previousTrips.length > 0 ? (
                                previousTrips.slice(0, 3).map(trip => (
                                    <Link to={`/itinerary/${trip._id}`} key={trip._id} className="block group">
                                        <Card className="p-2 hover:shadow-medium transition-all h-full">
                                            <div className="h-32 rounded-lg overflow-hidden mb-3 relative">
                                                <img
                                                    src={trip.coverPhoto || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=400"}
                                                    alt={trip.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                            </div>
                                            <div className="px-2 pb-2 text-center">
                                                <h3 className="font-bold text-text-dark text-sm mb-1 line-clamp-1">{trip.name}</h3>
                                                <p className="text-xs text-text-light">
                                                    {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                </p>
                                            </div>
                                            <div className="pt-2 border-t border-sand/50 mt-1">
                                                <div className="w-full py-1 bg-primary/10 text-primary text-xs font-medium rounded-lg text-center group-hover:bg-primary group-hover:text-white transition-colors">
                                                    View
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                ))
                            ) : (
                                <div className="col-span-full py-12 text-center bg-sand/10 rounded-3xl border-2 border-dashed border-sand">
                                    <p className="text-text-light">No trips planned yet.</p>
                                    <Link to="/create-trip" className="text-primary font-medium hover:underline mt-2 inline-block">Plan your first trip</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
