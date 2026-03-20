const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Package = require('./models/Package');

dotenv.config();

// Sample travel packages
const samplePackages = [
    {
        name: 'Paris Romance',
        destination: 'Paris, France',
        duration: 5,
        price: 50000,
        description: 'Experience the city of love with historic monuments and fine dining.',
        activities: ['Eiffel Tower', 'Louvre Museum', 'Seine River Cruise', 'Wine Tasting'],
        image: 'paris.jpg'
    },
    {
        name: 'Venice Adventure',
        destination: 'Venice, Italy',
        duration: 4,
        price: 45000,
        description: 'Explore the canal city with gondola rides and Italian craftsmanship.',
        activities: ['Gondola Ride', 'St. Marks Basilica', 'Glass Making', 'Local Cuisine'],
        image: 'venice.jpg'
    },
    {
        name: 'Bangkok Delight',
        destination: 'Bangkok, Thailand',
        duration: 6,
        price: 30000,
        description: 'Experience Thai culture, temples, and vibrant night markets.',
        activities: ['Temple Tour', 'Floating Market', 'Thai Massage', 'Street Food'],
        image: 'bangkok.jpg'
    },
    {
        name: 'Swiss Alpine',
        destination: 'Switzerland',
        duration: 7,
        price: 70000,
        description: 'Adventure in the Alps with hiking, skiing, and mountain views.',
        activities: ['Mountain Hiking', 'Glacier Tour', 'Skiing', 'Alpine Village'],
        image: 'switzerland.jpg'
    },
    {
        name: 'Tokyo Culture',
        destination: 'Tokyo, Japan',
        duration: 5,
        price: 55000,
        description: 'Discover ancient traditions and modern technology in Japan.',
        activities: ['Temple Visit', 'Anime Hub', 'Sumo Wrestling', 'Cherry Blossoms'],
        image: 'tokyo.jpg'
    },
    {
        name: 'Dubai Luxury',
        destination: 'Dubai, UAE',
        duration: 4,
        price: 40000,
        description: 'Luxury shopping, desert safaris, and modern architecture.',
        activities: ['Desert Safari', 'Burj Khalifa', 'Shopping Mall', 'Beach Resort'],
        image: 'dubai.jpg'
    }
];

// Connect and seed
async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✓ MongoDB connected');

        // Clear existing packages
        await Package.deleteMany({});
        console.log('✓ Cleared existing packages');

        // Insert sample packages
        const result = await Package.insertMany(samplePackages);
        console.log(`✓ ${result.length} packages added to database`);
        
        console.log('\nPackages added:');
        result.forEach(pkg => {
            console.log(`  - ${pkg.name} (${pkg.destination}) - ₹${pkg.price}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('✗ Error seeding database:', error.message);
        process.exit(1);
    }
}

seedDatabase();
