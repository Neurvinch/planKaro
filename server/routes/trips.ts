import express, { type Response } from 'express';
import Trip from '../models/Trip.ts';
import { authenticate, type AuthRequest } from '../middleware/auth.ts';

const router = express.Router();

// @route   POST /api/trips
// @desc    Create a new trip
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const { name, description, startDate, endDate, coverPhoto } = req.body;

        const newTrip = new Trip({
            userId: req.user,
            name,
            description,
            startDate,
            endDate,
            coverPhoto,
            stops: [],
            budget: {
                total: 0,
                transport: 0,
                accommodation: 0,
                activities: 0,
                meals: 0,
            },
        });

        const trip = await newTrip.save();
        res.json(trip);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/trips
// @desc    Get all trips for current user
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const trips = await Trip.find({ userId: req.user }).sort({ createdAt: -1 });
        res.json(trips);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/trips/:id
// @desc    Get trip by ID
router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const trip = await Trip.findById(req.params.id).populate('stops.cityId stops.activities.activityId');

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        // Check ownership
        if (trip.userId.toString() !== req.user) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        res.json(trip);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// @route   DELETE /api/trips/:id
// @desc    Delete a trip
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const trip = await Trip.findById(req.params.id);

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        // Check ownership
        if (trip.userId.toString() !== req.user) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await trip.deleteOne();
        res.json({ message: 'Trip removed' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// @route   PUT /api/trips/:id/stops
// @desc    Update trip stops (Itinerary Builder)
router.put('/:id/stops', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const { stops } = req.body;
        const trip = await Trip.findById(req.params.id);

        if (!trip) return res.status(404).json({ message: 'Trip not found' });
        if (trip.userId.toString() !== req.user) return res.status(401).json({ message: 'Not authorized' });

        trip.stops = stops;

        // Auto-calculate activities budget
        let totalActivitiesCost = 0;
        stops.forEach((stop: any) => {
            stop.activities.forEach((act: any) => {
                totalActivitiesCost += act.costOverride || 0;
            });
        });
        trip.budget.activities = totalActivitiesCost;
        trip.budget.total = trip.budget.accommodation + trip.budget.activities + trip.budget.meals + trip.budget.transport;

        await trip.save();
        res.json(trip);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// @route   PUT /api/trips/:id/budget
// @desc    Manually update budget or set from activities
router.put('/:id/budget', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const { budget } = req.body;
        const trip = await Trip.findById(req.params.id);

        if (!trip) return res.status(404).json({ message: 'Trip not found' });
        if (trip.userId.toString() !== req.user) return res.status(401).json({ message: 'Not authorized' });

        trip.budget = { ...trip.budget, ...budget };
        await trip.save();
        res.json(trip);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// @route   POST /api/trips/:id/copy
// @desc    Copy an existing trip
router.post('/:id/copy', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const tripToCopy = await Trip.findById(req.params.id);
        if (!tripToCopy) return res.status(404).json({ message: 'Trip not found' });

        const copyData = tripToCopy.toObject();
        const { _id, createdAt, updatedAt, ...rest } = copyData;

        const newTrip = new Trip({
            ...rest,
            userId: req.user as any,
            name: `Copy of ${rest.name}`
        });
        await newTrip.save();
        res.json(newTrip);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

export default router;
