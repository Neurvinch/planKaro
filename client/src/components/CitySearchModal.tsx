import React, { useState, useEffect } from 'react';
import { X, Search, MapPin, DollarSign, Plus } from 'lucide-react';
import Button from './Button';
import api from '../services/api';

interface City {
    _id: string;
    name: string;
    country: string;
    costIndex?: number;
    images?: string[];
}

interface CitySearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddCity: (city: City) => void;
}

const CitySearchModal: React.FC<CitySearchModalProps> = ({ isOpen, onClose, onAddCity }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery.length >= 2) {
                fetchCities();
            } else {
                setCities([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, isOpen]);

    const fetchCities = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/cities?q=${searchQuery}`);
            setCities(res.data);
        } catch (err) {
            console.error('Failed to fetch cities', err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-text-dark/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-lg bg-cream rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
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

                <div className="p-6 pt-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" size={20} />
                        <input
                            type="text"
                            placeholder="Search by city or country..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-sand rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-dark placeholder:text-text-light/50 shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-3 custom-scrollbar">
                    {loading ? (
                        <div className="py-12 text-center text-text-light">Searching...</div>
                    ) : cities.length > 0 ? (
                        cities.map(city => (
                            <div
                                key={city._id}
                                className="group flex items-center gap-4 p-3 bg-white hover:bg-sand/10 rounded-2xl border border-transparent hover:border-sand/50 transition-all cursor-pointer shadow-xs"
                                onClick={() => onAddCity(city)}
                            >
                                <div className="h-14 w-14 rounded-xl overflow-hidden shadow-sm bg-sand/20 flex items-center justify-center">
                                    {city.images?.[0] ? (
                                        <img src={city.images[0]} alt={city.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <MapPin className="text-primary/50" size={24} />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-text-dark">{city.name}</h3>
                                    <div className="flex items-center gap-3 mt-0.5">
                                        <div className="flex items-center text-xs text-text-light">
                                            <MapPin size={12} className="mr-1 text-primary" />
                                            {city.country}
                                        </div>
                                        {city.costIndex && (
                                            <div className="flex items-center text-xs text-text-light font-medium bg-sand/20 px-2 py-0.5 rounded-full">
                                                <DollarSign size={10} className="text-primary" />
                                                Cost Index: {city.costIndex}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-white border-sand hover:bg-primary hover:text-white hover:border-primary px-3 py-1.5 h-auto text-sm"
                                    onClick={(e) => { e.stopPropagation(); onAddCity(city); }}
                                >
                                    <Plus size={16} />
                                </Button>
                            </div>
                        ))
                    ) : searchQuery.length >= 2 ? (
                        <div className="py-12 text-center">
                            <h3 className="text-lg font-bold text-text-dark">No cities found</h3>
                            <p className="text-sm text-text-light">Try searching for something else</p>
                        </div>
                    ) : (
                        <div className="py-12 text-center text-text-light italic">
                            Type at least 2 characters to search...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CitySearchModal;
