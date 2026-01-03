import mongoose from 'mongoose';
import City from './models/City.ts';
import Activity from './models/Activity.ts';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/globetrotter';

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await City.deleteMany({});
    await Activity.deleteMany({});

    const cities = [
      { name: 'Jaipur', country: 'India', costIndex: 3, popularity: 5, description: 'The Pink City of Rajasthan' },
      { name: 'Munnar', country: 'India', costIndex: 2, popularity: 4, description: 'Tea gardens and hills of Kerala' },
      { name: 'North Goa', country: 'India', costIndex: 3, popularity: 5, description: 'Beaches and nightlife' },
      { name: 'Leh', country: 'India', costIndex: 4, popularity: 4, description: 'High-altitude adventure' },
      { name: 'Mumbai', country: 'India', costIndex: 4, popularity: 5, description: 'The City of Dreams' },
      { name: 'Bengaluru', country: 'India', costIndex: 4, popularity: 4, description: 'The Silicon Valley of India' },
      { name: 'Varanasi', country: 'India', costIndex: 2, popularity: 5, description: 'The Spiritual Capital of India' },
      { name: 'Pondicherry', country: 'India', costIndex: 3, popularity: 4, description: 'French Quarter and spiritual retreats' }
    ];

    const savedCities = await City.insertMany(cities);
    console.log('Cities seeded!');

    const activities = [
      { cityId: savedCities[0]._id, name: 'Amer Fort Elephant Ride', cost: 1500, type: 'culture' },
      { cityId: savedCities[1]._id, name: 'Tea Plantation Tour', cost: 500, type: 'sightseeing' },
      { cityId: savedCities[2]._id, name: 'Baga Beach Scuba Diving', cost: 2500, type: 'adventure' },
      { cityId: savedCities[3]._id, name: 'Pangong Lake Trip', cost: 4000, type: 'sightseeing' },
      { cityId: savedCities[4]._id, name: 'Gateway of India Ferry', cost: 200, type: 'sightseeing' },
      { cityId: savedCities[5]._id, name: 'Lalbagh Botanical Garden', cost: 50, type: 'sightseeing' },
      { cityId: savedCities[6]._id, name: 'Ganga Aarti at Dashashwamedh Ghat', cost: 0, type: 'culture' },
      { cityId: savedCities[7]._id, name: 'Auroville Visit', cost: 0, type: 'culture' }
    ];

    await Activity.insertMany(activities);
    console.log('Activities seeded!');

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedData();
