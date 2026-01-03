import React, { useState } from 'react';
import {
    MapPin, Calendar, Clock, Plus, GripVertical,
    MoreVertical, ChevronRight, Settings, Share2,
    ArrowLeft, Image as ImageIcon, Train
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import CitySearchModal from '../components/CitySearchModal';
import ActivitySelectionModal from '../components/ActivitySelectionModal';
import TrainSearchModal from '../components/TrainSearchModal';
import TripTimeline from '../components/TripTimeline';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const ItineraryPage = () => {
    const { id: tripId } = useParams();
    const [loading, setLoading] = useState(true);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
    const [isTrainModalOpen, setIsTrainModalOpen] = useState(false);
    const [selectedCityForActivity, setSelectedCityForActivity] = useState<string | null>(null);
    const [selectedDayForActivity, setSelectedDayForActivity] = useState<number | null>(null);

    const [trip, setTrip] = useState<any>(null);

    React.useEffect(() => {
        const fetchTrip = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/trips/${tripId}`);
                const data = response.data;

                // Transform backend 'stops' to frontend 'cities' structure if needed
                // Backend 'stops' has cityId and activities.
                // For now, let's keep it simple and see if we can adapt.
                const transformedTrip = {
                    ...data,
                    coverImage: data.coverPhoto || "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1200",
                    dates: `${new Date(data.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(data.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
                    cities: data.stops.map((stop: any, idx: number) => ({
                        id: stop._id || `c${idx}`,
                        name: stop.cityId?.name || "Unknown City",
                        dates: "TBD",
                        days: [
                            {
                                day: idx + 1,
                                date: "Day " + (idx + 1),
                                activities: stop.activities.map((act: any, aIdx: number) => ({
                                    id: act._id || `a${aIdx}`,
                                    time: act.time || "10:00 AM",
                                    title: act.activityId?.name || act.customName || "Activity",
                                    type: act.activityId?.category || "Culture"
                                }))
                            }
                        ]
                    }))
                };
                setTrip(transformedTrip);
            } catch (err) {
                console.error('Failed to fetch trip:', err);
            } finally {
                setLoading(false);
            }
        };

        if (tripId) fetchTrip();
    }, [tripId]);

    const handleDelete = (activityId) => {
        setTrip(prevTrip => {
            const newCities = prevTrip.cities.map(city => ({
                ...city,
                days: city.days.map(day => ({
                    ...day,
                    activities: day.activities.filter(a => a.id !== activityId)
                }))
            }));
            return { ...prevTrip, cities: newCities };
        });
    };

    const handleAddCity = (city) => {
        console.log('Adding city:', city);
        // Logic to add city to itinerary
        setIsSearchModalOpen(false);
    };

    const handleAddActivity = (activity: any) => {
        if (!selectedCityForActivity || !selectedDayForActivity) return;

        setTrip(prevTrip => {
            const newCities = prevTrip.cities.map(city => {
                if (city.name !== selectedCityForActivity) return city;

                const newDays = city.days.map(day => {
                    if (day.day !== selectedDayForActivity) return day;

                    return {
                        ...day,
                        activities: [
                            ...day.activities,
                            {
                                id: `new_${Date.now()}`,
                                title: activity.name,
                                type: activity.category as any || "Other",
                                time: "10:00 AM",
                                location: activity.location,
                                cost: activity.cost
                            }
                        ]
                    };
                });
                return { ...city, days: newDays };
            });
            return { ...prevTrip, cities: newCities };
        });

        setIsActivityModalOpen(false);
        setSelectedDayForActivity(null);
    };

    const handleAddTrainJourney = (train: any) => {
        if (!selectedDayForActivity) return;

        setTrip(prevTrip => {
            const newCities = prevTrip.cities.map(city => {
                // For simplicity, add to the first city or based on logic
                // Here we just add to the day where user clicked "Add Train"
                const hasTargetDay = city.days.some(d => d.day === selectedDayForActivity);
                if (!hasTargetDay) return city;

                const newDays = city.days.map(day => {
                    if (day.day !== selectedDayForActivity) return day;

                    return {
                        ...day,
                        activities: [
                            ...day.activities,
                            {
                                id: `train_${Date.now()}`,
                                title: `${train.number} - ${train.name}`,
                                type: "Transport",
                                time: train.departure,
                                location: `${train.from} → ${train.to}`,
                                cost: train.price
                            }
                        ]
                    };
                });
                return { ...city, days: newDays };
            });
            return { ...prevTrip, cities: newCities };
        });

        setIsTrainModalOpen(false);
        setSelectedDayForActivity(null);
    };

    const openActivityModal = (cityName, dayNumber) => {
        setSelectedCityForActivity(cityName);
        setSelectedDayForActivity(dayNumber);
        setIsActivityModalOpen(true);
    };

    if (loading) return (
        <div className="min-h-screen bg-cream flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full mb-4"></div>
                <div className="h-4 w-48 bg-sand/40 rounded"></div>
            </div>
        </div>
    );

    if (!trip) return (
        <div className="min-h-screen bg-cream flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-text-dark">Trip not found</h2>
            <Link to="/dashboard" className="text-primary mt-4 hover:underline">Back to Dashboard</Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-cream">
            <Navbar />

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
                                    <Link to={`/budget/${trip.id}`}>
                                        <div className="bg-primary/10 p-3 rounded-2xl hover:bg-primary/20 transition-colors cursor-pointer group">
                                            <p className="text-[10px] uppercase tracking-wider text-primary mb-1">Budget</p>
                                            <p className="text-lg font-bold text-text-dark group-hover:text-primary transition-colors">₹45,000</p>
                                        </div>
                                    </Link>
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

                                {/* Trip Timeline Component */}
                                <div className="mt-6">
                                    <TripTimeline
                                        tripData={{ days: city.days as any }}
                                        title="Itinerary"
                                        onAddActivity={(dayNumber) => {
                                            // Show choice between activity and train
                                            setSelectedDayForActivity(dayNumber);
                                            setSelectedCityForActivity(city.name);
                                            setIsActivityModalOpen(true);
                                        }}
                                        onEditActivity={(activity) => console.log("Edit", activity)}
                                        onDeleteActivity={(id) => handleDelete(id)}
                                    />
                                    <div className="mt-4 flex gap-3">
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="flex items-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200"
                                            onClick={() => {
                                                setSelectedDayForActivity(city.days[0].day); // Just an example
                                                setIsTrainModalOpen(true);
                                            }}
                                        >
                                            <Train size={16} /> Add Train Journey
                                        </Button>
                                    </div>
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
            <ActivitySelectionModal
                isOpen={isActivityModalOpen}
                onClose={() => setIsActivityModalOpen(false)}
                onAddActivity={handleAddActivity}
                cityName={selectedCityForActivity || "India"}
            />
            <TrainSearchModal
                isOpen={isTrainModalOpen}
                onClose={() => setIsTrainModalOpen(false)}
                onAddTrain={handleAddTrainJourney}
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
