import React, { useState } from 'react';
import {
    ChevronDown, ChevronUp, Calendar as CalendarIcon, List,
    MapPin, Clock, DollarSign, Plus, Edit2, Trash2,
    Plane, Hotel, Utensils, Camera, Sun, Moon
} from 'lucide-react';
import Button from './Button';

interface Activity {
    id: string;
    time: string;
    title: string;
    type: string; // 'Transport' | 'Stay' | 'Food' | 'Culture' | 'Adventure' | 'Other'
    location?: string;
    cost?: number;
}

interface Day {
    day: number;
    date: string;
    activities: Activity[];
}

interface TripData {
    tripName: string;
    days: Day[];
}

interface TripTimelineProps {
    tripData: TripData;
    onAddActivity?: (dayNumber: number) => void;
    onEditActivity?: (activity: Activity) => void;
    onDeleteActivity?: (activityId: string) => void;
}

const TripTimeline: React.FC<TripTimelineProps> = ({ tripData, onAddActivity, onEditActivity, onDeleteActivity }) => {
    const [viewMode, setViewMode] = useState<'timeline' | 'calendar'>('timeline');
    const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1]));

    const activityIcons: Record<string, any> = {
        Transport: Plane,
        Stay: Hotel,
        Food: Utensils,
        Culture: Camera,
        Adventure: Sun,
        Other: Moon
    };

    const activityColors: Record<string, string> = {
        Transport: 'bg-purple-100 text-purple-600 border-purple-200',
        Stay: 'bg-blue-100 text-blue-600 border-blue-200',
        Food: 'bg-green-100 text-green-600 border-green-200',
        Culture: 'bg-primary/10 text-primary border-primary/20',
        Adventure: 'bg-orange-100 text-orange-600 border-orange-200',
        Other: 'bg-gray-100 text-gray-600 border-gray-200'
    };

    const toggleDay = (dayNumber: number) => {
        const newExpanded = new Set(expandedDays);
        if (newExpanded.has(dayNumber)) {
            newExpanded.delete(dayNumber);
        } else {
            newExpanded.add(dayNumber);
        }
        setExpandedDays(newExpanded);
    };

    const expandAll = () => {
        const allDays = new Set<number>();
        tripData.days.forEach(day => allDays.add(day.day));
        setExpandedDays(allDays);
    };

    const collapseAll = () => {
        setExpandedDays(new Set());
    };

    const TimelineView = () => (
        <div className="space-y-4">
            {tripData.days.map((day, dayIndex) => {
                const isExpanded = expandedDays.has(day.day);
                const isLastDay = dayIndex === tripData.days.length - 1;

                return (
                    <div key={day.day} className="relative">
                        {!isLastDay && (
                            <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 to-sand/50 -mb-4" />
                        )}

                        <div className={`relative bg-white rounded-2xl shadow-soft overflow-hidden transition-all duration-300 ${isExpanded ? 'shadow-medium' : 'hover:shadow-medium'}`}>
                            <button
                                onClick={() => toggleDay(day.day)}
                                className="w-full p-5 flex items-center justify-between hover:bg-sand/10 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold shadow-soft">
                                        {day.day}
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-lg font-bold text-text-dark">Day {day.day}</h3>
                                        <p className="text-sm text-text-light flex items-center gap-1">
                                            <CalendarIcon size={14} />
                                            {day.date}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-sand/20 rounded-full">
                                        <span className="text-xs font-semibold text-text-dark">
                                            {day.activities.length} {day.activities.length === 1 ? 'activity' : 'activities'}
                                        </span>
                                    </div>
                                    {isExpanded ? <ChevronUp size={20} className="text-primary" /> : <ChevronDown size={20} className="text-text-light" />}
                                </div>
                            </button>

                            {isExpanded && (
                                <div className="px-5 pb-5 space-y-3">
                                    <div className="h-px bg-sand/30 mb-4" />
                                    {day.activities.length > 0 ? (
                                        day.activities.map((activity, actIndex) => {
                                            const Icon = activityIcons[activity.type] || activityIcons.Other;
                                            const colorClass = activityColors[activity.type] || activityColors.Other;
                                            return (
                                                <div key={activity.id} className="group relative pl-12 pr-4 py-3 rounded-xl hover:bg-sand/5 transition-all">
                                                    {actIndex < day.activities.length - 1 && <div className="absolute left-6 top-12 bottom-0 w-px bg-sand/30" />}
                                                    <div className={`absolute left-0 top-3 w-10 h-10 rounded-full border-2 ${colorClass} flex items-center justify-center bg-white`}>
                                                        <Icon size={18} />
                                                    </div>
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="text-xs font-semibold text-text-light">{activity.time}</span>
                                                                <span className={`text-xs px-2 py-0.5 rounded-full ${colorClass} border`}>{activity.type}</span>
                                                            </div>
                                                            <h4 className="font-semibold text-text-dark mb-1">{activity.title}</h4>
                                                            {activity.location && <p className="text-xs text-text-light flex items-center gap-1"><MapPin size={12} />{activity.location}</p>}
                                                            {activity.cost && <p className="text-xs text-text-dark font-semibold mt-1 flex items-center gap-1"><DollarSign size={12} />${activity.cost}</p>}
                                                        </div>
                                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button onClick={() => onEditActivity?.(activity)} className="p-1.5 hover:bg-sand/20 rounded-lg text-text-light hover:text-primary transition-colors"><Edit2 size={14} /></button>
                                                            <button onClick={() => onDeleteActivity?.(activity.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-text-light hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="text-center py-8 text-text-light">
                                            <p className="text-sm mb-3">No activities planned yet</p>
                                            <Button variant="outline" size="sm" onClick={() => onAddActivity?.(day.day)} className="mx-auto">
                                                <Plus size={16} className="mr-1" /> Add Activity
                                            </Button>
                                        </div>
                                    )}
                                    {day.activities.length > 0 && (
                                        <button onClick={() => onAddActivity?.(day.day)} className="w-full py-3 mt-2 rounded-xl border-2 border-dashed border-sand/50 text-text-light hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all text-sm font-medium flex items-center justify-center gap-2">
                                            <Plus size={16} /> Add Activity
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );

    const CalendarView = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tripData.days.map((day) => (
                <div key={day.day} className="bg-white rounded-2xl shadow-soft p-5 hover:shadow-medium transition-all">
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-sand/30">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-sm shadow-soft">
                            {day.day}
                        </div>
                        <div>
                            <h3 className="font-bold text-text-dark">Day {day.day}</h3>
                            <p className="text-xs text-text-light">{day.date}</p>
                        </div>
                    </div>
                    <div className="space-y-2 mb-3">
                        {day.activities.slice(0, 3).map((activity) => {
                            const Icon = activityIcons[activity.type] || activityIcons.Other;
                            const colorClass = activityColors[activity.type] || activityColors.Other;
                            return (
                                <div key={activity.id} className="flex items-start gap-2 text-xs">
                                    <div className={`w-6 h-6 rounded-full ${colorClass} border flex items-center justify-center flex-shrink-0`}>
                                        <Icon size={12} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-text-dark font-medium truncate">{activity.title}</p>
                                        <p className="text-text-light">{activity.time}</p>
                                    </div>
                                </div>
                            );
                        })}
                        {day.activities.length > 3 && <p className="text-xs text-text-light pl-8">+{day.activities.length - 3} more</p>}
                        {day.activities.length === 0 && <p className="text-xs text-text-light text-center py-4">No activities</p>}
                    </div>
                    <button onClick={() => { setViewMode('timeline'); setExpandedDays(new Set([day.day])); }} className="w-full py-2 text-xs font-semibold text-primary hover:bg-primary/5 rounded-lg transition-colors">View Details</button>
                </div>
            ))}
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-2xl p-4 shadow-soft">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-display font-bold text-text-dark">Trip Timeline</h2>
                    <span className="text-sm text-text-light">({tripData.days.length} days)</span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="flex bg-sand/20 rounded-xl p-1">
                        <button onClick={() => setViewMode('timeline')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'timeline' ? 'bg-white text-primary shadow-sm' : 'text-text-light hover:text-text-dark'}`}>
                            <List size={16} /> <span className="hidden sm:inline">Timeline</span>
                        </button>
                        <button onClick={() => setViewMode('calendar')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'calendar' ? 'bg-white text-primary shadow-sm' : 'text-text-light hover:text-text-dark'}`}>
                            <CalendarIcon size={16} /> <span className="hidden sm:inline">Calendar</span>
                        </button>
                    </div>
                    {viewMode === 'timeline' && (
                        <div className="flex gap-1">
                            <button onClick={expandAll} className="px-3 py-2 text-xs font-medium text-text-light hover:text-primary hover:bg-sand/20 rounded-lg transition-colors">Expand All</button>
                            <button onClick={collapseAll} className="px-3 py-2 text-xs font-medium text-text-light hover:text-primary hover:bg-sand/20 rounded-lg transition-colors">Collapse</button>
                        </div>
                    )}
                </div>
            </div>
            {viewMode === 'timeline' ? <TimelineView /> : <CalendarView />}
        </div>
    );
};

export default TripTimeline;
