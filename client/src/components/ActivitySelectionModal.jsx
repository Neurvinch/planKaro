import React, { useState } from 'react';
import { X, Search, Plus, Clock, DollarSign, MapPin, Utensils, Hotel, Plane, Camera, ShoppingBag, Heart } from 'lucide-react';
import Button from './Button';

const ActivitySelectionModal = ({ isOpen, onClose, onAddActivity, cityName = "Tokyo" }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Activity categories with icons
    const categories = [
        { id: 'All', name: 'All', icon: null },
        { id: 'Culture', name: 'Culture', icon: Camera },
        { id: 'Food', name: 'Food', icon: Utensils },
        { id: 'Stay', name: 'Stay', icon: Hotel },
        { id: 'Transport', name: 'Transport', icon: Plane },
        { id: 'Shopping', name: 'Shopping', icon: ShoppingBag },
        { id: 'Adventure', name: 'Adventure', icon: Heart },
    ];

    // Mock activities data
    const activities = [
        {
            id: 1,
            name: 'Taj Mahal Day Tour',
            category: 'Culture',
            image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=400',
            duration: 'Full day',
            cost: 2500,
            location: 'Agra, India',
            description: 'Visit the iconic symbol of love'
        },
        {
            id: 2,
            name: 'Street Food Walk',
            category: 'Food',
            image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=400',
            duration: '3 hours',
            cost: 1500,
            location: 'Old Delhi',
            description: 'Taste authentic Indian chaat & kebabs'
        },
        {
            id: 3,
            name: 'Rambagh Palace Stay',
            category: 'Stay',
            image: 'https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&q=80&w=400',
            duration: 'Per night',
            cost: 45000,
            location: 'Jaipur, Rajasthan',
            description: 'Luxury heritage hotel experience'
        },
        {
            id: 4,
            name: 'Train to Jaipur',
            category: 'Transport',
            image: 'https://images.unsplash.com/photo-1532305523741-65b7043840e3?auto=format&fit=crop&q=80&w=400',
            duration: '5 hours',
            cost: 1200,
            location: 'Delhi → Jaipur',
            description: 'Shatabdi Express train journey'
        },
        {
            id: 5,
            name: 'Amer Fort Visit',
            category: 'Culture',
            image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=400',
            duration: '3-4 hours',
            cost: 500,
            location: 'Jaipur, Rajasthan',
            description: 'Majestic hilltop fort tour'
        },
        {
            id: 6,
            name: 'Rajasthani Thali Dinner',
            category: 'Food',
            image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=400',
            duration: '2 hours',
            cost: 1800,
            location: 'Chokhi Dhani, Jaipur',
            description: 'Traditional cultural dining experience'
        },
        {
            id: 7,
            name: 'Colaba Causeway Shopping',
            category: 'Shopping',
            image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400',
            duration: '2-4 hours',
            cost: 0,
            location: 'Mumbai, Maharashtra',
            description: 'Fashion, jewelry, and antiques'
        },
        {
            id: 8,
            name: 'Rishikesh Rafting',
            category: 'Adventure',
            image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&q=80&w=400',
            duration: 'Half day',
            cost: 2500,
            location: 'Rishikesh',
            description: 'White water rafting on the Ganges'
        },
        {
            id: 9,
            name: 'Kerala Houseboat',
            category: 'Stay',
            image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=400',
            duration: 'Per night',
            cost: 15000,
            location: 'Alleppey, Kerala',
            description: 'Backwater cruise and stay'
        },
        {
            id: 10,
            name: 'Scuba Diving',
            category: 'Adventure',
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400',
            duration: '3 hours',
            cost: 5000,
            location: 'Havelock, Andaman',
            description: 'Explore coral reefs'
        },
        {
            id: 11,
            name: 'Goa Shack Chill',
            category: 'Food',
            image: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&q=80&w=400',
            duration: 'Flexible',
            cost: 1000,
            location: 'Anjuna, Goa',
            description: 'Seafood and sunset vibes'
        },
        {
            id: 12,
            name: 'Mysore Silk Saree Shop',
            category: 'Shopping',
            image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400',
            duration: '2 hours',
            cost: 0,
            location: 'Mysore, Karnataka',
            description: 'Authentic silk shopping'
        },
    ];

    // Filter activities
    const filteredActivities = activities.filter(activity => {
        const matchesCategory = selectedCategory === 'All' || activity.category === selectedCategory;
        const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-text-dark/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-6xl bg-cream rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">

                {/* Header */}
                <div className="p-6 pb-4 flex items-center justify-between border-b border-sand/30 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                    <div>
                        <h2 className="text-2xl font-display font-bold text-text-dark">Add Activity</h2>
                        <p className="text-sm text-text-light">Discover things to do in {cityName}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-sand/20 rounded-full text-text-light transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="px-6 pt-4 pb-2 bg-white/50 backdrop-blur-sm sticky top-[88px] z-10">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" size={20} />
                        <input
                            type="text"
                            placeholder="Search activities, locations..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-sand rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-dark placeholder:text-text-light/50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                        />
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="px-6 py-4 bg-white/50 backdrop-blur-sm border-b border-sand/30 sticky top-[168px] z-10">
                    <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            const isActive = selectedCategory === category.id;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${isActive
                                        ? 'bg-primary text-white shadow-soft'
                                        : 'bg-white text-text-light hover:bg-sand/20 hover:text-primary border border-sand/50'
                                        }`}
                                >
                                    {Icon && <Icon size={16} />}
                                    {category.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Activities Grid */}
                <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
                    {filteredActivities.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredActivities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 flex flex-col"
                                >
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={activity.image}
                                            alt={activity.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary shadow-sm">
                                            {activity.category}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4 flex-1 flex flex-col">
                                        <h3 className="font-bold text-text-dark mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                            {activity.name}
                                        </h3>
                                        <p className="text-xs text-text-light mb-3 line-clamp-2">
                                            {activity.description}
                                        </p>

                                        <div className="flex items-center text-xs text-text-light mb-1">
                                            <MapPin size={12} className="mr-1 text-primary" />
                                            {activity.location}
                                        </div>

                                        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-sand">
                                            <div className="flex items-center text-xs text-text-light">
                                                <Clock size={12} className="mr-1 text-primary" />
                                                {activity.duration}
                                            </div>
                                            <div className="flex items-center text-xs font-semibold text-text-dark bg-sand/20 px-2 py-1 rounded-full">
                                                <DollarSign size={12} className="text-primary" />
                                                {activity.cost === 0 ? 'Free' : `₹${activity.cost}`}
                                            </div>
                                        </div>

                                        {/* Add Button */}
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className="mt-4 w-full flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => onAddActivity(activity)}
                                        >
                                            <Plus size={16} />
                                            Add to Itinerary
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sand/10 text-text-light mb-4">
                                <Search size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-text-dark mb-2">No activities found</h3>
                            <p className="text-sm text-text-light">Try adjusting your search or category filter</p>
                        </div>
                    )}
                </div>

                {/* Footer (Optional) */}
                <div className="p-4 bg-sand/5 border-t border-sand/30 flex justify-between items-center sm:hidden">
                    <p className="text-xs text-text-light">{filteredActivities.length} activities</p>
                    <button
                        onClick={onClose}
                        className="text-sm font-semibold text-text-light hover:text-text-dark py-2"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActivitySelectionModal;
