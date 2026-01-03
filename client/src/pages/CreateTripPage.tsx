import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Calendar, AlignLeft, Send } from 'lucide-react';

const CreateTripPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/trips', { name, description, startDate, endDate });
            navigate('/');
        } catch (err) {
            alert('Failed to create trip');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
            <button onClick={() => navigate(-1)} style={{ background: 'transparent', color: 'var(--text-muted)', marginBottom: '32px' }}>← Back</button>
            <h1 style={{ marginBottom: '12px' }}>Start a New Adventure</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Fill in the details below to begin your journey.</p>

            <form onSubmit={handleSubmit} className="glass" style={{ padding: '32px' }}>
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px' }}>Trip Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="e.g. Summer in Europe"
                        style={{ width: '100%', padding: '12px', background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: '8px', color: 'white' }}
                    />
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px' }}>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Tell us a bit about this trip..."
                        style={{ width: '100%', padding: '12px', background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: '8px', color: 'white', minHeight: '100px' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px' }}>Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                            style={{ width: '100%', padding: '12px', background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: '8px', color: 'white' }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px' }}>End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                            style={{ width: '100%', padding: '12px', background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: '8px', color: 'white' }}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '14px',
                        background: 'var(--primary)',
                        color: 'white',
                        borderRadius: '8px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
                    }}
                >
                    {loading ? 'Creating...' : 'Create Trip'}
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
};

export default CreateTripPage;
