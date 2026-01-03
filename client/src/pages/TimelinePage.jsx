import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import TripTimeline from '../components/TripTimeline';

const TimelinePage = () => {
    // Mock user
    const user = {
        name: "Alex",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    };

    // Mock trip data with activities
    const tripData = {
        tripName: "Summer in Japan",
        days: [
            {
                day: 1,
                date: "July 10, 2024",
                activities: [
                    {
                        id: 'a1',
                        time: "10:00 AM",
                        title: "Arrival at Narita Airport",
                        type: "Transport",
                        location: "Narita, Tokyo",
                        cost: 140
                    },
                    {
                        id: 'a2',
                        time: "02:00 PM",
                        title: "Check-in at Tokyo Station Hotel",
                        type: "Stay",
                        location: "Chiyoda, Tokyo",
                        cost: 250
                    },
                    {
                        id: 'a3',
                        time: "06:00 PM",
                        title: "Dinner at Shinjuku Golden Gai",
                        type: "Food",
                        location: "Shinjuku, Tokyo",
                        cost: 45
                    }
                ]
            },
            {
                day: 2,
                date: "July 11, 2024",
                activities: [
                    {
                        id: 'a4',
                        time: "09:00 AM",
                        title: "TeamLab Borderless Digital Art Museum",
                        type: "Culture",
                        location: "Odaiba, Tokyo",
                        cost: 35
                    },
                    {
                        id: 'a5',
                        time: "01:00 PM",
                        title: "Lunch in Odaiba",
                        type: "Food",
                        location: "Odaiba, Tokyo",
                        cost: 25
                    },
                    {
                        id: 'a6',
                        time: "04:00 PM",
                        title: "Explore Shibuya Crossing",
                        type: "Culture",
                        location: "Shibuya, Tokyo"
                    }
                ]
            },
            {
                day: 3,
                date: "July 12, 2024",
                activities: [
                    {
                        id: 'a7',
                        time: "08:00 AM",
                        title: "Tsukiji Outer Market Tour",
                        type: "Food",
                        location: "Chuo, Tokyo",
                        cost: 30
                    },
                    {
                        id: 'a8',
                        time: "11:00 AM",
                        title: "Senso-ji Temple Visit",
                        type: "Culture",
                        location: "Asakusa, Tokyo"
                    },
                    {
                        id: 'a9',
                        time: "03:00 PM",
                        title: "Tokyo Skytree Observatory",
                        type: "Culture",
                        location: "Sumida, Tokyo",
                        cost: 25
                    }
                ]
            },
            {
                day: 4,
                date: "July 13, 2024",
                activities: [
                    {
                        id: 'a10',
                        time: "10:00 AM",
                        title: "Mt. Fuji Day Trip",
                        type: "Adventure",
                        location: "Mt. Fuji",
                        cost: 120
                    },
                    {
                        id: 'a11',
                        time: "07:00 PM",
                        title: "Return to Tokyo",
                        type: "Transport",
                        location: "Tokyo"
                    }
                ]
            },
            {
                day: 5,
                date: "July 14, 2024",
                activities: [
                    {
                        id: 'a12',
                        time: "09:00 AM",
                        title: "Harajuku Street Fashion Tour",
                        type: "Culture",
                        location: "Harajuku, Tokyo"
                    },
                    {
                        id: 'a13',
                        time: "12:00 PM",
                        title: "Ramen Tasting Tour",
                        type: "Food",
                        location: "Shinjuku, Tokyo",
                        cost: 60
                    }
                ]
            },
            {
                day: 6,
                date: "July 15, 2024",
                activities: [
                    {
                        id: 'a14',
                        time: "11:00 AM",
                        title: "Shinkansen to Kyoto",
                        type: "Transport",
                        location: "Tokyo → Kyoto",
                        cost: 140
                    },
                    {
                        id: 'a15',
                        time: "03:00 PM",
                        title: "Fushimi Inari-taisha Shrine",
                        type: "Culture",
                        location: "Fushimi, Kyoto"
                    },
                    {
                        id: 'a16',
                        time: "06:00 PM",
                        title: "Traditional Kaiseki Dinner",
                        type: "Food",
                        location: "Gion, Kyoto",
                        cost: 85
                    }
                ]
            },
            {
                day: 7,
                date: "July 16, 2024",
                activities: []
            }
        ]
    };

    const handleAddActivity = (dayNumber) => {
        console.log('Add activity to day:', dayNumber);
        // Logic to open activity modal
    };

    const handleEditActivity = (activity) => {
        console.log('Edit activity:', activity);
        // Logic to edit activity
    };

    const handleDeleteActivity = (activityId) => {
        console.log('Delete activity:', activityId);
        // Logic to delete activity
    };

    return (
        <div className="min-h-screen bg-cream">
            <Navbar user={user} />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/itinerary/1">
                        <button className="p-2 hover:bg-sand/20 rounded-full transition-colors">
                            <ArrowLeft size={24} className="text-text-dark" />
                        </button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-display font-bold text-text-dark">
                            {tripData.tripName}
                        </h1>
                        <p className="text-text-light mt-1">Plan your perfect itinerary</p>
                    </div>
                </div>

                {/* Trip Timeline Component */}
                <TripTimeline
                    tripData={tripData}
                    onAddActivity={handleAddActivity}
                    onEditActivity={handleEditActivity}
                    onDeleteActivity={handleDeleteActivity}
                />
            </div>
        </div>
    );
};

export default TimelinePage;
