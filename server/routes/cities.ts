import express from 'express';
import City from '../models/City.ts';

const router = express.Router();

// @route   GET /api/cities
// @desc    Search cities
router.get('/', async (req, res) => {
    try {
        const { q, country } = req.query;
        let query: any = {};

        if (q) {
            query.name = { $regex: q, $options: 'i' };
        }
        if (country) {
            query.country = { $regex: country, $options: 'i' };
        }

        const cities = await City.find(query).limit(20);
        res.json(cities);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// @route   POST /api/cities
// @desc    Add a new city (Seed/Admin)
router.post('/', async (req, res) => {
    try {
        const newCity = new City(req.body);
        const city = await newCity.save();
        res.json(city);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

export default router;
