import React, { useState } from 'react';
import {
    MapPin, Calendar, Clock, Plus, GripVertical,
    MoreVertical, ChevronRight, Settings, Share2,
    ArrowLeft, Image as ImageIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import CitySearchModal from '../components/CitySearchModal';

const ItineraryPage = () => {
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    // Mock user
    const user = {
        name: "Alex",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    };

    // Mock Itinerary Data
    const [trip, setTrip] = useState({
        id: 1,
        name: "Summer in Japan",
        dates: "Jul 10 - Jul 24, 2024",
        status: "Confirmed",
        coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200",
        cities: [
            {
                id: 'c1',
                name: "Tokyo",
                dates: "Jul 10 - Jul 14",
                days: [
                    {
                        day: 1,
                        date: "July 10",
                        activities: [
                            { id: 'a1', time: "10:00 AM", title: "Arrival at Narita Airport", type: "Transport" },
                            { id: 'a2', time: "02:00 PM", title: "Check-in at Tokyo Station Hotel", type: "Stay" },
                            { id: 'a3', time: "06:00 PM", title: "Dinner at Shinjuku Golden Gai", type: "Food" }
                        ]
                    },
                    {
                        day: 2,
                        date: "July 11",
                        activities: [
                            { id: 'a4', time: "09:00 AM", title: "TeamLab Borderless Digital Art Museum", type: "Culture" },
                            { id: 'a5', time: "01:00 PM", title: "Lunch in Odaiba", type: "Food" }
                        ]
                    }
                ]
            },
            {
                id: 'c2',
                name: "Kyoto",
                dates: "Jul 15 - Jul 18",
                days: [
                    {
                        day: 6,
                        date: "July 15",
                        activities: [
                            { id: 'a6', time: "11:00 AM", title: "Shinkansen to Kyoto", type: "Transport" },
                            { id: 'a7', time: "03:00 PM", title: "Fushimi Inari-taisha Shrine", type: "Culture" }
                        ]
                    }
                ]
            }
        ]
    });

    const handleDelete = (id) => {
        // Logic to delete activity
    };

    const handleAddCity = (city) => {
        console.log('Adding city:', city);
        // Logic to add city to itinerary
        setIsSearchModalOpen(false);
        // Optional: show toast or update state
    };

    return (
        <div className="min-h-screen bg-cream">
            <Navbar user={user} />

            {/* Trip Header Image (Banner) */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden">
                <img
                    src={trip.coverImage}
                    alt={trip.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-black/20" />

                <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex justify-between items-end">
                    <div className="flex items-center gap-4">
                        <Link to="/my-trips" className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:shadow-medium transition-all">
                            <ArrowLeft size={20} className="text-text-dark" />
                        </Link>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-display font-bold text-text-dark">
                                {trip.name}
                            </h1>
                            <div className="flex items-center gap-4 mt-1 text-text-light font-medium">
                                <span className="flex items-center gap-1">
                                    <Calendar size={16} className="text-primary" /> {trip.dates}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin size={16} className="text-primary" /> {trip.cities.length} Cities
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="bg-white/80 backdrop-blur-sm border-none shadow-sm flex items-center gap-2">
                            <Share2 size={18} /> Share
                        </Button>
                        <Button variant="primary" className="flex items-center gap-2">
                            <Settings size={18} /> Design
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Panel: Overview */}
                    <aside className="lg:w-1/4 space-y-6">
                        <Card className="p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-text-dark mb-4">Trip Overview</h3>

                            <div className="space-y-4">
                                {trip.cities.map((city, idx) => (
                                    <div key={city.id} className="relative pl-6">
                                        {/* Connecting Line */}
                                        {idx !== trip.cities.length - 1 && (
                                            <div className="absolute left-2.5 top-6 bottom-[-18px] w-0.5 bg-sand" />
                                        )}
                                        <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-white border-2 border-primary flex items-center justify-center z-10">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        </div>
                                        <div className="group cursor-pointer">
                                            <p className="text-sm font-bold text-text-dark group-hover:text-primary transition-colors">{city.name}</p>
                                            <p className="text-xs text-text-light">{city.dates}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                fullWidth
                                className="mt-6 flex items-center justify-center gap-2 hover:bg-sand/20"
                                onClick={() => setIsSearchModalOpen(true)}
                            >
                                <Plus size={18} /> Add City
                            </Button>

                            <div className="mt-8 pt-6 border-t border-sand">
                                <p className="text-sm font-semibold text-text-dark mb-3">Trip Stats</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-sand/10 p-3 rounded-2xl">
                                        <p className="text-[10px] uppercase tracking-wider text-text-light mb-1">Duration</p>
                                        <p className="text-lg font-bold text-text-dark">14 Days</p>
                                    </div>
                                    <div className="bg-sand/10 p-3 rounded-2xl">
                                        <p className="text-[10px] uppercase tracking-wider text-text-light mb-1">Budget</p>
                                        <p className="text-lg font-bold text-text-dark">$3,450</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </aside>

                    {/* Main Content: Itinerary Timeline */}
                    <main className="lg:w-3/4 space-y-10">
                        {trip.cities.map((city) => (
                            <div key={city.id} className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-display font-bold text-text-dark flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-xl">
                                            <MapPin className="text-primary" size={24} />
                                        </div>
                                        {city.name}
                                        <span className="text-sm font-normal text-text-light bg-sand/20 px-3 py-1 rounded-full ml-2">
                                            {city.dates}
                                        </span>
                                    </h2>
                                    <Button variant="ghost" size="sm" className="text-text-light hover:text-primary">
                                        <Edit2 size={16} />
                                    </Button>
                                </div>

                                {/* Drag & Drop Style Cities/Days */}
                                <div className="space-y-6 pl-4 border-l-2 border-dashed border-sand ml-6">
                                    {city.days.map((day) => (
                                        <div key={day.day} className="relative">
                                            {/* Date Indicator Bubble */}
                                            <div className="absolute left-[-42px] top-4 w-8 h-8 rounded-full bg-cream border-2 border-sand flex items-center justify-center z-10 shadow-sm">
                                                <span className="text-xs font-bold text-text-dark">{day.day}</span>
                                            </div>

                                            <Card className="p-0 overflow-hidden hover:shadow-medium transition-all group">
                                                <div className="px-6 py-4 bg-sand/5 border-b border-sand flex justify-between items-center">
                                                    <div>
                                                        <span className="text-xs font-bold text-primary uppercase tracking-widest mr-2">Day {day.day}</span>
                                                        <span className="text-sm font-semibold text-text-dark">{day.date}</span>
                                                    </div>
                                                    <button className="text-text-light hover:text-text-dark">
                                                        <MoreVertical size={18} />
                                                    </button>
                                                </div>

                                                <div className="p-6 space-y-4">
                                                    {day.activities.map((activity) => (
                                                        <div
                                                            key={activity.id}
                                                            className="flex items-center gap-4 p-3 rounded-[16px] hover:bg-sand/20 transition-all cursor-move group/item"
                                                        >
                                                            <GripVertical size={16} className="text-sand-dark opactity-0 group-hover/item:opacity-70" />
                                                            <div className="w-20 text-xs font-medium text-text-light flex items-center gap-1">
                                                                <Clock size={12} className="text-primary" /> {activity.time}
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="text-sm font-bold text-text-dark">{activity.title}</h4>
                                                                <span className="text-[10px] text-text-light uppercase tracking-wider">{activity.type}</span>
                                                            </div>
                                                            <button className="p-1.5 hover:bg-white rounded-full text-text-light group-hover/item:text-primary transition-all">
                                                                <ChevronRight size={16} />
                                                            </button>
                                                        </div>
                                                    ))}

                                                    <button className="w-full py-4 mt-2 rounded-[16px] border-2 border-dashed border-sand/50 text-text-light hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all text-sm font-medium flex items-center justify-center gap-2">
                                                        <Plus size={16} /> Add Activity
                                                    </button>
                                                </div>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* End of Timeline Action */}
                        <div className="flex justify-center pt-8">
                            <Button
                                variant="primary"
                                size="lg"
                                className="px-8 flex items-center gap-2 shadow-medium"
                                onClick={() => setIsSearchModalOpen(true)}
                            >
                                <Plus size={20} /> Add Next Destination
                            </Button>
                        </div>
                    </main>

                </div>
            </div>

            {/* Modals */}
            <CitySearchModal
                isOpen={isSearchModalOpen}
                onClose={() => setIsSearchModalOpen(false)}
                onAddCity={handleAddCity}
            />
        </div>
    );
};

// Internal Edit2 helper for the city title
const Edit2 = ({ size }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="m15 5 4 4" />
    </svg>
);

export default ItineraryPage;
