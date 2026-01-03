import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import { Plus, MapPin, Calendar, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const { user, logout } = useAuthStore();
    const [trips, setTrips] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const res = await api.get('/trips');
                setTrips(res.data);
            } catch (err) {
                console.error('Failed to fetch trips', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTrips();
    }, []);

    const deleteTrip = async (id: string) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/trips/${id}`);
            setTrips(trips.filter(t => t._id !== id));
        } catch (err) {
            alert('Failed to delete trip');
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div>
                    <h1>Welcome, {user?.name}</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Where are you going next?</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Link to="/create-trip" style={{
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        textDecoration: 'none'
                    }}>
                        <Plus size={18} /> Plan New Trip
                    </Link>
                    <button onClick={logout} style={{ background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border)', padding: '10px 20px', borderRadius: '8px' }}>
                        Logout
                    </button>
                </div>
            </header>

            <section>
                <h2 style={{ marginBottom: '24px' }}>My Trips</h2>
                {loading ? (
                    <p>Loading trips...</p>
                ) : trips.length === 0 ? (
                    <div className="glass" style={{ padding: '60px', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>No trips found. Start planning!</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                        {trips.map(trip => (
                            <div key={trip._id} className="glass" style={{ padding: '24px' }}>
                                <h3 style={{ marginBottom: '8px' }}>{trip.name}</h3>
                                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>{trip.description}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginBottom: '8px' }}>
                                    <Calendar size={14} />
                                    {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginBottom: '20px' }}>
                                    <MapPin size={14} /> {trip.stops.length} stops
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <Link to={`/trip/${trip._id}`} style={{
                                        flex: 1,
                                        background: 'var(--glass)',
                                        border: '1px solid var(--glass-border)',
                                        padding: '8px',
                                        borderRadius: '6px',
                                        textAlign: 'center',
                                        textDecoration: 'none',
                                        color: 'white',
                                        fontSize: '14px'
                                    }}>
                                        View Details
                                    </Link>
                                    <button onClick={() => deleteTrip(trip._id)} style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '8px', borderRadius: '6px' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default DashboardPage;
