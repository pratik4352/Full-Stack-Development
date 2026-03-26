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
    },
    {
        name: 'Bali Paradise',
        destination: 'Bali, Indonesia',
        duration: 7,
        price: 35000,
        description: 'Relax on beautiful beaches and explore ancient temples.',
        activities: ['Beach Relaxation', 'Temple Tours', 'Rice Terrace Walks', 'Traditional Dance'],
        image: 'bali.jpg'
    },
    {
        name: 'New York City Explorer',
        destination: 'New York, USA',
        duration: 6,
        price: 65000,
        description: 'Experience the vibrant energy of the Big Apple.',
        activities: ['Statue of Liberty', 'Times Square', 'Broadway Show', 'Central Park'],
        image: 'newyork.jpg'
    },
    {
        name: 'Santorini Sunset',
        destination: 'Santorini, Greece',
        duration: 5,
        price: 55000,
        description: 'Stunning sunsets, white-washed buildings, and Mediterranean charm.',
        activities: ['Sunset Watching', 'Wine Tasting', 'Beach Hopping', 'Volcano Tour'],
        image: 'santorini.jpg'
    },
    {
        name: 'Machu Picchu Trek',
        destination: 'Cusco, Peru',
        duration: 8,
        price: 75000,
        description: 'Journey to the ancient Incan citadel in the Andes.',
        activities: ['Inca Trail Hiking', 'Ancient Ruins', 'Mountain Views', 'Local Culture'],
        image: 'machupicchu.jpg'
    },
    {
        name: 'Sydney Harbour Escape',
        destination: 'Sydney, Australia',
        duration: 6,
        price: 60000,
        description: 'Iconic landmarks and beautiful harbour views.',
        activities: ['Sydney Opera House', 'Harbour Bridge', 'Bondi Beach', 'Aboriginal Culture'],
        image: 'sydney.jpg'
    },
    {
        name: 'Iceland Northern Lights',
        destination: 'Reykjavik, Iceland',
        duration: 5,
        price: 80000,
        description: 'Chase the aurora borealis and explore volcanic landscapes.',
        activities: ['Northern Lights Viewing', 'Geyser Tours', 'Glacier Hiking', 'Hot Springs'],
        image: 'iceland.jpg'
    },
    {
        name: 'Morocco Desert Adventure',
        destination: 'Marrakech, Morocco',
        duration: 7,
        price: 45000,
        description: 'Experience the magic of the Sahara and ancient medinas.',
        activities: ['Desert Camping', 'Camel Trekking', 'Medina Exploration', 'Spice Markets'],
        image: 'morocco.jpg'
    }
];

// Seed via API calls to running server
async function seedViaAPI() {
    console.log('🌱 Seeding packages via API...');
    
    for (const pkg of samplePackages) {
        try {
            const response = await fetch('http://localhost:3000/api/packages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pkg)
            });
            
            if (response.ok) {
                const result = await response.json();
                console.log(`✓ Added: ${pkg.name}`);
            } else {
                console.log(`✗ Failed to add: ${pkg.name}`);
            }
        } catch (error) {
            console.log(`✗ Error adding ${pkg.name}:`, error.message);
        }
    }
    
    console.log('✓ Seeding completed!');
}

// Run the seeding function
seedViaAPI();
