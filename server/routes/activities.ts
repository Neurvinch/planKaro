import express from 'express';
import Activity from '../models/Activity.ts';

const router = express.Router();

// @route   GET /api/activities
// @desc    Search activities by city
router.get('/', async (req, res) => {
    try {
        const { cityId, type, maxCost } = req.query;
        let query: any = {};

        if (cityId) {
            query.cityId = cityId;
        }
        if (type) {
            query.type = type;
        }
        if (maxCost) {
            query.cost = { $lte: Number(maxCost) };
        }

        const activities = await Activity.find(query);
        res.json(activities);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// @route   POST /api/activities
// @desc    Add a new activity (Seed/Admin)
router.post('/', async (req, res) => {
    try {
        const newActivity = new Activity(req.body);
        const activity = await newActivity.save();
        res.json(activity);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

export default router;
