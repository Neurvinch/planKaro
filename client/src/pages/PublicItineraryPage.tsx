import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    MapPin, Calendar, Users, DollarSign, Clock, Share2, Copy, Check,
    Facebook, Twitter, Linkedin, Mail, Link2, Download, Heart,
    Plane, Hotel, Utensils, Camera, Sun, ShoppingBag
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import TripTimeline from '../components/TripTimeline';

import logo from '../assets/logo.jpg';

const PublicItineraryPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // Check if trip is already saved on mount
    useEffect(() => {
        const savedTrips = JSON.parse(localStorage.getItem('planKaro_saved') || '[]');
        if (savedTrips.includes(id)) {
            setIsSaved(true);
        }
    }, [id]);

    // Mock trip data
    const trip = {
        id: 1,
        name: "Goa Beach Vacation",
        coverImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=400&fit=crop",
        description: "A relaxing 4-day getaway to the sunny beaches of Goa, exploring Portuguese heritage, vibrant markets, and serene coastlines.",
        dates: "Dec 05 - Dec 08, 2024",
        duration: "4 days",
        travelers: 2,
        budget: "₹35,000",
        author: {
            name: "Aryan Sharma",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aryan"
        },
        cities: ["North Goa", "South Goa"],
        highlights: [
            "Sunset at Anjuna Beach",
            "Explore Fort Aguada",
            "Water sports at Calangute",
            "Dinner at a Beach Shack"
        ],
        days: [
            {
                day: 1,
                date: "Dec 05",
                city: "North Goa",
                activities: [
                    {
                        id: 1,
                        time: "11:00 AM",
                        title: "Arrival at Dabolim Airport",
                        type: "Transport",
                        icon: Plane,
                        color: "bg-purple-100 text-purple-600"
                    },
                    {
                        id: 2,
                        time: "01:00 PM",
                        title: "Check-in at Taj Fort Aguada",
                        type: "Stay",
                        icon: Hotel,
                        color: "bg-blue-100 text-blue-600"
                    },
                    {
                        id: 3,
                        time: "05:30 PM",
                        title: "Sunset at Sinquerim Beach",
                        type: "Adventure",
                        icon: Sun,
                        color: "bg-orange-100 text-orange-600"
                    }
                ]
            },
            {
                day: 2,
                date: "Dec 06",
                city: "North Goa",
                activities: [
                    {
                        id: 4,
                        time: "10:00 AM",
                        title: "Visit Fort Aguada",
                        type: "Culture",
                        icon: Camera,
                        color: "bg-primary/10 text-primary"
                    },
                    {
                        id: 5,
                        time: "02:00 PM",
                        title: "Lunch at Britto's",
                        type: "Food",
                        icon: Utensils,
                        color: "bg-green-100 text-green-600"
                    },
                    {
                        id: 6,
                        time: "08:00 PM",
                        title: "Night Market at Arpora",
                        type: "Shopping",
                        icon: ShoppingBag, // Ensure ShoppingBag is imported if using this icon
                        color: "bg-pink-100 text-pink-600"
                    }
                ]
            },
            {
                day: 3,
                date: "Dec 07",
                city: "South Goa",
                activities: [
                    {
                        id: 7,
                        time: "09:00 AM",
                        title: "Drive to Palolem Beach",
                        type: "Transport",
                        icon: MapPin,
                        color: "bg-purple-100 text-purple-600"
                    },
                    {
                        id: 8,
                        time: "04:00 PM",
                        title: "Kayaking in Backwaters",
                        type: "Adventure",
                        icon: Sun,
                        color: "bg-orange-100 text-orange-600"
                    }
                ]
            }
        ]
    };

    const shareUrl = `${window.location.origin}/public/itinerary/${trip.id}`;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleCopyTrip = () => {
        // Get existing trips from localStorage or initialize empty array
        const existingTrips = JSON.parse(localStorage.getItem('planKaro_trips') || '[]');

        // Create a new trip object based on the current public trip
        // In a real app, the backend would handle ID generation and deep cloning
        const newTrip = {
            ...trip,
            id: Date.now(), // Generate a unique ID
            name: `Copy of ${trip.name}`,
            status: 'Planning', // Set status to planning
            isPublic: false // Reset public flag
        };

        // Add to local storage
        const updatedTrips = [...existingTrips, newTrip];
        localStorage.setItem('planKaro_trips', JSON.stringify(updatedTrips));

        // Navigate to my trips page
        navigate('/my-trips');
    };

    const handleSaveTrip = () => {
        const savedTrips = JSON.parse(localStorage.getItem('planKaro_saved') || '[]');
        let newSavedTrips;

        if (isSaved) {
            newSavedTrips = savedTrips.filter(savedId => savedId !== id);
        } else {
            newSavedTrips = [...savedTrips, id];
        }

        localStorage.setItem('planKaro_saved', JSON.stringify(newSavedTrips));
        setIsSaved(!isSaved);
    };

    const shareToSocial = (platform) => {
        const text = `Check out my trip: ${trip.name}`;
        const urls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
            email: `mailto:?subject=${encodeURIComponent(trip.name)}&body=${encodeURIComponent(text + ' ' + shareUrl)}`
        };

        if (urls[platform]) {
            window.open(urls[platform], '_blank', 'width=600,height=400');
        }
    };

    return (
        <div className="min-h-screen bg-cream">
            {/* Simplified Public Navbar */}
            <nav className="bg-white shadow-soft sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-2">
                            <img src={logo} alt="PlanKaro Logo" className="h-10 w-auto object-contain" />
                        </Link>
                        <div className="flex items-center gap-3">
                            <Button variant="outline" size="sm" onClick={handleSaveTrip}>
                                <Heart size={16} className={isSaved ? "fill-red-500 text-red-500" : ""} />
                                <span className="hidden sm:inline ml-1">{isSaved ? 'Saved' : 'Save'}</span>
                            </Button>
                            <Button variant="primary" size="sm" onClick={handleCopyTrip}>
                                <Copy size={16} />
                                <span className="hidden sm:inline ml-1">Copy Trip</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section with Cover Image */}
            <div className="relative h-80 md:h-96 w-full overflow-hidden">
                <img
                    src={trip.coverImage}
                    alt={trip.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Trip Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="max-w-5xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-3">
                            {trip.name}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-white/90">
                            <span className="flex items-center gap-1.5">
                                <Calendar size={18} />
                                {trip.dates}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <MapPin size={18} />
                                {trip.cities.join(', ')}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Users size={18} />
                                {trip.travelers} travelers
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Share Section */}
                <Card className="p-6 mb-8 bg-gradient-to-br from-primary/5 to-sand/20">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <img
                                src={trip.author.avatar}
                                alt={trip.author.name}
                                className="w-12 h-12 rounded-full border-2 border-white shadow-soft"
                            />
                            <div>
                                <p className="text-sm text-text-light">Created by</p>
                                <p className="font-semibold text-text-dark">{trip.author.name}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                            {/* Copy Link Button */}
                            <button
                                onClick={handleCopyLink}
                                className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-sand hover:bg-sand/10 transition-colors text-sm font-medium text-text-dark"
                            >
                                {copied ? (
                                    <>
                                        <Check size={16} className="text-green-600" />
                                        <span className="text-green-600">Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <Link2 size={16} />
                                        Copy Link
                                    </>
                                )}
                            </button>

                            {/* Social Share Icons */}
                            <div className="flex items-center gap-1 bg-white rounded-xl border border-sand p-1">
                                <button
                                    onClick={() => shareToSocial('facebook')}
                                    className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                                    title="Share on Facebook"
                                >
                                    <Facebook size={18} />
                                </button>
                                <button
                                    onClick={() => shareToSocial('twitter')}
                                    className="p-2 hover:bg-sky-50 rounded-lg transition-colors text-sky-600"
                                    title="Share on Twitter"
                                >
                                    <Twitter size={18} />
                                </button>
                                <button
                                    onClick={() => shareToSocial('linkedin')}
                                    className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-700"
                                    title="Share on LinkedIn"
                                >
                                    <Linkedin size={18} />
                                </button>
                                <button
                                    onClick={() => shareToSocial('email')}
                                    className="p-2 hover:bg-sand/20 rounded-lg transition-colors text-text-dark"
                                    title="Share via Email"
                                >
                                    <Mail size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Trip Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Description */}
                    <div className="lg:col-span-2">
                        <Card className="p-6 h-full">
                            <h2 className="text-2xl font-display font-bold text-text-dark mb-4">About This Trip</h2>
                            <p className="text-text-light leading-relaxed mb-6">{trip.description}</p>

                            <h3 className="font-semibold text-text-dark mb-3">Trip Highlights</h3>
                            <ul className="space-y-2">
                                {trip.highlights.map((highlight, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-text-light">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>

                    {/* Trip Stats */}
                    <div className="space-y-4">
                        <Card className="p-5">
                            <h3 className="font-semibold text-text-dark mb-4">Trip Details</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-text-light flex items-center gap-2">
                                        <Clock size={16} className="text-primary" />
                                        Duration
                                    </span>
                                    <span className="font-semibold text-text-dark">{trip.duration}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-text-light flex items-center gap-2">
                                        <Users size={16} className="text-primary" />
                                        Travelers
                                    </span>
                                    <span className="font-semibold text-text-dark">{trip.travelers}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-text-light flex items-center gap-2">
                                        <DollarSign size={16} className="text-primary" />
                                        Budget
                                    </span>
                                    <span className="font-semibold text-text-dark">{trip.budget}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-text-light flex items-center gap-2">
                                        <MapPin size={16} className="text-primary" />
                                        Cities
                                    </span>
                                    <span className="font-semibold text-text-dark">{trip.cities.length}</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20">
                            <div className="text-center">
                                <Share2 size={32} className="text-primary mx-auto mb-3" />
                                <h3 className="font-semibold text-text-dark mb-2">Love this itinerary?</h3>
                                <p className="text-sm text-text-light mb-4">Copy it to your account and customize it!</p>
                                <Button variant="primary" fullWidth onClick={handleCopyTrip}>
                                    <Copy size={16} />
                                    Copy to My Trips
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Day-by-Day Itinerary */}
                <div className="mb-12">
                    <TripTimeline
                        tripData={{ days: trip.days as any }}
                        title="Day-by-Day Itinerary"
                        readOnly={true}
                    />
                </div>

                {/* Call to Action */}
                <Card className="p-8 mt-8 text-center bg-gradient-to-br from-primary/10 to-sand/20">
                    <h2 className="text-2xl font-display font-bold text-text-dark mb-3">
                        Ready to plan your own adventure?
                    </h2>
                    <p className="text-text-light mb-6 max-w-2xl mx-auto">
                        Join PlanKaro to create, customize, and share your perfect itinerary with friends and family.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link to="/signup">
                            <Button variant="primary" size="lg">
                                Get Started Free
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" onClick={handleCopyTrip}>
                            <Copy size={18} />
                            Copy This Trip
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-sand mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-sm text-text-light">
                        <p>© 2024 PlanKaro. Made with ❤️ for travelers.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PublicItineraryPage;
