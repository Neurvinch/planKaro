import React, { useState } from 'react';
import { X, Search, MapPin, DollarSign, Plus } from 'lucide-react';
import Button from './Button';

const CitySearchModal = ({ isOpen, onClose, onAddCity }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Mock cities data
    const cities = [
        { id: 1, name: 'Tokyo', country: 'Japan', cost: 150, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=200' },
        { id: 2, name: 'Paris', country: 'France', cost: 180, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=200' },
        { id: 3, name: 'Kyoto', country: 'Japan', cost: 120, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=200' },
        { id: 4, name: 'Rome', country: 'Italy', cost: 140, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=200' },
        { id: 5, name: 'Barcelona', country: 'Spain', cost: 130, image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=200' },
        { id: 6, name: 'New York', country: 'USA', cost: 250, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=200' },
        { id: 7, name: 'London', country: 'UK', cost: 220, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=200' },
        { id: 8, name: 'Bali', country: 'Indonesia', cost: 60, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=200' },
    ];

    const filteredCities = cities.filter(city =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.country.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-text-dark/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-cream rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">

                {/* Header */}
                <div className="p-6 pb-4 flex items-center justify-between border-b border-sand/30">
                    <div>
                        <h2 className="text-2xl font-display font-bold text-text-dark">Add a City</h2>
                        <p className="text-sm text-text-light">Find destinations for your trip</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-sand/20 rounded-full text-text-light transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Search Input */}
                <div className="p-6 pt-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" size={20} />
                        <input
                            type="text"
                            placeholder="Search by city or country..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-sand rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-dark placeholder:text-text-light/50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                        />
                    </div>
                </div>

                {/* City List */}
                <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-3 custom-scrollbar">
                    {filteredCities.length > 0 ? (
                        filteredCities.map(city => (
                            <div
                                key={city.id}
                                className="group flex items-center gap-4 p-3 bg-white hover:bg-sand/10 rounded-2xl border border-transparent hover:border-sand/50 transition-all cursor-pointer"
                            >
                                <div className="h-14 w-14 rounded-xl overflow-hidden shadow-sm">
                                    <img src={city.image} alt={city.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-text-dark">{city.name}</h3>
                                    <div className="flex items-center gap-3 mt-0.5">
                                        <div className="flex items-center text-xs text-text-light">
                                            <MapPin size={12} className="mr-1 text-primary" />
                                            {city.country}
                                        </div>
                                        <div className="flex items-center text-xs text-text-light font-medium bg-sand/20 px-2 py-0.5 rounded-full">
                                            <DollarSign size={10} className="text-primary" />
                                            {city.cost}/day
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-white border-sand hover:bg-primary hover:text-white hover:border-primary"
                                    onClick={() => onAddCity(city)}
                                >
                                    <Plus size={16} />
                                </Button>
                                {/* Mobile Add Button */}
                                <button
                                    className="sm:hidden p-2 text-primary"
                                    onClick={() => onAddCity(city)}
                                >
                                    <Plus size={24} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="py-12 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sand/10 text-text-light mb-4">
                                <Search size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-text-dark">No cities found</h3>
                            <p className="text-sm text-text-light">Try searching for something else</p>
                        </div>
                    )}
                </div>

                {/* Footer (Optional) */}
                <div className="p-4 bg-sand/5 border-t border-sand/30 flex justify-center sm:hidden">
                    <button
                        onClick={onClose}
                        className="text-sm font-semibold text-text-light hover:text-text-dark py-2"
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CitySearchModal;
