import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import {
    Plus, Trash2, MapPin, Calendar, ExternalLink, Copy, ArrowLeft,
    LayoutGrid, Calendar as CalendarIcon, DollarSign, Clock, Share2, Search
} from 'lucide-react';
import BudgetChart from '../components/BudgetChart';
import TripCalendar from '../components/TripCalendar';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import CitySearchModal from '../components/CitySearchModal';
import ActivitySelectionModal from '../components/ActivitySelectionModal';
import { useAuthStore } from '../store/authStore';

const ItineraryPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [trip, setTrip] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<'list' | 'calendar'>('list');
    const [isCityModalOpen, setIsCityModalOpen] = useState(false);
    const [isActivityModalOpen, setIsActivityModalOpen] = useState<number | null>(null);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const res = await api.get(`/trips/${id}`);
                setTrip(res.data);
            } catch (err) {
                console.error('Failed to fetch trip', err);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchTrip();
    }, [id, navigate]);

    const addStop = async (city: any) => {
        // Simple date picker simulation
        const startDate = prompt('Enter start date (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);
        const endDate = prompt('Enter end date (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);

        if (!startDate || !endDate) return;

        try {
            const newStops = [...trip.stops, { cityId: city._id, startDate, endDate, activities: [] }];
            const res = await api.put(`/trips/${id}/stops`, { stops: newStops });
            setTrip(res.data);
            setIsCityModalOpen(false);
        } catch (err) {
            alert('Failed to add stop');
        }
    };

    const addActivity = async (activity: any) => {
        if (isActivityModalOpen === null) return;
        try {
            const updatedStops = [...trip.stops];
            updatedStops[isActivityModalOpen].activities.push({
                activityId: activity._id,
                costOverride: activity.cost
            });

            const res = await api.put(`/trips/${id}/stops`, { stops: updatedStops });
            setTrip(res.data);
            setIsActivityModalOpen(null);
        } catch (err) {
            alert('Failed to add activity');
        }
    };

    const removeStop = async (index: number) => {
        if (!window.confirm('Remove this stop?')) return;
        try {
            const newStops = trip.stops.filter((_: any, i: number) => i !== index);
            const res = await api.put(`/trips/${id}/stops`, { stops: newStops });
            setTrip(res.data);
        } catch (err) {
            alert('Failed to remove stop');
        }
    };

    const handleCopy = async () => {
        try {
            const res = await api.post(`/trips/${id}/copy`);
            alert('Trip copied successfully!');
            navigate(`/trip/${res.data._id}`);
        } catch (err) {
            alert('Failed to copy trip');
        }
    };

    const handleShare = async () => {
        const url = `${window.location.origin}/public/itinerary/${id}`;
        try {
            await navigator.clipboard.writeText(url);
            alert('Share link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy share link');
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-cream flex items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                <p className="text-text-light font-medium">Loading your adventure...</p>
            </div>
        </div>
    );
    if (!trip) return null;

    return (
        <div className="min-h-screen bg-cream">
            <Navbar user={user ? { name: user.name, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.name } : null} />

            {/* Header Section */}
            <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                    src={`https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200&seed=${trip._id}`}
                    className="w-full h-full object-cover"
                    alt={trip.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="text-white">
                            <button
                                onClick={() => navigate('/')}
                                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4 text-sm font-medium"
                            >
                                <ArrowLeft size={16} />
                                Back to All Trips
                            </button>
                            <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">{trip.name}</h1>
                            <p className="text-white/80 text-lg flex items-center gap-4">
                                <span className="flex items-center gap-1.5"><CalendarIcon size={18} /> {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                                <span className="flex items-center gap-1.5"><MapPin size={18} /> {trip.stops.length} destinations</span>
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="secondary" onClick={handleShare} className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md">
                                <Share2 size={18} className="mr-2" /> Share
                            </Button>
                            <Button variant="secondary" onClick={handleCopy} className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md">
                                <Copy size={18} className="mr-2" /> Copy Trip
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Content: Stops & Itinerary */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-2xl font-display font-bold text-text-dark">Itinerary Planner</h2>
                            <div className="flex items-center gap-3">
                                <div className="bg-sand/30 p-1 rounded-xl flex">
                                    <button
                                        onClick={() => setView('list')}
                                        className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-white text-primary shadow-sm' : 'text-text-light hover:text-text-dark'}`}
                                    >
                                        <LayoutGrid size={20} />
                                    </button>
                                    <button
                                        onClick={() => setView('calendar')}
                                        className={`p-2 rounded-lg transition-all ${view === 'calendar' ? 'bg-white text-primary shadow-sm' : 'text-text-light hover:text-text-dark'}`}
                                    >
                                        <CalendarIcon size={20} />
                                    </button>
                                </div>
                                <Button variant="primary" size="sm" onClick={() => setIsCityModalOpen(true)} className="flex items-center gap-2">
                                    <Plus size={18} /> Add Stop
                                </Button>
                            </div>
                        </div>

                        {view === 'calendar' ? (
                            <Card className="p-6">
                                <TripCalendar stops={trip.stops} />
                            </Card>
                        ) : trip.stops.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[32px] shadow-soft border border-sand/30">
                                <div className="w-20 h-20 bg-sand/10 rounded-full flex items-center justify-center mb-4">
                                    <MapPin size={40} className="text-primary/50" />
                                </div>
                                <h3 className="text-xl font-bold text-text-dark mb-1">No stops yet</h3>
                                <p className="text-text-light mb-6">Where would you like to go first?</p>
                                <Button variant="outline" onClick={() => setIsCityModalOpen(true)}>Add Your First Stop</Button>
                            </div>
                        ) : (
                            <div className="space-y-6 relative">
                                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary/30 via-sand/50 to-primary/30" />
                                {trip.stops.map((stop: any, index: number) => (
                                    <div key={index} className="relative pl-14">
                                        <div className="absolute left-0 top-2 w-12 h-12 rounded-full bg-white border-4 border-cream flex items-center justify-center text-primary font-bold shadow-soft z-10">
                                            {index + 1}
                                        </div>
                                        <Card className="p-6 hover:shadow-medium transition-all group">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-text-dark group-hover:text-primary transition-colors">
                                                        {stop.cityId?.name || 'Unknown City'}
                                                    </h3>
                                                    <p className="text-sm text-text-light flex items-center gap-1.5 mt-1">
                                                        <CalendarIcon size={14} className="text-primary" />
                                                        {new Date(stop.startDate).toLocaleDateString()} - {new Date(stop.endDate).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeStop(index)}
                                                    className="p-2 text-text-light hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>

                                            <div className="bg-sand/10 rounded-2xl p-5 border border-sand/20">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-light">Activities</h4>
                                                    <button
                                                        onClick={() => setIsActivityModalOpen(index)}
                                                        className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
                                                    >
                                                        <Plus size={14} /> Add Activity
                                                    </button>
                                                </div>

                                                {stop.activities.length === 0 ? (
                                                    <p className="text-sm text-text-light/70 italic text-center py-4 bg-white/30 rounded-xl border border-dashed border-sand">
                                                        No activities planned for this stop yet.
                                                    </p>
                                                ) : (
                                                    <div className="space-y-3">
                                                        {stop.activities.map((act: any, aIdx: number) => (
                                                            <div key={aIdx} className="flex items-center justify-between bg-white px-4 py-3 rounded-xl shadow-xs border border-sand/10">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                                        <Clock size={16} />
                                                                    </div>
                                                                    <span className="text-sm font-medium text-text-dark">{act.activityId?.name}</span>
                                                                </div>
                                                                <span className="text-sm font-bold text-primary">${act.costOverride || act.activityId?.cost || 0}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar: Budget & Info */}
                    <aside className="space-y-8">
                        {/* Budget Card */}
                        <Card className="p-8 border-none bg-gradient-to-br from-white to-sand/20 shadow-medium">
                            <h3 className="text-xl font-bold text-text-dark mb-6">Budget Overview</h3>
                            <BudgetChart data={trip.budget} />

                            <div className="mt-8 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-text-light ml-1">Accommodation ($)</label>
                                    <input
                                        type="number"
                                        value={trip.budget.accommodation}
                                        onChange={(e) => setTrip({ ...trip, budget: { ...trip.budget, accommodation: Number(e.target.value) } })}
                                        className="w-full px-4 py-2 bg-white border border-sand rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-text-light ml-1">Transport ($)</label>
                                    <input
                                        type="number"
                                        value={trip.budget.transport}
                                        onChange={(e) => setTrip({ ...trip, budget: { ...trip.budget, transport: Number(e.target.value) } })}
                                        className="w-full px-4 py-2 bg-white border border-sand rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-text-light ml-1">Meals ($)</label>
                                    <input
                                        type="number"
                                        value={trip.budget.meals}
                                        onChange={(e) => setTrip({ ...trip, budget: { ...trip.budget, meals: Number(e.target.value) } })}
                                        className="w-full px-4 py-2 bg-white border border-sand rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                                    />
                                </div>

                                <div className="flex items-center justify-between py-2 px-1">
                                    <span className="text-sm font-medium text-text-light">Activities</span>
                                    <span className="text-sm font-bold text-text-dark">${trip.budget.activities}</span>
                                </div>

                                <div className="h-px bg-sand/30 my-4" />

                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-lg font-bold text-text-dark">Total Budget</span>
                                    <span className="text-2xl font-display font-bold text-primary">${
                                        trip.budget.accommodation + trip.budget.transport + trip.budget.meals + trip.budget.activities
                                    }</span>
                                </div>

                                <Button
                                    variant="primary"
                                    fullWidth
                                    onClick={async () => {
                                        try {
                                            const res = await api.put(`/trips/${id}/budget`, { budget: trip.budget });
                                            setTrip(res.data);
                                            alert('Budget updated!');
                                        } catch (err) {
                                            alert('Failed to update budget');
                                        }
                                    }}
                                    className="shadow-lg"
                                >
                                    Save Budget Changes
                                </Button>
                            </div>
                        </Card>

                        {/* Useful Links / Info */}
                        <Card className="p-6 bg-primary/5 border-none">
                            <h4 className="font-bold text-text-dark mb-4 flex items-center gap-2">
                                <Search size={18} className="text-primary" /> Quick Links
                            </h4>
                            <div className="space-y-2">
                                <Link to={`/budget/${id}`} className="block p-3 rounded-xl bg-white hover:bg-sand/30 transition-all text-sm font-medium text-text-dark shadow-xs flex items-center justify-between group">
                                    Manage Detailed Budget <DollarSign size={14} className="text-text-light group-hover:text-primary" />
                                </Link>
                                <Link to={`/timeline/${id}`} className="block p-3 rounded-xl bg-white hover:bg-sand/30 transition-all text-sm font-medium text-text-dark shadow-xs flex items-center justify-between group">
                                    View Detailed Timeline <Clock size={14} className="text-text-light group-hover:text-primary" />
                                </Link>
                                <Link to={`/public/itinerary/${id}`} className="block p-3 rounded-xl bg-white hover:bg-sand/30 transition-all text-sm font-medium text-text-dark shadow-xs flex items-center justify-between group">
                                    Public Share Page <ExternalLink size={14} className="text-text-light group-hover:text-primary" />
                                </Link>
                            </div>
                        </Card>
                    </aside>
                </div>
            </main>

            {/* Modals */}
            <CitySearchModal
                isOpen={isCityModalOpen}
                onClose={() => setIsCityModalOpen(false)}
                onAddCity={addStop}
            />

            {isActivityModalOpen !== null && (
                <ActivitySelectionModal
                    isOpen={isActivityModalOpen !== null}
                    onClose={() => setIsActivityModalOpen(null)}
                    onAddActivity={addActivity}
                    cityName={trip.stops[isActivityModalOpen]?.cityId?.name || "this city"}
                    stop={trip.stops[isActivityModalOpen]}
                />
            )}
        </div>
    );
};

export default ItineraryPage;
