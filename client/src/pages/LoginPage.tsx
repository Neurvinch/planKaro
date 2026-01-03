import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore.ts';
import api from '../services/api.ts';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const login = useAuthStore((state) => state.login);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/login', { email, password });
            login(res.data.user, res.data.token);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container animate-fade-in" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '20px'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass"
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    padding: '40px',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'var(--primary)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)'
                    }}>
                        <LogIn size={32} color="white" />
                    </div>
                    <h1 style={{ fontSize: '24px', color: 'white' }}>Welcome Back</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Continue your journey with GlobeTrotter</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="alex@example.com"
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '12px',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '15px'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '12px',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '15px'
                                }}
                            />
                        </div>
                    </div>

                    {error && <p style={{ color: '#ef4444', fontSize: '14px', marginBottom: '16px', textAlign: 'center' }}>{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: 'var(--primary)',
                            color: 'white',
                            borderRadius: '12px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            fontSize: '16px'
                        }}
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Don't have an account? </span>
                    <a href="/signup" style={{ color: 'var(--primary)', fontWeight: '600' }}>Create account</a>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
