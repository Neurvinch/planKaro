import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import TripTimeline from '../components/TripTimeline';

const TimelinePage: React.FC = () => {
    // Mock user
    const user = {
        name: "Alex",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    };

    // Mock trip data with activities
    const tripData = {
        tripName: "Kerala Backwaters & Hills",
        days: [
            {
                day: 1,
                date: "Dec 10, 2024",
                activities: [
                    {
                        id: 'a1',
                        time: "10:00 AM",
                        title: "Arrival at Kochi Airport",
                        type: "Transport",
                        location: "Kochi, Kerala",
                        cost: 1500
                    },
                    {
                        id: 'a2',
                        time: "02:00 PM",
                        title: "Check-in at Fort Kochi Hotel",
                        type: "Stay",
                        location: "Fort Kochi",
                        cost: 4500
                    },
                    {
                        id: 'a3',
                        time: "05:30 PM",
                        title: "Chinese Fishing Nets Sunset",
                        type: "Culture",
                        location: "Fort Kochi Beach",
                        cost: 0
                    }
                ]
            },
            {
                day: 2,
                date: "Dec 11, 2024",
                activities: [
                    {
                        id: 'a4',
                        time: "09:00 AM",
                        title: "Drive to Munnar",
                        type: "Transport",
                        location: "Kochi → Munnar",
                        cost: 3500
                    },
                    {
                        id: 'a5',
                        time: "02:00 PM",
                        title: "Tea Museum Visit",
                        type: "Culture",
                        location: "Munnar",
                        cost: 500
                    }
                ]
            },
            {
                day: 3,
                date: "Dec 12, 2024",
                activities: [
                    {
                        id: 'a6',
                        time: "06:00 AM",
                        title: "Sunrise Trek at Lakshmi Hills",
                        type: "Adventure",
                        location: "Munnar",
                        cost: 1200
                    },
                    {
                        id: 'a7',
                        time: "11:00 AM",
                        title: "Mattupetty Dam Boating",
                        type: "Adventure",
                        location: "Munnar",
                        cost: 800
                    }
                ]
            },
            {
                day: 4,
                date: "Dec 13, 2024",
                activities: [
                    {
                        id: 'a8',
                        time: "09:00 AM",
                        title: "Drive to Alleppey",
                        type: "Transport",
                        location: "Munnar → Alleppey",
                        cost: 4000
                    },
                    {
                        id: 'a9',
                        time: "01:00 PM",
                        title: "Houseboat Check-in",
                        type: "Stay",
                        location: "Alleppey Backwaters",
                        cost: 12000
                    }
                ]
            },
            {
                day: 5,
                date: "Dec 14, 2024",
                activities: [
                    {
                        id: 'a10',
                        time: "08:00 AM",
                        title: "Backwater Morning Cruise",
                        type: "Adventure",
                        location: "Alleppey"
                    },
                    {
                        id: 'a11',
                        time: "12:00 PM",
                        title: "Traditional Sadya Lunch",
                        type: "Food",
                        location: "Alleppey Town",
                        cost: 600
                    }
                ]
            }
        ]
    };

    const handleAddActivity = (dayNumber: number) => {
        console.log('Add activity to day:', dayNumber);
    };

    const handleEditActivity = (activity: any) => {
        console.log('Edit activity:', activity);
    };

    const handleDeleteActivity = (activityId: string) => {
        console.log('Delete activity:', activityId);
    };

    return (
        <div className="min-h-screen bg-cream">
            <Navbar user={user} />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/trip/1">
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
