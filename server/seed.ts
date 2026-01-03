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
      { name: 'Paris', country: 'France', costIndex: 4, popularity: 5, description: 'The city of light' },
      { name: 'Tokyo', country: 'Japan', costIndex: 5, popularity: 5, description: 'The bustling capital' },
      { name: 'Bali', country: 'Indonesia', costIndex: 2, popularity: 4, description: 'Tropical paradise' },
      { name: 'Rome', country: 'Italy', costIndex: 3, popularity: 5, description: 'The eternal city' }
    ];

    const savedCities = await City.insertMany(cities);
    console.log('Cities seeded!');

    const activities = [
      { cityId: savedCities[0]._id, name: 'Eiffel Tower Tour', cost: 50, type: 'sightseeing' },
      { cityId: savedCities[0]._id, name: 'Louvre Museum', cost: 20, type: 'culture' },
      { cityId: savedCities[1]._id, name: 'Shibuya Crossing Visit', cost: 0, type: 'sightseeing' },
      { cityId: savedCities[1]._id, name: 'Sushi Making Class', cost: 80, type: 'food' },
      { cityId: savedCities[2]._id, name: 'Surfing Lesson', cost: 30, type: 'adventure' },
      { cityId: savedCities[3]._id, name: 'Colosseum Tour', cost: 40, type: 'sightseeing' }
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
