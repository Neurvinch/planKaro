import React, { useState } from 'react';
import { X, Search, Train, Clock, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import Button from './Button';

interface TrainOption {
    id: string;
    number: string;
    name: string;
    from: string;
    to: string;
    departure: string;
    arrival: string;
    duration: string;
    classes: string[];
    price: number;
}

interface TrainSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTrain: (train: TrainOption) => void;
}

const TrainSearchModal: React.FC<TrainSearchModalProps> = ({ isOpen, onClose, onAddTrain }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const mockTrains: TrainOption[] = [
        {
            id: 't1',
            number: '12002',
            name: 'New Delhi - HabibGanj Shatabdi Express',
            from: 'New Delhi (NDLS)',
            to: 'Agra Cantt (AGC)',
            departure: '06:00 AM',
            arrival: '07:50 AM',
            duration: '1h 50m',
            classes: ['CC', 'EC'],
            price: 750
        },
        {
            id: 't2',
            number: '12050',
            name: 'Gatimaan Express',
            from: 'H. Nizamuddin (NZM)',
            to: 'Agra Cantt (AGC)',
            departure: '08:10 AM',
            arrival: '09:50 AM',
            duration: '1h 40m',
            classes: ['CC', 'EC'],
            price: 850
        },
        {
            id: 't3',
            number: '12952',
            name: 'Mumbai Rajdhani',
            from: 'New Delhi (NDLS)',
            to: 'Mumbai Central (MMCT)',
            departure: '04:25 PM',
            arrival: '08:15 AM',
            duration: '15h 50m',
            classes: ['1A', '2A', '3A'],
            price: 2800
        },
        {
            id: 't4',
            number: '12626',
            name: 'Kerala Express',
            from: 'New Delhi (NDLS)',
            to: 'Ernakulam Jn (ERS)',
            departure: '11:25 AM',
            arrival: '07:15 AM',
            duration: '43h 50m',
            classes: ['2A', '3A', 'SL'],
            price: 3200
        }
    ];

    const filteredTrains = mockTrains.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.number.includes(searchQuery)
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-text-dark/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-4xl bg-cream rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 bg-white border-b border-sand/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-xl">
                            <Train className="text-blue-600" size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-display font-bold text-text-dark">IRCTC Train Search</h2>
                            <p className="text-sm text-text-light">Book Indian Railways journeys for your trip</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-sand/20 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 bg-white/50 border-b border-sand/30 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" size={20} />
                        <input
                            type="text"
                            placeholder="Enter Train Name or Number..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-sand rounded-2xl focus:ring-2 focus:ring-blue-200 outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <input
                        type="date"
                        className="px-4 py-3 bg-white border border-sand rounded-2xl focus:ring-2 focus:ring-blue-200 outline-none text-text-light"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                    {filteredTrains.map(train => (
                        <div key={train.id} className="bg-white p-5 rounded-2xl border border-sand/50 shadow-sm hover:shadow-medium transition-all group">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-bold rounded uppercase tracking-wider">
                                            {train.number}
                                        </span>
                                        <h3 className="font-bold text-text-dark group-hover:text-blue-600 transition-colors">{train.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-8 text-center md:text-left">
                                        <div>
                                            <p className="text-lg font-bold text-text-dark">{train.departure}</p>
                                            <p className="text-xs text-text-light truncate max-w-[120px]">{train.from}</p>
                                        </div>
                                        <div className="flex flex-col items-center flex-1 max-w-[100px]">
                                            <p className="text-[10px] text-text-light font-medium mb-1">{train.duration}</p>
                                            <div className="w-full flex items-center gap-1">
                                                <div className="h-0.5 flex-1 bg-sand/50" />
                                                <Train size={12} className="text-blue-500" />
                                                <div className="h-0.5 flex-1 bg-sand/50" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-text-dark">{train.arrival}</p>
                                            <p className="text-xs text-text-light truncate max-w-[120px]">{train.to}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end justify-between border-t md:border-t-0 md:border-l border-sand/30 pt-4 md:pt-0 md:pl-6">
                                    <div className="text-right">
                                        <p className="text-xs text-text-light">Starting from</p>
                                        <p className="text-xl font-bold text-blue-600">₹{train.price}</p>
                                    </div>
                                    <div className="flex gap-1 mb-2">
                                        {train.classes.map(c => (
                                            <span key={c} className="px-1.5 py-0.5 bg-sand/20 text-[10px] font-bold text-text-light rounded">
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        className="bg-blue-600 hover:bg-blue-700 text-white border-none shadow-sm flex items-center gap-2"
                                        onClick={() => onAddTrain(train)}
                                    >
                                        <ShieldCheck size={16} /> Add Journey
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrainSearchModal;
