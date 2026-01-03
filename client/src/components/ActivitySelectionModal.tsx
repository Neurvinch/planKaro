import React, { useState, useEffect } from 'react';
import { X, Search, Plus, Clock, DollarSign, MapPin, Utensils, Hotel, Plane, Camera, ShoppingBag, Heart } from 'lucide-react';
import Button from './Button';
import api from '../services/api';

interface Activity {
    _id: string;
    name: string;
    description: string;
    cost: number;
    duration: string;
    type: string;
    images?: string[];
}

interface ActivitySelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddActivity: (activity: Activity) => void;
    cityName: string;
    stop?: any; // To get cityId
}

const ActivitySelectionModal: React.FC<ActivitySelectionModalProps> = ({ isOpen, onClose, onAddActivity, cityName, stop }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(false);

    const categories = [
        { id: 'All', name: 'All', icon: null },
        { id: 'Culture', name: 'Culture', icon: Camera },
        { id: 'Food', name: 'Food', icon: Utensils },
        { id: 'Stay', name: 'Stay', icon: Hotel },
        { id: 'Transport', name: 'Transport', icon: Plane },
        { id: 'Shopping', name: 'Shopping', icon: ShoppingBag },
        { id: 'Adventure', name: 'Adventure', icon: Heart },
    ];

    useEffect(() => {
        if (!isOpen || !stop?.cityId?._id) return;
        fetchActivities();
    }, [isOpen, stop?.cityId?._id]);

    const fetchActivities = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/activities?cityId=${stop.cityId._id}`);
            setActivities(res.data);
        } catch (err) {
            console.error('Failed to fetch activities', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredActivities = activities.filter(activity => {
        const matchesCategory = selectedCategory === 'All' || activity.type === selectedCategory;
        const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-text-dark/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-6xl bg-cream rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
                <div className="p-6 pb-4 flex items-center justify-between border-b border-sand/30 bg-white/50 backdrop-blur-sm">
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

                <div className="px-6 pt-4 pb-2 bg-white/50 backdrop-blur-sm flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" size={20} />
                        <input
                            type="text"
                            placeholder="Search activities..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-sand rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm shadow-xs"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            const isActive = selectedCategory === category.id;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-xs whitespace-nowrap transition-all ${isActive
                                        ? 'bg-primary text-white shadow-soft'
                                        : 'bg-white text-text-light hover:bg-sand/20 hover:text-primary border border-sand/50'
                                        }`}
                                >
                                    {Icon && <Icon size={14} />}
                                    {category.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
                    {loading ? (
                        <div className="py-20 text-center text-text-light">Loading activities...</div>
                    ) : filteredActivities.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredActivities.map((activity) => (
                                <div
                                    key={activity._id}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 flex flex-col"
                                >
                                    <div className="relative h-40 overflow-hidden bg-sand/20">
                                        {activity.images?.[0] ? (
                                            <img
                                                src={activity.images[0]}
                                                alt={activity.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-primary/30">
                                                <Camera size={40} />
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-primary shadow-sm uppercase tracking-wider">
                                            {activity.type}
                                        </div>
                                    </div>

                                    <div className="p-4 flex-1 flex flex-col">
                                        <h3 className="font-bold text-text-dark mb-1 group-hover:text-primary transition-colors text-sm truncate">
                                            {activity.name}
                                        </h3>
                                        <p className="text-xs text-text-light mb-3 line-clamp-2 min-h-[32px]">
                                            {activity.description}
                                        </p>

                                        <div className="flex items-center gap-4 mt-auto pt-3 border-t border-sand">
                                            <div className="flex items-center text-[10px] font-bold text-text-light uppercase tracking-tighter">
                                                <Clock size={12} className="mr-1 text-primary" />
                                                {activity.duration}
                                            </div>
                                            <div className="flex items-center text-[10px] font-bold text-text-dark bg-sand/20 px-2 py-1 rounded-full">
                                                <DollarSign size={12} className="text-primary" />
                                                {activity.cost === 0 ? 'Free' : `$${activity.cost}`}
                                            </div>
                                        </div>

                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className="mt-4 w-full h-9 text-xs !rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => onAddActivity(activity)}
                                        >
                                            Add to Stop
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <h3 className="text-lg font-bold text-text-dark mb-2">No activities found</h3>
                            <p className="text-sm text-text-light">Try adjusting your filters</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActivitySelectionModal;
