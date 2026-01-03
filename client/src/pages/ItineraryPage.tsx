import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Plus, Trash2, MapPin, Calendar, ExternalLink } from 'lucide-react';

const ItineraryPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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

    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const handleSearch = async (q: string) => {
        setSearchQuery(q);
        if (q.length < 2) return setSearchResults([]);
        try {
            const res = await api.get(`/cities?q=${q}`);
            setSearchResults(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const addStop = async (city: any) => {
        const startDate = prompt('Enter start date (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);
        const endDate = prompt('Enter end date (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);

        if (!startDate || !endDate) return;

        try {
            const newStops = [...trip.stops, { cityId: city._id, startDate, endDate, activities: [] }];
            const res = await api.put(`/trips/${id}/stops`, { stops: newStops });
            setTrip(res.data);
            setShowSearch(false);
            setSearchQuery('');
            setSearchResults([]);
        } catch (err) {
            alert('Failed to add stop');
        }
    };

    const [showActivitySearch, setShowActivitySearch] = useState<number | null>(null);
    const [cityActivities, setCityActivities] = useState<any[]>([]);

    const fetchActivities = async (cityId: string, index: number) => {
        try {
            const res = await api.get(`/activities?cityId=${cityId}`);
            setCityActivities(res.data);
            setShowActivitySearch(index);
        } catch (err) {
            console.error(err);
        }
    };

    const addActivity = async (stopIndex: number, activity: any) => {
        try {
            const updatedStops = [...trip.stops];
            updatedStops[stopIndex].activities.push({
                activityId: activity._id,
                costOverride: activity.cost
            });

            const res = await api.put(`/trips/${id}/stops`, { stops: updatedStops });
            setTrip(res.data);
            setShowActivitySearch(null);
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

    if (loading) return <div style={{ padding: '40px' }}>Loading itinerary...</div>;
    if (!trip) return null;

    return (
        <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
            <button onClick={() => navigate('/')} style={{ background: 'transparent', color: 'var(--text-muted)', marginBottom: '24px' }}>← All Trips</button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>{trip.name}</h1>
                    <p style={{ color: 'var(--text-muted)' }}>{trip.description}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '14px', marginBottom: '4px' }}>Total Budget: <span style={{ color: 'var(--accent)', fontWeight: '700' }}>${trip.budget.total}</span></p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="glass" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px' }}>Share Trip <ExternalLink size={14} /></button>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px' }}>
                <main>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h2>Stops & Itinerary</h2>
                        <button onClick={() => setShowSearch(!showSearch)} style={{ background: 'var(--primary)', color: 'white', padding: '8px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                            <Plus size={16} /> {showSearch ? 'Close' : 'Add Stop'}
                        </button>
                    </div>

                    {showSearch && (
                        <div className="glass" style={{ padding: '20px', marginBottom: '24px' }}>
                            <input
                                type="text"
                                placeholder="Search for a city (e.g. Paris, Tokyo)..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                style={{ width: '100%', padding: '12px', background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: '8px', color: 'white', marginBottom: '12px', outline: 'none' }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {searchResults.map(city => (
                                    <div key={city._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                                        <span>{city.name}, {city.country}</span>
                                        <button onClick={() => addStop(city)} style={{ background: 'var(--primary)', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', color: 'white' }}>Add to Trip</button>
                                    </div>
                                ))}
                                {searchQuery.length >= 2 && searchResults.length === 0 && <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center' }}>No cities found.</p>}
                            </div>
                        </div>
                    )}

                    {trip.stops.length === 0 ? (
                        <div className="glass" style={{ padding: '40px', textAlign: 'center' }}>
                            <p style={{ color: 'var(--text-muted)' }}>No stops added yet. Start by adding a city!</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {trip.stops.map((stop: any, index: number) => (
                                <div key={index} className="glass" style={{ padding: '24px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                            <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700' }}>
                                                {index + 1}
                                            </div>
                                            <h3>{stop.cityId?.name || 'Unknown City'}</h3>
                                        </div>
                                        <button onClick={() => removeStop(index)} style={{ color: '#ef4444', background: 'transparent' }}><Trash2 size={16} /></button>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {new Date(stop.startDate).toLocaleDateString()} - {new Date(stop.endDate).toLocaleDateString()}</span>
                                    </div>

                                    <div style={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', padding: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                            <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Activities</h4>
                                            <button onClick={() => fetchActivities(stop.cityId?._id, index)} style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600', background: 'transparent' }}>+ Add Activity</button>
                                        </div>

                                        {showActivitySearch === index && (
                                            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                    <span style={{ fontSize: '12px', fontWeight: '700' }}>Available Activities</span>
                                                    <button onClick={() => setShowActivitySearch(null)} style={{ fontSize: '10px', background: 'var(--border)', padding: '2px 6px', borderRadius: '4px' }}>Close</button>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                    {cityActivities.length === 0 ? (
                                                        <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>No activities found for this city.</p>
                                                    ) : (
                                                        cityActivities.map(act => (
                                                            <div key={act._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                                                                <span style={{ fontSize: '12px' }}>{act.name} (${act.cost})</span>
                                                                <button onClick={() => addActivity(index, act)} style={{ background: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', color: 'white' }}>Select</button>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        {stop.activities.length === 0 ? (
                                            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No activities planned.</p>
                                        ) : (
                                            stop.activities.map((act: any, aIdx: number) => (
                                                <div key={aIdx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                                                    <span style={{ fontSize: '14px' }}>{act.activityId?.name}</span>
                                                    <span style={{ fontWeight: '600' }}>${act.costOverride || act.activityId?.cost || 0}</span>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>

                <aside>
                    <div className="glass" style={{ padding: '24px' }}>
                        <h3 style={{ marginBottom: '20px' }}>Budget Breakdown</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Stays</span>
                                <span>${trip.budget.accommodation}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Activities</span>
                                <span>${trip.budget.activities}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Meals</span>
                                <span>${trip.budget.meals}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Transport</span>
                                <span>${trip.budget.transport}</span>
                            </div>
                            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '8px 0' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '18px' }}>
                                <span>Total</span>
                                <span style={{ color: 'var(--accent)' }}>${trip.budget.total}</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ItineraryPage;
