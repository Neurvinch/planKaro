import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ CRITICAL ERROR: MONGODB_URI is not defined in environment variables.');
    console.error('Please add MONGODB_URI to your Render Environment Variables.');
    process.exit(1);
}

import authRoutes from './routes/auth.ts';
import tripRoutes from './routes/trips.ts';
import cityRoutes from './routes/cities.ts';
import activityRoutes from './routes/activities.ts';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/activities', activityRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('GlobeTrotter API is running...');
});

// Connect to MongoDB
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
    });
